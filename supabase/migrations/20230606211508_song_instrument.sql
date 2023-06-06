create policy "Enable "
on "public"."song_instrument"
as permissive
for update
to public
using (true);


create policy "Enable update for all authenticated users"
on "public"."song_instrument"
as permissive
for update
to public
using (true);



