create policy "Enable delete access for admins"
on "public"."song"
as permissive
for delete
to authenticated
using (is_claims_admin());



