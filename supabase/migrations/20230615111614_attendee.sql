drop type if exists "public"."attending";

create type "public"."attending" as enum ('present', 'absent', 'undecided');

create table "public"."attendee" (
    "event_id" uuid not null,
    "member_id" uuid not null,
    "attending" attending not null default 'undecided'::attending
);


alter table "public"."attendee" enable row level security;

CREATE UNIQUE INDEX attendee_pkey ON public.attendee USING btree (event_id, member_id);

alter table "public"."attendee" add constraint "attendee_pkey" PRIMARY KEY using index "attendee_pkey";

alter table "public"."attendee" add constraint "attendee_event_id_fkey" FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE not valid;

alter table "public"."attendee" validate constraint "attendee_event_id_fkey";

alter table "public"."attendee" add constraint "attendee_member_id_fkey" FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE not valid;

alter table "public"."attendee" validate constraint "attendee_member_id_fkey";

create policy "Enable delete for users based on user_id"
on "public"."attendee"
as permissive
for delete
to authenticated
using ((auth.uid() = member_id));


create policy "Enable insert based on member id"
on "public"."attendee"
as permissive
for insert
to authenticated
with check ((auth.uid() = member_id));


create policy "Enable read access for authenticated users only"
on "public"."attendee"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for users based on user_id"
on "public"."attendee"
as permissive
for update
to authenticated
using ((auth.uid() = member_id))
with check ((auth.uid() = member_id));
