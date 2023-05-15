
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE "public"."division" (
    "suggestion_instrument_id" "uuid" NOT NULL,
    "musician" "uuid" NOT NULL
);

ALTER TABLE "public"."division" OWNER TO "postgres";

CREATE TABLE "public"."instrument" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "instrument_name" "text" NOT NULL,
    "image_source" "text" NOT NULL
);

ALTER TABLE "public"."instrument" OWNER TO "postgres";

CREATE TABLE "public"."member" (
    "is_first_login" boolean,
    "display_name" "text",
    "id" "uuid" NOT NULL
);

ALTER TABLE "public"."member" OWNER TO "postgres";

CREATE TABLE "public"."suggestion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "artist" "text"[] NOT NULL,
    "motivation" "text" NOT NULL,
    "created_at" "date" DEFAULT CURRENT_DATE NOT NULL,
    "author" "uuid" NOT NULL,
    "link" "text"
);

ALTER TABLE "public"."suggestion" OWNER TO "postgres";

CREATE TABLE "public"."suggestion_instrument" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "suggestion_id" "uuid" NOT NULL,
    "instrument_id" "uuid" NOT NULL,
    "description" "text"
);

ALTER TABLE "public"."suggestion_instrument" OWNER TO "postgres";

ALTER TABLE ONLY "public"."division"
    ADD CONSTRAINT "division_pkey" PRIMARY KEY ("suggestion_instrument_id", "musician");

ALTER TABLE ONLY "public"."instrument"
    ADD CONSTRAINT "pk_instrument" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."suggestion"
    ADD CONSTRAINT "pk_suggestion" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."suggestion_instrument"
    ADD CONSTRAINT "pk_suggestion_instrument" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."member"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."division"
    ADD CONSTRAINT "division_musician_fkey" FOREIGN KEY ("musician") REFERENCES "public"."member"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."division"
    ADD CONSTRAINT "division_suggestion_instrument_id_fkey" FOREIGN KEY ("suggestion_instrument_id") REFERENCES "public"."suggestion_instrument"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."suggestion"
    ADD CONSTRAINT "fk_suggestion_author" FOREIGN KEY ("author") REFERENCES "public"."member"("id");

ALTER TABLE ONLY "public"."suggestion_instrument"
    ADD CONSTRAINT "fk_suggestion_instrument_instrument_id" FOREIGN KEY ("instrument_id") REFERENCES "public"."instrument"("id");

ALTER TABLE ONLY "public"."member"
    ADD CONSTRAINT "member_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."suggestion"
    ADD CONSTRAINT "suggestion_author_fkey" FOREIGN KEY ("author") REFERENCES "public"."member"("id");

ALTER TABLE ONLY "public"."suggestion_instrument"
    ADD CONSTRAINT "suggestion_instrument_suggestion_id_fkey" FOREIGN KEY ("suggestion_id") REFERENCES "public"."suggestion"("id") ON DELETE CASCADE;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."division" TO "anon";
GRANT ALL ON TABLE "public"."division" TO "authenticated";
GRANT ALL ON TABLE "public"."division" TO "service_role";

GRANT ALL ON TABLE "public"."instrument" TO "anon";
GRANT ALL ON TABLE "public"."instrument" TO "authenticated";
GRANT ALL ON TABLE "public"."instrument" TO "service_role";

GRANT ALL ON TABLE "public"."member" TO "anon";
GRANT ALL ON TABLE "public"."member" TO "authenticated";
GRANT ALL ON TABLE "public"."member" TO "service_role";

GRANT ALL ON TABLE "public"."suggestion" TO "anon";
GRANT ALL ON TABLE "public"."suggestion" TO "authenticated";
GRANT ALL ON TABLE "public"."suggestion" TO "service_role";

GRANT ALL ON TABLE "public"."suggestion_instrument" TO "anon";
GRANT ALL ON TABLE "public"."suggestion_instrument" TO "authenticated";
GRANT ALL ON TABLE "public"."suggestion_instrument" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
