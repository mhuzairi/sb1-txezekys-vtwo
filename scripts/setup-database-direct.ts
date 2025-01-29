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

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Step 1: Add new columns to cvs table
    console.log('Adding new columns to cvs table...');
    const { data: tableData, error: tableError } = await supabase
      .from('cvs')
      .select('*')
      .limit(1);

    if (tableError) {
      // If table doesn't exist, create it
      console.log('Creating cvs table...');
      const { error: createError } = await supabase.from('cvs').insert([
        {
          user_id: '00000000-0000-0000-0000-000000000000', // Dummy record
          title: 'Initial CV',
          cv_data: {},
          is_primary: true
        }
      ]).select();

      if (createError && !createError.message.includes('duplicate')) {
        throw createError;
      }
    }

    // Step 2: Add a test CV to verify everything works
    console.log('Adding test CV...');
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      throw userError;
    }

    if (userData.user) {
      const testCV = {
        user_id: userData.user.id,
        title: 'Test CV',
        cv_data: {
          personalInfo: {
            name: 'Test User',
            email: userData.user.email,
            phone: '',
            location: '',
            summary: 'This is a test CV'
          },
          education: [],
          experience: [],
          skills: ['Test Skill'],
          projects: [],
          certifications: []
        },
        is_primary: true
      };

      const { error: insertError } = await supabase
        .from('cvs')
        .insert([testCV])
        .select();

      if (insertError && !insertError.message.includes('duplicate')) {
        throw insertError;
      }
    }

    // Step 3: Verify we can read the CVs
    console.log('Verifying CV access...');
    const { data: cvs, error: readError } = await supabase
      .from('cvs')
      .select('*');

    if (readError) {
      throw readError;
    }

    console.log('Found', cvs?.length || 0, 'CVs in the database');
    console.log('Database setup completed successfully!');
    
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
}

setupDatabase().then((success) => {
  if (success) {
    console.log('Setup completed successfully!');
  } else {
    console.log('Setup failed!');
  }
  process.exit(success ? 0 : 1);
});
