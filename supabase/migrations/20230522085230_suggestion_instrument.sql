drop policy "Enable insert for authenticated users only" on "public"."suggestion_instrument";

create policy "Enable insert for authenticated users only"
on "public"."suggestion_instrument"
as permissive
for insert
to authenticated
with check (true);



