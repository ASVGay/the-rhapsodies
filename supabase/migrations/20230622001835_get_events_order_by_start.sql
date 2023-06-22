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
  WHERE e.end_time >= NOW()
  GROUP BY e.id
  ORDER BY e.start_time;
END;
$function$
;