CREATE TYPE EVENT_TYPE AS ENUM ('BrainstormBorrel', 'Rehearsal');


CREATE TABLE event (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type EVENT_TYPE,
  event_date TIMESTAMP WITH TIME ZONE,
  location TEXT
);