CREATE OR REPLACE FUNCTION public.get_members_by_event(event_id uuid)
 RETURNS TABLE(id uuid, display_name text, attending attending)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY

SELECT member.id, member.display_name, COALESCE(attending.attending, 'undecided'::attending) as attending
FROM member
         LEFT JOIN (SELECT attendee.member_id, attendee.attending
                    FROM attendee
                    WHERE attendee.event_id = $1) as attending
                   ON member.id = attending.member_id
ORDER BY member.display_name;
END;
$function$
;