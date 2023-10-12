create policy "Enable update access for admins"
on "public"."song"
as permissive
for update
to authenticated
using (is_claims_admin());

create policy "Enable update access for admins"
on "public"."song_instrument"
as permissive
for update
to authenticated
using (is_claims_admin());