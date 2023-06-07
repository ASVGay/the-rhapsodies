create policy "Enable delete for all authenticated users"
on "public"."song_instrument"
as permissive
for delete
to authenticated
using (true);