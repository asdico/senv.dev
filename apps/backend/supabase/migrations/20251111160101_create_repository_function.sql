CREATE OR REPLACE FUNCTION public.create_repository(
  project_name       text
)
RETURNS repositories
LANGUAGE plpgsql
STRICT
VOLATILE
SECURITY DEFINER
AS $func$
DECLARE
  v_repo repositories%ROWTYPE;
BEGIN
  -- 1) Create the repository
  INSERT INTO repositories (name)
  VALUES (project_name)
  RETURNING * INTO v_repo;

  -- 2) Link it to the profile
  INSERT INTO profile_repositories (profile, repository, status)
  VALUES (auth.uid(), v_repo.id, 'ACCEPTED');

  -- 3) Return the inserted repo row
  RETURN v_repo;
END
$func$;