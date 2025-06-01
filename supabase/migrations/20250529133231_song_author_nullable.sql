alter table "public"."song" drop constraint "song_author_fkey";

alter table "public"."song" alter column "author" drop not null;

alter table "public"."song" add constraint "song_author_fkey" FOREIGN KEY (author) REFERENCES member(id) ON DELETE SET NULL not valid;

alter table "public"."song" validate constraint "song_author_fkey";


