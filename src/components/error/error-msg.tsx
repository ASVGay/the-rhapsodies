import React from 'react';

interface ErrorMsgProps {
    message?: string;
}
const ErrorMsg = (props: ErrorMsgProps) => {
    return (
        <span data-cy={"submit-error"} className={"text-xs text-red-600"}>
                ⚠ {props.message}
              </span>
    );
};

export default ErrorMsg;