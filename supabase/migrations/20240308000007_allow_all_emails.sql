-- Enable signups for all email domains
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Update auth settings to allow all email domains
UPDATE auth.config 
SET config = jsonb_set(
  config,
  '{mailer, allowedEmailDomains}',
  '["*"]'
);

-- Ensure email confirmations are required
UPDATE auth.config 
SET config = jsonb_set(
  config,
  '{mailer, validateEmail}',
  'true'
);