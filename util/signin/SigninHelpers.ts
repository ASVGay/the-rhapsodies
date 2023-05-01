export const ErrorCodes = {
    INVALID_EMAIL: "auth/invalid-email",
    USER_DELETED: "auth/user-not-found",
    INVALID_PASSWORD: "auth/wrong-password",
    EMPTY_PASSWORD: "auth/missing-password",
    BAD_PASSWORD: "auth/weak-password",
};

export const mapAuthErrorCodeToErrorMessage = (errorCode: string | null): string => {
    switch (errorCode) {
        case ErrorCodes.INVALID_EMAIL:
            return "Please fill in a valid email.";
        case ErrorCodes.USER_DELETED:
            return "Wrong credentials.";
        case ErrorCodes.INVALID_PASSWORD:
            return "Wrong credentials.";
        case ErrorCodes.EMPTY_PASSWORD:
                return "Password is missing.";
        case ErrorCodes.BAD_PASSWORD:
            return "Password is too short, has to be at least 6 characters.";
        default:
            return "An unknown error occurred.";
    }
};