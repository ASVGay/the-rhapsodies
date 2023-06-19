drop type if exists "public"."event_type";

create type "public"."event_type" as enum ('brainstormborrel', 'rehearsal');

create table "public"."event" (
    "id" uuid not null default gen_random_uuid(),
    "event_type" event_type not null,
    "start_time" timestamp with time zone not null,
    "end_time" timestamp with time zone not null,
    "location" text not null
);


alter table "public"."event" enable row level security;

CREATE UNIQUE INDEX event_pkey ON public.event USING btree (id);

alter table "public"."event" add constraint "event_pkey" PRIMARY KEY using index "event_pkey";

create policy "Enable read access for all authenticated users"
on "public"."event"
as permissive
for select
to authenticated, anon
using (true);

create policy "Enable insert for authenticated users only"
on "public"."event"
as permissive
for insert
to authenticated
with check (true);

