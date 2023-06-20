drop policy if exists "Enable insert access for admins";

create policy "Enable insert access for admins"
on "public"."event"
as permissive
for insert
to authenticated
with check (is_claims_admin());