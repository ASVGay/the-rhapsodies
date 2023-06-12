drop policy if exists "Enable delete for authenticated users based on author in song" on "public"."song_instrument";
drop policy if exists "Enable update for authenticated users based on author in song" on "public"."song_instrument";
drop policy if exists "Enable read access for all authenticated users" on "public"."song_instrument";
drop policy if exists "Enable delete for users based on user_id" on "public"."song_instrument";
drop policy if exists "Enable insert for authenticated users only" on "public"."song_instrument";

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

create policy "Enable delete for authenticated users based on author in song"
on "public"."song_instrument"
as permissive
for delete
to authenticated
using (true);

create policy "Enable update for authenticated users based on author in song"
on "public"."song_instrument"
as permissive
for update
to authenticated
using (true);