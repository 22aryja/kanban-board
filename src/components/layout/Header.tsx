import More from "@/assets/icons/more.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import { useBoardsStore } from "@/store/board";
import { DropdownOption } from "@/types/common";
import { Ref, useImperativeHandle, useMemo, useState } from "react";
import CreateBoardModal from "../board/modals/CreateBoardModal";
import DeleteBoardModal from "../board/modals/DeleteBoardModal";
import Dropdown from "../ui-mods/Dropdown";
import { Button } from "../ui/button";
import { Board } from "@/types/board";

export type HeaderRef = {
    openModal: () => void;
};

type HeaderProps = {
    ref: Ref<HeaderRef>;
};

export const Header: React.FC<HeaderProps> = ({ ref }) => {
    const boards = useBoardsStore((state) => state.boards);
    const currentBoardId = useBoardsStore((state) => state.currentBoardId);
    const setCurrentBoard = useBoardsStore((state) => state.setCurrentBoardId);
    const [open, setOpen] = useState<{
        create: boolean;
        edit: boolean;
        delete: boolean;
    }>({
        create: false,
        edit: false,
        delete: false,
    });
    const [createDropdownOpen, setCreateDropdownOpen] =
        useState<boolean>(false);
    const [selectDropdownOpen, setSelectDropdownOpen] =
        useState<boolean>(false);

    useImperativeHandle(ref, () => {
        return {
            openModal: openCreateModal,
        };
    });

    // create
    const openCreateModal = () => {
        setOpen({ create: true, edit: false, delete: false });
    };

    const handleCreate = (open: boolean) => {
        setOpen((prev) => ({ ...prev, create: open }));
    };

    // edit
    const openEditModal = () => {
        setOpen({ edit: true, create: true, delete: false });
    };

    // delete
    const openDeleteModal = () => {
        setOpen({ delete: true, edit: false, create: false });
    };

    const handleDelete = (open: boolean) => {
        setOpen((prev) => ({ ...prev, delete: open }));
    };

    const options: DropdownOption[] = useMemo(() => {
        return [
            {
                label: "Create board",
                onClick: openCreateModal,
            },
            {
                label: "Edit board",
                onClick: openEditModal,
            },
            {
                label: "Delete board",
                onClick: openDeleteModal,
            },
        ];
    }, []);

    const boardsOptions: DropdownOption[] = useMemo(() => {
        const options = Object.values(boards).map((board: Board) => {
            return {
                label: board.name,
                onClick: () => setCurrentBoard(board.id),
            };
        });
        return options;
    }, [boards, setCurrentBoard]);

    return (
        <>
            <header className="w-full bg-slate-700 p-4 flex justify-between relative">
                <h1 className="text-2xl font-semibold text-accent">Kanban</h1>
                <div className="w-full absolute flex justify-center left-0 top-0 items-center h-full pointer-events-none">
                    <h1 className="text-2xl font-semibold text-accent">
                        {currentBoardId ? boards[currentBoardId].name : ""}
                    </h1>
                </div>
                <div className="flex gap-4 items-center">
                    <Dropdown
                        stateControl={{
                            open: selectDropdownOpen,
                            setOpen: setSelectDropdownOpen,
                        }}
                        options={boardsOptions}
                    >
                        <Button
                            variant="default"
                            onClick={() => setSelectDropdownOpen(true)}
                        >
                            Select
                        </Button>
                    </Dropdown>

                    <Button variant="secondary" onClick={openCreateModal}>
                        <Plus className="w-4 h-4 text-slate-800" /> Create
                    </Button>

                    <Dropdown
                        stateControl={{
                            open: createDropdownOpen,
                            setOpen: setCreateDropdownOpen,
                        }}
                        options={options}
                    >
                        <More
                            className="w-4 h-4 text-secondary cursor-pointer"
                            onClick={() => setCreateDropdownOpen(true)}
                        />
                    </Dropdown>
                </div>
            </header>

            <CreateBoardModal
                stateControl={{
                    open: open.create,
                    setOpen: handleCreate,
                }}
                forEdit={open.edit}
            />

            <DeleteBoardModal
                stateControl={{ open: open.delete, setOpen: handleDelete }}
            />
        </>
    );
};

export default Header;
