import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyMigration() {
  try {
    console.log('Verifying database migration...');

    // Check if cvs table exists and has correct structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('cvs')
      .select('*')
      .limit(1);

    if (tableError) {
      if (tableError.message.includes('does not exist')) {
        console.error('❌ cvs table does not exist');
        return;
      }
      throw tableError;
    }

    console.log('✅ cvs table exists');

    // Test RLS policies by trying to read without authentication
    const { data: rlsTestData, error: rlsError } = await supabase
      .from('cvs')
      .select('*');

    if (rlsError?.message?.includes('permission denied')) {
      console.log('✅ RLS policies are working (authenticated access required)');
    } else {
      console.warn('⚠️ RLS policies might not be properly configured');
    }

    // Check if triggers exist
    const { data: triggerData, error: triggerError } = await supabase
      .rpc('check_trigger_exists', { trigger_name: 'ensure_single_primary_cv_trigger' });

    if (triggerError) {
      console.warn('⚠️ Could not verify triggers');
    } else if (triggerData) {
      console.log('✅ Required triggers are set up');
    }

    console.log('Migration verification complete!');
  } catch (error) {
    console.error('Error during verification:', error);
  }
}

verifyMigration();
