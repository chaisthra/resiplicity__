-- Create shared_remedies table
CREATE TABLE IF NOT EXISTS public.shared_remedies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    ingredients TEXT[] NOT NULL,
    instructions TEXT[] NOT NULL,
    prep_time TEXT,
    cook_time TEXT,
    servings TEXT,
    target_age TEXT,
    region TEXT,
    sub_region TEXT,
    dietary_info TEXT[],
    health_benefits TEXT[],
    precautions TEXT[],
    tradition TEXT,
    additional_info TEXT,
    image_url TEXT,
    user_id UUID REFERENCES auth.users(id),
    trust_score INTEGER DEFAULT 50,
    votes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create shared_remedy_votes table
CREATE TABLE IF NOT EXISTS public.shared_remedy_votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    remedy_id UUID REFERENCES public.shared_remedies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(remedy_id, user_id)
);

-- Create function to handle shared remedy votes
CREATE OR REPLACE FUNCTION handle_shared_remedy_vote(
    p_remedy_id UUID,
    p_user_id UUID,
    p_vote_type TEXT,
    p_new_votes INTEGER,
    p_new_trust_score INTEGER
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result json;
BEGIN
    -- Start transaction
    BEGIN
        -- Update or insert vote
        INSERT INTO public.shared_remedy_votes (remedy_id, user_id, vote_type)
        VALUES (p_remedy_id, p_user_id, p_vote_type)
        ON CONFLICT (remedy_id, user_id)
        DO UPDATE SET vote_type = p_vote_type;

        -- Update remedy scores and return full remedy data
        UPDATE public.shared_remedies
        SET 
            votes = p_new_votes,
            trust_score = p_new_trust_score
        WHERE id = p_remedy_id
        RETURNING json_build_object(
            'id', id,
            'title', title,
            'description', description,
            'ingredients', ingredients,
            'instructions', instructions,
            'prep_time', prep_time,
            'cook_time', cook_time,
            'servings', servings,
            'target_age', target_age,
            'region', region,
            'sub_region', sub_region,
            'dietary_info', dietary_info,
            'health_benefits', health_benefits,
            'precautions', precautions,
            'tradition', tradition,
            'additional_info', additional_info,
            'image_url', image_url,
            'votes', votes,
            'trust_score', trust_score,
            'created_at', created_at
        ) INTO v_result;

        RETURN v_result;
    EXCEPTION WHEN OTHERS THEN
        RAISE;
    END;
END;
$$;

-- Enable RLS
ALTER TABLE public.shared_remedies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_remedy_votes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
    ON public.shared_remedies FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for authenticated users only"
    ON public.shared_remedies FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for users based on user_id"
    ON public.shared_remedies FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id"
    ON public.shared_remedies FOR DELETE
    USING (auth.uid() = user_id);