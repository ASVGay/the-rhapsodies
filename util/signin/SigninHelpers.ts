export const ErrorCodes = {
    INVALID_EMAIL: "auth/invalid-email",
    USER_DELETED: "auth/user-not-found",
    INVALID_PASSWORD: "auth/wrong-password",
    EMPTY_PASSWORD: "auth/missing-password",
};

export const mapAuthErrorCodeToErrorMessage = (errorCode: string): string => {
    console.log(errorCode)
    switch (errorCode) {
        case ErrorCodes.INVALID_EMAIL:
            return "Please fill in a valid email.";
        case ErrorCodes.USER_DELETED:
            return "There is no user with this email.";
        case ErrorCodes.INVALID_PASSWORD:
            return "Password is not correct.";
        case ErrorCodes.EMPTY_PASSWORD:
                return "Retry later, too many attempts."
        default:
            return "An unknown error occurred.";
    }
};