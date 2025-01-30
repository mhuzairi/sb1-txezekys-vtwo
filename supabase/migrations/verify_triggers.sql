-- Check if triggers exist
SELECT tgname, tgrelid::regclass AS table_name
FROM pg_trigger
WHERE tgname IN ('ensure_single_primary_cv_trigger', 'update_cvs_updated_at');
