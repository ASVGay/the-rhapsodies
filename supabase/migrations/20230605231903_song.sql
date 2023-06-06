drop policy "Enable insert for authenticated users only" on "public"."suggestion";

drop policy "Enable read access for all users" on "public"."suggestion";

drop policy "Enable delete for users based on user_id" on "public"."suggestion_instrument";

drop policy "Enable insert for authenticated users only" on "public"."suggestion_instrument";

drop policy "Enable read access for all authenticated users" on "public"."suggestion_instrument";

alter table "public"."division" drop constraint "division_suggestion_instrument_id_fkey";

alter table "public"."suggestion" drop constraint "suggestion_author_fkey";

alter table "public"."suggestion_instrument" drop constraint "suggestion_instrument_instrument_id_fkey";

alter table "public"."suggestion_instrument" drop constraint "suggestion_instrument_suggestion_id_fkey";

alter table "public"."suggestion" drop constraint "pk_suggestion";

alter table "public"."suggestion_instrument" drop constraint "pk_suggestion_instrument";

alter table "public"."division" drop constraint "division_pkey";

drop index if exists "public"."division_pkey";

drop index if exists "public"."pk_suggestion";

drop index if exists "public"."pk_suggestion_instrument";

drop table "public"."suggestion";

drop table "public"."suggestion_instrument";

create table "public"."song" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "artist" text[] not null,
    "motivation" text not null,
    "created_at" timestamp with time zone not null default now(),
    "author" uuid not null,
    "link" text,
    "inRepertoire" boolean not null default false
);


alter table "public"."song" enable row level security;

create table "public"."song_instrument" (
    "id" uuid not null default gen_random_uuid(),
    "song_id" uuid not null,
    "instrument_id" uuid not null,
    "description" text
);


alter table "public"."song_instrument" enable row level security;

alter table "public"."division" drop column "suggestion_instrument_id";

alter table "public"."division" add column "song_instrument_id" uuid not null;

CREATE UNIQUE INDEX division_pkey ON public.division USING btree (song_instrument_id, musician);

CREATE UNIQUE INDEX pk_suggestion ON public.song USING btree (id);

CREATE UNIQUE INDEX pk_suggestion_instrument ON public.song_instrument USING btree (id);

alter table "public"."song" add constraint "pk_suggestion" PRIMARY KEY using index "pk_suggestion";

alter table "public"."song_instrument" add constraint "pk_suggestion_instrument" PRIMARY KEY using index "pk_suggestion_instrument";

alter table "public"."division" add constraint "division_pkey" PRIMARY KEY using index "division_pkey";

alter table "public"."division" add constraint "division_song_instrument_id_fkey" FOREIGN KEY (song_instrument_id) REFERENCES song_instrument(id) not valid;

alter table "public"."division" validate constraint "division_song_instrument_id_fkey";

alter table "public"."song" add constraint "song_author_fkey" FOREIGN KEY (author) REFERENCES member(id) ON DELETE CASCADE not valid;

alter table "public"."song" validate constraint "song_author_fkey";

alter table "public"."song_instrument" add constraint "song_instrument_instrument_id_fkey" FOREIGN KEY (instrument_id) REFERENCES instrument(id) ON DELETE CASCADE not valid;

alter table "public"."song_instrument" validate constraint "song_instrument_instrument_id_fkey";

alter table "public"."song_instrument" add constraint "song_instrument_song_id_fkey" FOREIGN KEY (song_id) REFERENCES song(id) ON DELETE CASCADE not valid;

alter table "public"."song_instrument" validate constraint "song_instrument_song_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_claim(uid uuid, claim text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data - claim where id = uid;
        return 'OK';
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_claim(uid uuid, claim text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select coalesce(raw_app_meta_data->claim, null) from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_claims(uid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select raw_app_meta_data from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_my_claim(claim text)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' -> claim, null)
$function$
;

CREATE OR REPLACE FUNCTION public.get_my_claims()
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
$function$
;

CREATE OR REPLACE FUNCTION public.is_claims_admin()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
  BEGIN
    IF session_user = 'authenticator' THEN
      --------------------------------------------
      -- To disallow any authenticated app users
      -- from editing claims, delete the following
      -- block of code and replace it with:
      -- RETURN FALSE;
      --------------------------------------------
      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        return false; -- jwt expired
      END IF; 
      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true
      ELSE
        return false; -- user does NOT have claims_admin set to true
      END IF;
      --------------------------------------------
      -- End of block 
      --------------------------------------------
    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_claim(uid uuid, claim text, value jsonb)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data || 
            json_build_object(claim, value)::jsonb where id = uid;
        return 'OK';
      END IF;
    END;
$function$
;

create policy "Enable delete access for users"
on "public"."song"
as permissive
for delete
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."song"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."song"
as permissive
for select
to authenticated
using (true);


create policy "Enable update access for users"
on "public"."song"
as permissive
for update
to authenticated, pgsodium_keyholder
using (true)
with check (true);


create policy "Enable delete for users based on user_id"
on "public"."song_instrument"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Enable insert for authenticated users only"
on "public"."song_instrument"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all authenticated users"
on "public"."song_instrument"
as permissive
for select
to authenticated
using (true);



