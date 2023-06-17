CREATE OR REPLACE FUNCTION public.verify_user_password(password text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT id 
    FROM auth.users 
    WHERE id = auth.uid() AND encrypted_password = crypt(password::text, auth.users.encrypted_password)
  );
END;
$function$
;