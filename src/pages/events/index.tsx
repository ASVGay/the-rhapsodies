import React from 'react';
import {MagnifyingGlassCircleIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {PlusIcon} from "@heroicons/react/24/solid";
import SearchBar from "@/components/suggestion/search-bar";
import Spinner from "@/components/utils/spinner";
import ErrorPopup from "@/components/popups/error-popup";
import {SongType} from "@/components/wrapper/song-list-wrapper";
import EventCard from "@/components/events/event-card";

const Index = () => {
    return (
        <div className={"page-wrapper"}>
            <div className={"flex justify-between"}>
                <div className={"page-header"}>
                    Events
                </div>
            </div>
            <EventCard/>
        </div>
    );
};

export default Index;