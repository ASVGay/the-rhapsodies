drop policy "Enable update for users based on id" on "public"."member";

alter table "public"."member" add column "hidden" boolean not null default false;

create policy "Enable update for users based on id"
on "public"."member"
as permissive
for update
               to authenticated
               using ((auth.uid() = id))
    with check ((auth.uid() = id));
