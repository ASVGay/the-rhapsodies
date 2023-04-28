import { FC } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Suggestions: FC = () => {
    return <>
        <div className={"flex p-4 pt-6 pb-6 justify-between"}>
            <div className={"text-2xl leading-8 font-semibold"}>Suggestions</div>
            <div>
                <PlusIcon
                    className={"h-8 w-8 text-black"}
                    onClick={() => {}}
                />
            </div>
        </div>
    </>
}

export default Suggestions;
