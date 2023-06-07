create policy "Enable delete for all authenticated users"
on "public"."song_instrument"
as permissive
for delete
to authenticated
using (true);

create policy "Enable update for all authenticated users"
on "public"."song_instrument"
as permissive
for update
to authenticated
using (true);