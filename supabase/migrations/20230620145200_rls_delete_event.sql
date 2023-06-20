drop policy if exists "Enable delete access for admins" on "public"."event";

create policy "Enable delete access for admins"
on "public"."event"
as permissive
for delete
to authenticated
using (is_claims_admin());