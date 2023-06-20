import React, { useEffect, useState } from "react";
import OverlayContainer from "./overlay-container";
import { getOverlay } from "@/helpers/overlay.helper";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/error/error-message";
import { ClockIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/database";
import { Event } from "@/types/database-types";
import { getEventDate, getEventTime, getEventTitle } from "@/helpers/event.helper";
import { CalendarIcon } from "@heroicons/react/24/solid";

interface DeleteEventOverlayProps {
    onClose: (showOverlay: boolean) => void;
    event: Event;
}

const DeleteEventOverlay = ({ onClose, event }: DeleteEventOverlayProps) => {
    const supabase = useSupabaseClient<Database>();
    const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false);
    const [showInput, setShowInput] = useState(false);
    useEffect(() => setOverlayIsOpen(true), []);

    const waitForTransition = (isOpen: boolean) => {
        setOverlayIsOpen(false);
        setTimeout(() => onClose(isOpen), 300);
    };

    return getOverlay(
        <OverlayContainer
            animationActive={overlayIsOpen}
            padding={false}>
            <div className="flex w-full flex-col">
                <div className="grid grid-cols-12 p-2">
                    <div className="col-span-2"/> {/* Empty left column */}
                    <div className="col-span-8 flex items-center justify-center">
                        <span className="text-lg font-bold leading-8">Delete Brainstormborrel</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-end">
                        <XMarkIcon
                            className="h-6 cursor-pointer text-zinc-500 hover:text-red-600"
                            onClick={() => waitForTransition(false)}
                            data-cy="close-comment-overlay"
                        />
                    </div>
                </div>
                <hr className="w-full" />
                <div className="fle items-center justify-center pb-2 pt-2">
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-lg font-bold leading-8">{getEventTitle(event.event_type)}</span>
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-2">
                                <CalendarIcon height={20} width={20} color="#EEC73F" />
                                <span className="text-base font-normal leading-5">{getEventDate(event.start_time)}</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <ClockIcon height={20} width={20} color="#EEC73F" />
                                <span className="text-base font-normal leading-5">{getEventTime(event.start_time, event.end_time)}</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <MapPinIcon height={20} width={20} color="#EEC73F" />
                                <span className="text-base font-normal leading-5">{event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="w-full" />
                {
                    !showInput ?
                        <button
                            className="btn error m-4"
                            data-cy={"delete-event-button"}
                            onClick={() => setShowInput(true)}
                        >
                            I want to delete this event
                        </button>
                        :
                        <h1>hi</h1>
                }

            </div>
        </OverlayContainer>
    );
};

export default DeleteEventOverlay;
