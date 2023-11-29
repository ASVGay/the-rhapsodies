

-- Delete users (since they won't be deleted on remote db)
DELETE FROM "auth"."users" WHERE id IN ('4ec7af50-3ced-45a9-9c1c-0e1038404778', '569e7419-5424-4d18-9918-31016f6252d7','1421420e-9b96-4f55-844f-1385c770aaa5', '1ce835c1-a708-4e73-a808-334e982dfe3d', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4', 'de315267-9634-4cb8-9c7c-d0edd66c62fe', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f');


-- Do not change these users. They are used for Cypress tests.
-- However update the SQL if any changes have been made to the `member` table.
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user") VALUES ('00000000-0000-0000-0000-000000000000', '4ec7af50-3ced-45a9-9c1c-0e1038404778', 'authenticated', 'authenticated', 'admin@cypress', '$2a$10$75nN5Q/T4k840.pxlUVSzO2YUo4r038ucd2sM1cNTyaS2hOmB416.', '2023-05-16 08:23:07.992463+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-05-16 08:50:07.776211+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-05-16 08:23:07.989348+00', '2023-05-16 08:50:07.777528+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user") VALUES ('00000000-0000-0000-0000-000000000000', '569e7419-5424-4d18-9918-31016f6252d7', 'authenticated', 'authenticated', 'new@cypress', '$2a$10$b6bT0PQv8JdC7Ub9vN0RYuHJrP21xkIK0lj2WfV7UIkVqQ9YT8R2u', '2023-05-16 08:23:29.855917+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-05-16 08:50:09.183747+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-05-16 08:23:29.854098+00', '2023-05-16 08:50:09.185724+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user") VALUES ('00000000-0000-0000-0000-000000000000', '1421420e-9b96-4f55-844f-1385c770aaa5', 'authenticated', 'authenticated', 'user@cypress', '$2a$10$dJT4PDUC2kguZwKL3PqTEu7MleLfAkftAI5RMQfYi7IUBqzG9DWCi', '2023-11-28 23:10:33.264902+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-28 23:11:18.453097+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-05-16 08:24:33.248832+00', '2023-05-16 08:50:28.824992+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);

INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES ('4ec7af50-3ced-45a9-9c1c-0e1038404778', '4ec7af50-3ced-45a9-9c1c-0e1038404778', '{"sub": "4ec7af50-3ced-45a9-9c1c-0e1038404778", "email": "admin@cypress"}', 'email', '2023-05-16 08:23:07.990111+00', '2023-05-16 08:23:07.990136+00', '2023-05-16 08:23:07.990136+00');
INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES ('569e7419-5424-4d18-9918-31016f6252d7', '569e7419-5424-4d18-9918-31016f6252d7', '{"sub": "569e7419-5424-4d18-9918-31016f6252d7", "email": "new@cypress"}', 'email', '2023-05-16 08:23:29.854808+00', '2023-05-16 08:23:29.854828+00', '2023-05-16 08:23:29.854828+00');
INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES ('1421420e-9b96-4f55-844f-1385c770aaa5', '1421420e-9b96-4f55-844f-1385c770aaa5', '{"sub": "1421420e-9b96-4f55-844f-1385c770aaa5", "email": "user@cypress"}', 'email', '2023-11-28 23:10:33.257853+00', '2023-11-28 23:10:33.257907+00', '2023-11-28 23:10:33.257907+00');

INSERT INTO "public"."member" ("display_name", "id") VALUES ('Admin', '4ec7af50-3ced-45a9-9c1c-0e1038404778');
INSERT INTO "public"."member" ("display_name", "id") VALUES ('User', '1421420e-9b96-4f55-844f-1385c770aaa5');

-- Allow deleting members for Cypress tests
CREATE POLICY "Members are viewable by everyone." ON "member" FOR SELECT TO "authenticated", "anon" USING (true);
CREATE POLICY "Members are deletable by everyone." ON "member" FOR DELETE TO "authenticated", "anon" USING (true);

-- Create users for developers
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user") VALUES ('00000000-0000-0000-0000-000000000000', '1ce835c1-a708-4e73-a808-334e982dfe3d', 'authenticated', 'authenticated', 'feryll@local', '$2a$10$I0kfL9CpRu6P1eEo.2gELOZ9kGBtkYK3f839YZmp0HFIIbKPL/EEq', '2023-05-18 02:04:25.378505+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-05-18 02:05:18.706407+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-05-18 02:04:25.371707+00', '2023-05-18 02:05:28.937951+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user") VALUES ('00000000-0000-0000-0000-000000000000', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4', 'authenticated', 'authenticated', 'kevin@local', '$2a$10$abGfTz8srhR5xbYBbu/BROdRBLujxDpC5FVtskSAhyMQ7MtRVWgTy', '2023-05-18 02:04:38.908645+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-05-18 02:05:42.905695+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-05-18 02:04:38.904983+00', '2023-05-18 02:07:45.867248+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user") VALUES ('00000000-0000-0000-0000-000000000000', 'de315267-9634-4cb8-9c7c-d0edd66c62fe', 'authenticated', 'authenticated', 'rens@local', '$2a$10$gcGyW4uqnM0rHIdzm8ENVuuFkXqcfKQmfx31F7fuefaBblSmeS2Uu', '2023-05-18 02:04:51.062906+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-05-18 02:07:56.371157+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-05-18 02:04:51.059654+00', '2023-05-18 02:08:06.704493+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user") VALUES ('00000000-0000-0000-0000-000000000000', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f', 'authenticated', 'authenticated', 'marcel@local', '$2a$10$Z5Rgp9qbgosgCjbDZj1XvenUeCFgT.EhCaqilRykTYOf205vCrk8e', '2023-05-18 02:05:05.643051+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-05-18 02:08:17.17678+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-05-18 02:05:05.640591+00', '2023-05-18 02:08:29.39377+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);

INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES ('1ce835c1-a708-4e73-a808-334e982dfe3d', '1ce835c1-a708-4e73-a808-334e982dfe3d', '{"sub": "1ce835c1-a708-4e73-a808-334e982dfe3d", "email": "feryll@local"}', 'email', '2023-05-18 02:04:25.375682+00', '2023-05-18 02:04:25.375732+00', '2023-05-18 02:04:25.375732+00');
INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES ('cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4', '{"sub": "cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4", "email": "kevin@local"}', 'email', '2023-05-18 02:04:38.906439+00', '2023-05-18 02:04:38.90648+00', '2023-05-18 02:04:38.90648+00');
INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES ('de315267-9634-4cb8-9c7c-d0edd66c62fe', 'de315267-9634-4cb8-9c7c-d0edd66c62fe', '{"sub": "de315267-9634-4cb8-9c7c-d0edd66c62fe", "email": "rens@local"}', 'email', '2023-05-18 02:04:51.06066+00', '2023-05-18 02:04:51.060692+00', '2023-05-18 02:04:51.060692+00');
INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES ('ba1dd6e7-0955-417d-9f9c-3ad841e7277f', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f', '{"sub": "ba1dd6e7-0955-417d-9f9c-3ad841e7277f", "email": "marcel@local"}', 'email', '2023-05-18 02:05:05.641404+00', '2023-05-18 02:05:05.641435+00', '2023-05-18 02:05:05.641435+00');

INSERT INTO "public"."member" ("display_name", "id") VALUES ('Kevin', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4');
INSERT INTO "public"."member" ("display_name", "id") VALUES ('Rens', 'de315267-9634-4cb8-9c7c-d0edd66c62fe');
INSERT INTO "public"."member" ("display_name", "id") VALUES ('Marcel', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f');
INSERT INTO "public"."member" ("display_name", "id") VALUES ('Feryll', '1ce835c1-a708-4e73-a808-334e982dfe3d');

-- Make 'Admin' & 'Feryll' an admin
SELECT set_claim('4ec7af50-3ced-45a9-9c1c-0e1038404778', 'claims_admin', 'true');
SELECT set_claim('1ce835c1-a708-4e73-a808-334e982dfe3d', 'claims_admin', 'true');

-- Create instruments
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('edc0bc16-b99f-436c-af63-3f9cd838c986', 'Vocals', 'micro');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('f5ccaa5d-c601-40fb-8604-5fc7485f8528', 'Acoustic Guitar', 'guitar');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('eb70c557-f23e-42b8-9e6e-3726d2ff2e88', 'Rhythm Guitar', 'guitar-strings');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('52bcbb7a-02e2-4cc8-a353-7b4402efacd7', 'Lead Guitar', 'guitar-strings');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('c52a4872-69ed-4c9b-95ae-ffa6d06701c1', 'Bass Guitar', 'rock-music');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('52cf33dd-0067-431d-bc2f-745bedb3e07e', 'Piano', 'grand-piano');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('b16f75cd-907f-44f2-a67b-28853c9d55a9', 'Drums', 'drums');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('08527f92-4aa3-4f65-b12c-b8b5e82752e7', 'Synth', 'piano');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('2521bb43-87b7-48ce-87d7-5ff6c7bfb94b', 'Trumpet', 'trumpet');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('ec745806-bbcb-46fa-b5c3-a702b8f3d603', 'Flute', 'flute');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('59b42237-f8e8-47b9-a175-c9e497f5fd85', 'Strings', 'violin');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('b12b75f2-8fde-4108-8c0f-a9865c8e0969', 'Saxophone', 'saxophone');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('93c467da-9485-4f4a-95dc-8190ab5e728c', 'Cowbell', 'cowbell');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('9128bc25-9e87-4f00-ac9a-bc447142328e', 'Maracas', 'maracas');
INSERT INTO "public"."instrument" ("id", "instrument_name", "image_source") VALUES ('7d0a428d-eae6-429d-9877-48b8b79ecc73', 'Clap', 'applause');

-- Create suggestions
INSERT INTO "public"."song" ("id", "title", "artist", "motivation", "created_at", "author", "link") VALUES ('687d4b20-9c34-4ff5-a1b5-ab4ca54c008c', 'Nobody', '{Mitski}', 'Banger with almost all instruments we have and even a fun hand clap part for those who have their hands free (unfortunately for me😔)!', '2023-03-05 00:00:00+00', 'de315267-9634-4cb8-9c7c-d0edd66c62fe', 'https://open.spotify.com/track/2P5yIMu2DNeMXTyOANKS6k?si=TT9hBdpWSausBKiT7hqBVA');
INSERT INTO "public"."song" ("id", "title", "artist", "motivation", "created_at", "author", "link", "inRepertoire") VALUES ('f0a04fe5-8290-445b-af94-1b2ae0263431', 'Jessie''s Girl', '{"Rick Springfield"}', 'Pretty fun song with a nice guitar solo and fun interlude in it. Vocals are not too high and I think it would sound okay with multiple vocalists as well. All instruments (expect for the lead guitar) are fairly easy as well.', '2023-05-10 00:00:00+00', '1ce835c1-a708-4e73-a808-334e982dfe3d', NULL,true);
-- Suggestion used for edit-suggestion testing (authorized for test user)
INSERT INTO "public"."song" ("id", "title", "artist", "motivation", "created_at", "author", "link") VALUES ('e743664e-b85b-4164-8163-24c9957f5ffd', 'Don''t Stop Believin''', '{Journey}', 'Featured in Glee, energetic and easy for a most likely drunk crowd to sing along with.', '2023-02-14 00:00:00+00', '4ec7af50-3ced-45a9-9c1c-0e1038404778', 'https://open.spotify.com/track/4bHsxqR3GMrXTxEPLuK5ue?si=84ccb0c63a4046e8');
INSERT INTO "public"."song" ("id", "title", "artist", "motivation", "created_at", "author", "link") VALUES ('ca20ae76-f6b3-4224-99af-cac14643a967', 'Smells Like Teen Spirit', '{Nirvana}', 'i know some of us already want to play this song, so let''s just do it :)', '2023-02-14 00:00:00+00', '4ec7af50-3ced-45a9-9c1c-0e1038404778', NULL);
-- Songs used for image testing
INSERT INTO "public"."song" ("id", "title", "artist", "motivation", "created_at", "author", "link", "inRepertoire", "image", "previewUrl") VALUES ('771a84a3-e582-4acb-8458-25841a8f9fce', 'Be Honest (feat. Burna Boy)', '{"Jorja Smith", "Burna Boy"}', 'Fun song that I think we would really enjoy to play. Enough roles to fill to have a large group join in.', '2023-05-11 00:00:00+00', '1ce835c1-a708-4e73-a808-334e982dfe3d', 'https://open.spotify.com/track/5pAbCxt9e3f81lOmjIXwzd', true, 'https://i.scdn.co/image/ab67616d000048510d4b41895ada0172a9237b9e', 'https://p.scdn.co/mp3-preview/c93e00fffb6375770af94f61472e1927895be9f6?cid=e16fb4c9d3424f2cac1ad481e3f3d7f9');
INSERT INTO "public"."song" ("id", "title", "artist", "motivation", "created_at", "author", "link", "inRepertoire", "image", "previewUrl") VALUES ('166f11fc-5e2b-4a1f-b962-1d8fe9314ae8', 'We''re all In This Together', '{"High School Musical Cast", "Disney"}', 'Who doesn''t want to learn how to play this song?', '2023-05-11 00:00:00+00', '1ce835c1-a708-4e73-a808-334e982dfe3d', null, true, null, null);

-- Add instruments to songs
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('dc998144-1b73-4330-8ebf-749e51852fff', 'ca20ae76-f6b3-4224-99af-cac14643a967', 'edc0bc16-b99f-436c-af63-3f9cd838c986', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('a6744f20-5de3-45d5-833d-fa5eb93eac38', 'ca20ae76-f6b3-4224-99af-cac14643a967', 'c52a4872-69ed-4c9b-95ae-ffa6d06701c1', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('ff9a05ed-32a6-4807-bdba-4b16b63ea11c', 'ca20ae76-f6b3-4224-99af-cac14643a967', '52bcbb7a-02e2-4cc8-a353-7b4402efacd7', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('cdcc14bf-8411-4e5d-8f49-4aaef682d27e', 'ca20ae76-f6b3-4224-99af-cac14643a967', 'b16f75cd-907f-44f2-a67b-28853c9d55a9', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('df8927e4-da0c-4e90-a97d-8ddcc55adbd7', '687d4b20-9c34-4ff5-a1b5-ab4ca54c008c', 'edc0bc16-b99f-436c-af63-3f9cd838c986', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('188ca387-db21-471b-b6c0-43c3d7aab6a9', '687d4b20-9c34-4ff5-a1b5-ab4ca54c008c', 'eb70c557-f23e-42b8-9e6e-3726d2ff2e88', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('c1bca47a-5efb-45cf-9432-fea82540a09b', '687d4b20-9c34-4ff5-a1b5-ab4ca54c008c', 'eb70c557-f23e-42b8-9e6e-3726d2ff2e88', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('d39707d9-9cdb-4cf3-ba17-bed580973155', '687d4b20-9c34-4ff5-a1b5-ab4ca54c008c', '52cf33dd-0067-431d-bc2f-745bedb3e07e', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('e98b5f78-2117-43e6-90ed-1f9d5b7489f7', '687d4b20-9c34-4ff5-a1b5-ab4ca54c008c', '08527f92-4aa3-4f65-b12c-b8b5e82752e7', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('2c5b40c0-983e-44c1-a056-9981a0a84bac', '687d4b20-9c34-4ff5-a1b5-ab4ca54c008c', 'b16f75cd-907f-44f2-a67b-28853c9d55a9', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('750a1051-c6d8-4f9a-abce-3ed9b19eb9be', '687d4b20-9c34-4ff5-a1b5-ab4ca54c008c', 'c52a4872-69ed-4c9b-95ae-ffa6d06701c1', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('655f1c30-57cf-41bd-9f28-c3df16c29ea9', '687d4b20-9c34-4ff5-a1b5-ab4ca54c008c', '7d0a428d-eae6-429d-9877-48b8b79ecc73', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('e6fa73a2-ab7e-433b-8fd0-b389aa6adacc', 'e743664e-b85b-4164-8163-24c9957f5ffd', '52cf33dd-0067-431d-bc2f-745bedb3e07e', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('612d1c2c-23e6-4e70-b4cd-43876ca03926', 'e743664e-b85b-4164-8163-24c9957f5ffd', 'b16f75cd-907f-44f2-a67b-28853c9d55a9', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('e7d1ff1c-0791-4944-98c9-a91db19b665b', 'e743664e-b85b-4164-8163-24c9957f5ffd', 'c52a4872-69ed-4c9b-95ae-ffa6d06701c1', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('44065868-03df-494f-91ad-127bd803c3f1', 'e743664e-b85b-4164-8163-24c9957f5ffd', '52bcbb7a-02e2-4cc8-a353-7b4402efacd7', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('82a5e8c8-f435-40af-8c0d-167b16a6c1b4', 'e743664e-b85b-4164-8163-24c9957f5ffd', 'edc0bc16-b99f-436c-af63-3f9cd838c986', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('55b0255a-2caf-48c5-b130-bc9ab99a060d', 'f0a04fe5-8290-445b-af94-1b2ae0263431', 'edc0bc16-b99f-436c-af63-3f9cd838c986', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('3833a088-798c-4078-8171-36224892da62', 'f0a04fe5-8290-445b-af94-1b2ae0263431', 'eb70c557-f23e-42b8-9e6e-3726d2ff2e88', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('e85d3c27-cd2f-4f17-9e1d-76efb95dc811', 'f0a04fe5-8290-445b-af94-1b2ae0263431', '52bcbb7a-02e2-4cc8-a353-7b4402efacd7', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('0facee49-a54b-4970-9a97-c974e39da600', 'f0a04fe5-8290-445b-af94-1b2ae0263431', 'c52a4872-69ed-4c9b-95ae-ffa6d06701c1', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('570a12d4-a436-40cb-9936-cffb6148b506', 'f0a04fe5-8290-445b-af94-1b2ae0263431', '08527f92-4aa3-4f65-b12c-b8b5e82752e7', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('e3ae0780-78c9-453e-bef2-5f0d0788d68b', 'f0a04fe5-8290-445b-af94-1b2ae0263431', 'b16f75cd-907f-44f2-a67b-28853c9d55a9', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('87ce3264-6af7-407a-b25b-371a3a6cd0fe', '771a84a3-e582-4acb-8458-25841a8f9fce', '08527f92-4aa3-4f65-b12c-b8b5e82752e7', NULL);
INSERT INTO "public"."song_instrument" ("id", "song_id", "instrument_id", "description") VALUES ('655876f8-c325-4bb2-be8d-838f3a3f4fe3', '166f11fc-5e2b-4a1f-b962-1d8fe9314ae8', 'b16f75cd-907f-44f2-a67b-28853c9d55a9', NULL);

-- Insert instrument divisions
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('cdcc14bf-8411-4e5d-8f49-4aaef682d27e', '1ce835c1-a708-4e73-a808-334e982dfe3d');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('2c5b40c0-983e-44c1-a056-9981a0a84bac', '1ce835c1-a708-4e73-a808-334e982dfe3d');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('612d1c2c-23e6-4e70-b4cd-43876ca03926', '1ce835c1-a708-4e73-a808-334e982dfe3d');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('e3ae0780-78c9-453e-bef2-5f0d0788d68b', '1ce835c1-a708-4e73-a808-334e982dfe3d');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('a6744f20-5de3-45d5-833d-fa5eb93eac38', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('750a1051-c6d8-4f9a-abce-3ed9b19eb9be', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('e7d1ff1c-0791-4944-98c9-a91db19b665b', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('0facee49-a54b-4970-9a97-c974e39da600', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('ff9a05ed-32a6-4807-bdba-4b16b63ea11c', 'de315267-9634-4cb8-9c7c-d0edd66c62fe');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('188ca387-db21-471b-b6c0-43c3d7aab6a9', 'de315267-9634-4cb8-9c7c-d0edd66c62fe');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('44065868-03df-494f-91ad-127bd803c3f1', 'de315267-9634-4cb8-9c7c-d0edd66c62fe');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('3833a088-798c-4078-8171-36224892da62', 'de315267-9634-4cb8-9c7c-d0edd66c62fe');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('dc998144-1b73-4330-8ebf-749e51852fff', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('df8927e4-da0c-4e90-a97d-8ddcc55adbd7', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('82a5e8c8-f435-40af-8c0d-167b16a6c1b4', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f');
INSERT INTO "public"."division" ("song_instrument_id", "musician") VALUES ('55b0255a-2caf-48c5-b130-bc9ab99a060d', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f');

-- Insert event for testing
INSERT INTO "public"."event" ("id", "event_type", "start_time", "end_time", "location") VALUES ('0b5fb485-fc2a-4acc-8fd7-64f008c3089e', 'brainstormborrel', '2023-06-14 17:00:00+00', '2023-06-14 19:00:00+00', 'CREA 3.14');

-- Events
INSERT INTO "public"."event" ("id", "event_type", "start_time", "end_time", "location")
VALUES ('52bcbb7a-02e3-4cc8-a353-7b4402efacd7', 'brainstormborrel', (current_timestamp + INTERVAL '1 hour') + (random() * INTERVAL '7 days'), (current_timestamp + INTERVAL '2 hours') + (random() * INTERVAL '7 days'), 'CREA 3.14');
INSERT INTO "public"."event" ("id", "event_type", "start_time", "end_time", "location")
VALUES ('7a620d4c-5985-4cbb-aa9e-26e72c5eaede', 'rehearsal', (current_timestamp + INTERVAL '14 hours') + (random() * INTERVAL '7 days'), (current_timestamp + INTERVAL '19 hours') + (random() * INTERVAL '7 days'), 'Rewind Music Studio');
INSERT INTO "public"."event" ("id", "event_type", "start_time", "end_time", "location")
VALUES ('f5ff70b4-6e0c-4ad0-b73c-7355d863a504', 'brainstormborrel', current_timestamp + (random() * INTERVAL '7 days'), (current_timestamp + INTERVAL '1 hour') + (random() * INTERVAL '7 days'), 'CREA 2.11');
INSERT INTO "public"."event" ("id", "event_type", "start_time", "end_time", "location")
VALUES ('4c0c7b17-ed22-4ff9-8161-5c4995d4adce', 'rehearsal', current_timestamp + (random() * INTERVAL '7 days'), (current_timestamp + INTERVAL '1 hour') + (random() * INTERVAL '7 days'), 'Helicopter Amsterdam');

-- Attendees
INSERT INTO "public"."attendee" ("event_id", "member_id", "attending")
VALUES ('52bcbb7a-02e3-4cc8-a353-7b4402efacd7', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4', 'present');
INSERT INTO "public"."attendee" ("event_id", "member_id", "attending")
VALUES ('7a620d4c-5985-4cbb-aa9e-26e72c5eaede', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4', 'present');
INSERT INTO "public"."attendee" ("event_id", "member_id", "attending")
VALUES ('f5ff70b4-6e0c-4ad0-b73c-7355d863a504', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4', 'absent');
INSERT INTO "public"."attendee" ("event_id", "member_id", "attending")
VALUES ('4c0c7b17-ed22-4ff9-8161-5c4995d4adce', 'cbe9b982-fbf9-4036-9e4a-b98b0b4f26d4', 'present');
INSERT INTO "public"."attendee" ("event_id", "member_id", "attending")
VALUES ('52bcbb7a-02e3-4cc8-a353-7b4402efacd7', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f', 'present');
INSERT INTO "public"."attendee" ("event_id", "member_id", "attending")
VALUES ('7a620d4c-5985-4cbb-aa9e-26e72c5eaede', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f', 'absent');
INSERT INTO "public"."attendee" ("event_id", "member_id", "attending")
VALUES ('f5ff70b4-6e0c-4ad0-b73c-7355d863a504', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f', 'undecided');
INSERT INTO "public"."attendee" ("event_id", "member_id", "attending")
VALUES ('4c0c7b17-ed22-4ff9-8161-5c4995d4adce', 'ba1dd6e7-0955-417d-9f9c-3ad841e7277f', 'present');
