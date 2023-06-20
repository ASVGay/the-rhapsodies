alter table "public"."attendee" drop column if exists "comment";
alter table "public"."attendee" add column "comment" text;