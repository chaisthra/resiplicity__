-- Enable Row Level Security for users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create identities table if not exists
CREATE TABLE IF NOT EXISTS auth.identities (
    id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    email text GENERATED ALWAYS AS (lower(identity_data->>'email')) STORED,
    CONSTRAINT identities_pkey PRIMARY KEY (provider, id),
    CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS identities_email_idx ON auth.identities (email text_pattern_ops);

-- Create providers table if not exists
CREATE TABLE IF NOT EXISTS auth.providers (
    id text NOT NULL PRIMARY KEY,
    provider text NOT NULL UNIQUE,
    settings jsonb DEFAULT '{}'::jsonb,
    enabled boolean NOT NULL DEFAULT TRUE,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

