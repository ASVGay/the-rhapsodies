import React from 'react';
import Image from 'next/image'

interface ErrorPopupProps {
    text: string,
    closePopup: () => void
}
const ErrorPopup = (props: ErrorPopupProps) => {
    return (
        <div className="flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <strong className="font-bold">{props.text}</strong>
            <Image onClick={props.closePopup} width={16} height={16} alt={"close icon"} src={'/icons/close_icon.svg'}/>
        </div>
    );
};

export default ErrorPopup;