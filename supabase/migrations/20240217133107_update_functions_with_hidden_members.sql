set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_events_with_attendance()
 RETURNS TABLE(id uuid, event_type event_type, start_time timestamp with time zone, end_time timestamp with time zone, location text, present bigint, absent bigint, undecided bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY SELECT
    e.id,
    e.event_type,
    e.start_time,
    e.end_time,
    e.location,
    COUNT(CASE WHEN a.attending = 'present' THEN 1 ELSE NULL END) AS present,
    COUNT(CASE WHEN a.attending = 'absent' THEN 1 ELSE NULL END) AS absent,
    COUNT(CASE WHEN a.attending = 'undecided' OR a.attending IS NULL THEN 1 ELSE NULL END) AS undecided
  FROM event e
  CROSS JOIN member m
  LEFT JOIN attendee a ON e.id = a.event_id AND m.id = a.member_id
  WHERE e.end_time >= NOW() AND NOT m.hidden
  GROUP BY e.id
  ORDER BY e.start_time ASC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_members_by_event(event_id uuid)
 RETURNS TABLE(id uuid, display_name text, attending attending, comment text)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY

SELECT member.id, member.display_name, COALESCE(attending.attending, 'undecided'::attending) as attending, attending.comment
FROM member
         LEFT JOIN (SELECT attendee.member_id, attendee.attending, attendee.comment
                    FROM attendee
                    WHERE attendee.event_id = $1) as attending
                   ON member.id = attending.member_id
WHERE NOT member.hidden
ORDER BY member.display_name;
END;
$function$
;
