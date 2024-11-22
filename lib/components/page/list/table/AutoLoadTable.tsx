import {ReactNode, useState} from "react";
import {ScrollVisibilityTrigger} from "../../../util/endless-scroll/ScrollVisibilityTrigger.tsx";
import Spinner from "../../../icon/Spinner.tsx";
import DeleteConfirmation from "./delete/DeleteConfirmation.tsx";
import useDeleter, {DeleteListener} from "../../../util/useDeleter.ts";
import {DeleteContext} from "./delete/DeleteContext.ts";
import {SortFunction, SortingCombination} from "./sort/useSorting.ts";
import {SortingContext} from "./sort/SortingContext.ts";

type Props = {
    title: string,
    demonstrativePronoun: string,
    children: ReactNode,
    hasNext: boolean,
    isLoadingNext: boolean,
    onLoadNext: (count: number) => void,
    onDelete: DeleteListener,
    sortFunction: SortFunction,
    sortingCombination: SortingCombination
};

export function AutoLoadTable({
    title,
    demonstrativePronoun,
    children,
    hasNext,
    isLoadingNext,
    onLoadNext,
    onDelete,
    sortFunction,
    sortingCombination
}: Props) {
    const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | undefined>();
    const {getDeleter} = useDeleter(title, onDelete);
    return (
        <>
            <SortingContext.Provider value={{sort: sortFunction, sortingCombination}}>
                <DeleteContext.Provider value={{deleteConfirmationId, setDeleteConfirmationId}}>
                    <table className="min-w-full divide-y divide-gray-300">{children}</table>
                </DeleteContext.Provider>
            </SortingContext.Provider>
            <ScrollVisibilityTrigger trigger={() => onLoadNext(20)} isActive={!isLoadingNext && hasNext}/>
            {isLoadingNext &&
              <div className="w-8 m-auto"><Spinner/></div>
            }
            <DeleteConfirmation
                title={title}
                demonstrativePronoun={demonstrativePronoun}
                open={deleteConfirmationId !== undefined}
                onClose={() => setDeleteConfirmationId(undefined)}
                onDelete={getDeleter(deleteConfirmationId)}
            />
        </>
    )
}
