create type "public"."project_types" as enum ('SUPABASE', 'VERCEL');

create table "public"."projects" (
  "id" uuid not null default gen_random_uuid (),
  "name" text not null,
  "repository" uuid not null,
  "url" text null,
  "type" public.project_types not null,
  "created_at" timestamp with time zone not null default now(),
  constraint projects_pkey primary key (id),
  constraint projects_repository_fkey foreign KEY (repository) references repositories (id)
) TABLESPACE pg_default;

alter table "public"."projects" enable row level security;

create policy "Enable insert for repo user"
on "public"."projects"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM repositories
  WHERE (repositories.id = projects.repository))));

create policy "Enabled read for repo member"
on "public"."projects"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM repositories
  WHERE (repositories.id = projects.repository))));

create policy "Enable read for users"
on "public"."repositories"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM profile_repositories
  WHERE (profile_repositories.repository = repositories.id))));