import { ErrorCodes } from "@/constants/error-codes"

export const mapAuthErrorCodeToErrorMessage = (errorCode: string | null): string => {
  switch (errorCode) {
    case ErrorCodes.INVALID_EMAIL:
      return "Please fill in a valid email."
    case ErrorCodes.USER_DELETED:
      return "Wrong credentials."
    case ErrorCodes.INVALID_PASSWORD:
      return "Wrong credentials."
    case ErrorCodes.EMPTY_PASSWORD:
      return "Password is missing."
    case ErrorCodes.BAD_PASSWORD:
      return "Password is too short, has to be at least 6 characters."
    case ErrorCodes.REQUIRE_RECENT_LOGIN:
      return "Before you can change your password, you have to login again. You will be logged out in 5 seconds."
    default:
      return "An unknown error occurred."
  }
}
