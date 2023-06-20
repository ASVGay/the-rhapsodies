drop policy "Enable delete for users based on user_id" on "public"."attendee";

drop policy "Enable insert based on member id" on "public"."attendee";

drop policy "Enable read access for authenticated users only" on "public"."attendee";

drop policy "Enable update for users based on user_id" on "public"."attendee";

drop policy "Enable insert access for admins" on "public"."event";

drop policy "Enable read access for all authenticated users" on "public"."event";

drop policy "Enable delete access for users based on author id" on "public"."song";

drop policy "Enable update access for users based on author id" on "public"."song";

drop policy "Enable delete for authenticated users based on author in song" on "public"."song_instrument";

drop policy "Enable update for authenticated users based on author in song" on "public"."song_instrument";

alter table "public"."attendee" drop constraint "attendee_event_id_fkey";

alter table "public"."attendee" drop constraint "attendee_member_id_fkey";

alter table "public"."event" drop constraint "event_id_key";

alter table "public"."member" drop constraint "member_id_key";

alter table "public"."division" drop constraint "division_song_instrument_id_fkey";

drop function if exists "public"."get_events_with_attendance"();

drop function if exists "public"."get_members_by_event"(event_id uuid);

drop function if exists "public"."verify_user_password"(password text);

alter table "public"."attendee" drop constraint "attendee_pkey";

alter table "public"."event" drop constraint "event_pkey";

drop index if exists "public"."attendee_pkey";

drop index if exists "public"."event_id_key";

drop index if exists "public"."event_pkey";

drop index if exists "public"."member_id_key";

drop table "public"."attendee";

drop table "public"."event";

alter table "public"."song" add column "image" text;

alter table "public"."song" add column "previewUrl" text;

drop type "public"."attending";

drop type "public"."event_type";

alter table "public"."division" add constraint "division_song_instrument_id_fkey" FOREIGN KEY (song_instrument_id) REFERENCES song_instrument(id) not valid;

alter table "public"."division" validate constraint "division_song_instrument_id_fkey";

create policy "Members are deletable by everyone."
on "public"."member"
as permissive
for delete
to authenticated, anon
using (true);

create policy "Enable delete access for users"
on "public"."song"
as permissive
for delete
to authenticated
using (true);


create policy "Enable update access for users"
on "public"."song"
as permissive
for update
to authenticated, pgsodium_keyholder
using (true)
with check (true);



