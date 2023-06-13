CREATE TYPE EVENT_TYPE AS ENUM ('BrainstormBorrel', 'Rehearsal');


CREATE TABLE event (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type EVENT_TYPE NOT NULL,
  event_start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  event_end_time TIMESTAMP WITH TIME ZONE,
  location TEXT
);