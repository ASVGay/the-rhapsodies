create policy "Enable update for users"
on "public"."suggestion"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "Enable delete of suggestion_instrument when authenticated"
on "public"."suggestion_instrument"
as permissive
for delete
to authenticated
using (true);


create policy "Enable update of suggestion_instrument when authenticated"
on "public"."suggestion_instrument"
as permissive
for update
to authenticated
using (true);



