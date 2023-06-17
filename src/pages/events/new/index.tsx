import React, {useState} from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default function Index() {
    const [startDate, setStartDate] = useState(new Date());
    const customBtn =
        <input
            className="w-full rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-moon-500 focus:bg-white focus:outline-none"/>
    return (
        <div className={"page-wrapper"}>

            <DatePicker
                wrapperClassName={"w-full"}
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                customInput={customBtn}
            />

            <style>
                {`
                    .react-datepicker__day--selected {
                        background-color: red;
                `}
            </style>
        </div>
    );
};