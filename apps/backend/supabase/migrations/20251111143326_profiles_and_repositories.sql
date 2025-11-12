create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create type "public"."profile_repositories_statuses" as enum ('PENDING', 'ACCEPTED');

create table "public"."profile_repositories" (
    "profile" uuid not null default gen_random_uuid(),
    "repository" uuid not null default gen_random_uuid(),
    "status" profile_repositories_statuses not null default 'PENDING'::profile_repositories_statuses,
    "created_at" timestamp with time zone not null default now()
);

create policy "Enable users to view their own data only"
on "public"."profile_repositories"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = profile));

alter table "public"."profile_repositories" enable row level security;

create table "public"."profiles" (
    "id" uuid not null default auth.uid(),
    "full_name" text not null,
    "created_at" timestamp with time zone not null default now()
);

alter table "public"."profiles" enable row level security;

create table "public"."repositories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now()
);

alter table "public"."repositories" enable row level security;

CREATE UNIQUE INDEX profile_repositories_pkey ON public.profile_repositories USING btree (profile, repository);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX repositories_pkey ON public.repositories USING btree (id);

alter table "public"."profile_repositories" add constraint "profile_repositories_pkey" PRIMARY KEY using index "profile_repositories_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."repositories" add constraint "repositories_pkey" PRIMARY KEY using index "repositories_pkey";

alter table "public"."profile_repositories" add constraint "profile_repositories_profile_fkey" FOREIGN KEY (profile) REFERENCES profiles(id) not valid;

alter table "public"."profile_repositories" validate constraint "profile_repositories_profile_fkey";

alter table "public"."profile_repositories" add constraint "profile_repositories_repository_fkey" FOREIGN KEY (repository) REFERENCES repositories(id) not valid;

alter table "public"."profile_repositories" validate constraint "profile_repositories_repository_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

create policy "Enable write for all auth"
on "public"."repositories"
as permissive
for insert
to authenticated
with check (true);