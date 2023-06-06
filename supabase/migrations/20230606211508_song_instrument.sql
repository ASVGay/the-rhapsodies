create policy "Members are deletable by everyone."
on "public"."member"
as permissive
for delete
to authenticated, anon
using (true);


create policy "Members are viewable by everyone."
on "public"."member"
as permissive
for select
to authenticated, anon
using (true);


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



