import React from 'react';

interface ErrorMsgProps {
    message?: string;
    dataCy: string
}
const ErrorMsg = (props: ErrorMsgProps) => {
    return (
        <span data-cy={props.dataCy} className={"text-xs text-red-600"}>
                ⚠ {props.message}
              </span>
    );
};

export default ErrorMsg;