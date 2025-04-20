import { Button } from "@/components/ui/button";
import Task from "../task/Task";
import Plus from "@/assets/icons/plus.svg?react";
import { Board, Column as IColumn } from "@/types/board";
import More from "@/assets/icons/more.svg?react";
import Dropdown from "@/components/ui-mods/Dropdown";
import { useMemo, useState } from "react";
import { DropdownOption } from "@/types/common";
import { useBoardsStore } from "@/store/board";
import CreateColumnModal from "../modals/CreateColumnModal";

type ColumnProps = {
    column: IColumn;
};

export const Column: React.FC<ColumnProps> = ({ column }) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const boards = useBoardsStore((state) => state.boards);
    const setBoards = useBoardsStore((state) => state.setBoards);
    const currentBoard = useBoardsStore((state) => state.currentBoard);
    const setCurrentBoard = useBoardsStore((state) => state.setCurrentBoard);

    const deleteColumn = () => {
        if (!currentBoard) return;

        const index: number = boards.indexOf(currentBoard);

        const updatedBoards = boards.map((board: Board) => {
            if (board.id === currentBoard.id) {
                const newColumns: IColumn[] = board.columns.filter(
                    (col: IColumn) => col.id !== column.id
                );

                return {
                    ...board,
                    columns: newColumns,
                };
            } else {
                return board;
            }
        });

        setBoards(updatedBoards);
        setCurrentBoard(updatedBoards[index]);
    };

    const options: DropdownOption[] = useMemo(
        () => [
            {
                label: "Edit",
                onClick: () => setModalOpen(true),
            },
            {
                label: "Delete",
                onClick: deleteColumn,
            },
        ],
        []
    );

    return (
        <>
            <section className="flex bg-slate-400 p-2 flex-col items-center justify-center rounded-md h-fit">
                <header className="flex w-full justify-between items-center">
                    <h1 className="text-left font-medium text-sm text-slate-800 w-full p-1">
                        {column.name}
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
                columnId={column.id}
            />
        </>
    );
};

export default Column;
