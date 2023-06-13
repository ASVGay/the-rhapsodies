    CREATE TYPE EVENT_TYPE AS ENUM ('Brainstormborrel', 'Rehearsal');
    CREATE TYPE ATTENDING AS ENUM ('present', 'absent', 'undecided');


    CREATE TABLE event (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      event_type EVENT_TYPE NOT NULL,
      event_start_time TIMESTAMP WITH TIME ZONE NOT NULL,
      event_end_time TIMESTAMP WITH TIME ZONE,
      location TEXT
    );

    CREATE TABLE attendee (
        event_id UUID REFERENCES event(id),
        user_id UUID REFERENCES member(id),
        attending ATTENDING,
        remark TEXT
    )