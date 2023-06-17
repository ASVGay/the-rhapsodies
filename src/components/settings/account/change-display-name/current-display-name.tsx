import React, { useEffect, useState } from "react"
import Spinner from "@/components/utils/spinner"
import { getDisplayName } from "@/services/authentication.service"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"

const CurrentDisplayName = () => {
  const uid = useUser()?.id
  const supabase = useSupabaseClient<Database>()
  const [isLoadingDisplayName, setIsLoadingDisplayName] = useState<boolean>(false)
  const [displayName, setDisplayName] = useState<string>("")
  const hasSuccessfullyLoadedDisplayName = !isLoadingDisplayName && displayName
  const hasFailedLoadingDisplayName = !isLoadingDisplayName && !displayName

  useEffect(() => {
    const retrieveCurrentDisplayName = () => {
      setIsLoadingDisplayName(true)
      if (uid) {
        getDisplayName(supabase, uid).then(({ data, error }) => {
          if (error) setDisplayName("")
          if (data) setDisplayName(data.display_name)
          setIsLoadingDisplayName(false)
        })
      }
    }

    retrieveCurrentDisplayName()
  }, [uid, supabase])

  return (
    <div>
      {isLoadingDisplayName && <Spinner size={6} dataCy={"spinner-display-name"} />}
      {hasSuccessfullyLoadedDisplayName && (
        <p data-cy={"current-display-name"}>
          Your current display name is <span className={"font-bold text-moon"}>{displayName}</span>.
        </p>
      )}
      {hasFailedLoadingDisplayName && (
        <p className={"text-xs italic"} data-cy={"error-current-display-name"}>
          Your current display name could not be retrieved. Try opening this setting again if you
          want to view it.
        </p>
      )}
    </div>
  )
}

export default CurrentDisplayName
