CREATE UNIQUE INDEX event_id_key ON public.event USING btree (id);

CREATE UNIQUE INDEX member_id_key ON public.member USING btree (id);

alter table "public"."event" add constraint "event_id_key" UNIQUE using index "event_id_key";

alter table "public"."member" add constraint "member_id_key" UNIQUE using index "member_id_key";