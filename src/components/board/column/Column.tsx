import More from "@/assets/icons/more.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import Dropdown from "@/components/ui-mods/Dropdown";
import { Button } from "@/components/ui/button";
import { useBoardsStore } from "@/store/board";
import { DropdownOption } from "@/types/common";
import { useMemo, useState } from "react";
import CreateColumnModal from "../modals/CreateColumnModal";
import Task from "../task/Task";

type ColumnProps = {
    columnId: number;
};

export const Column: React.FC<ColumnProps> = ({ columnId }) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const columns = useBoardsStore((state) => state.columns);
    const deleteColumn = useBoardsStore((state) => state.deleteColumn);

    const options: DropdownOption[] = useMemo(
        () => [
            {
                label: "Edit",
                onClick: () => setModalOpen(true),
            },
            {
                label: "Delete",
                onClick: () => deleteColumn(columnId),
            },
        ],
        []
    );

    return (
        <>
            <section className="flex bg-slate-400 p-2 flex-col items-center justify-center rounded-md h-fit">
                <header className="flex w-full justify-between items-center">
                    <h1 className="text-left font-medium text-sm text-slate-800 w-full p-1">
                        {columns[columnId].name}
                    </h1>
                    <Dropdown
                        stateControl={{
                            open: dropdownOpen,
                            setOpen: setDropdownOpen,
                        }}
                        options={options}
                    >
                        <More
                            className="w-4 h-4 text-slate-800 cursor-pointer"
                            onClick={() => setDropdownOpen(true)}
                        />
                    </Dropdown>
                </header>
                <div className="flex flex-col gap-2">
                    {Array.from({ length: 5 }).map((_, i: number) => (
                        <Task key={i} />
                    ))}
                </div>
                <footer className="w-full p-1">
                    <Button variant="ghost" className="p-0 hover:bg-slate-400">
                        <Plus className="w-4 h-4 text-slate-800" />
                        <h1 className="text-left font-medium text-sm text-slate-800 ">
                            Add task
                        </h1>
                    </Button>
                </footer>
            </section>

            <CreateColumnModal
                stateControl={{ open: modalOpen, setOpen: setModalOpen }}
                columnId={columnId}
            />
        </>
    );
};

export default Column;
