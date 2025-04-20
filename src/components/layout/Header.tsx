import { Ref, useImperativeHandle, useMemo, useState } from "react";
import { Button } from "../ui/button";
import Plus from "@/assets/icons/plus.svg?react";
import CreateBoardModal from "../board/modals/CreateBoardModal";
import More from "@/assets/icons/more.svg?react";
import DeleteBoardModal from "../board/modals/DeleteBoardModal";
import { DropdownOption } from "@/types/common";
import Dropdown from "../ui-mods/Dropdown";

export type HeaderRef = {
    openModal: () => void;
};

type HeaderProps = {
    ref: Ref<HeaderRef>;
};

export const Header: React.FC<HeaderProps> = ({ ref }) => {
    const [open, setOpen] = useState<{
        create: boolean;
        edit: boolean;
        delete: boolean;
    }>({
        create: false,
        edit: false,
        delete: false,
    });
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

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

    return (
        <>
            <header className="w-full bg-slate-700 p-4 flex justify-between relative">
                <h1 className="text-2xl font-semibold text-accent">Kanban</h1>
                <div className="w-full absolute flex justify-center left-0 top-0 items-center h-full pointer-events-none">
                    <h1 className="text-2xl font-semibold text-accent">
                        Board Name
                    </h1>
                </div>
                <div className="flex gap-4 items-center">
                    <Button variant="default">Select</Button>
                    <Button variant="secondary" onClick={openCreateModal}>
                        <Plus className="w-4 h-4 text-slate-800" /> Create
                    </Button>
                    <Dropdown
                        stateControl={{
                            open: dropdownOpen,
                            setOpen: setDropdownOpen,
                        }}
                        options={options}
                    >
                        <More
                            className="w-4 h-4 text-secondary cursor-pointer"
                            onClick={() => setDropdownOpen(true)}
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
