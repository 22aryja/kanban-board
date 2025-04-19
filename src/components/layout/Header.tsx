import { useState } from "react";
import { Button } from "../ui/button";
import Plus from "@/assets/icons/plus.svg?react";
import CreateBoardModal from "../board/modals/CreateBoardModal";
import More from "@/assets/icons/more.svg?react";
import DeleteBoardModal from "../board/modals/DeleteBoardModal";

export const Header = () => {
    const [open, setOpen] = useState<{ create: boolean; delete: boolean }>({
        create: false,
        delete: false,
    });

    const openCreateModal = () => {
        setOpen({ create: true, delete: false });
    };

    const handleCreate = (open: boolean) => {
        setOpen((prev) => ({ ...prev, create: open }));
    };

    const openDeleteModal = () => {
        setOpen({ delete: true, create: false });
    };

    const handleDelete = (open: boolean) => {
        setOpen((prev) => ({ ...prev, delete: open }));
    };

    return (
        <>
            <header className="w-full bg-slate-700 p-4 flex justify-between">
                <h1 className="text-2xl font-semibold text-accent">Kanban</h1>
                <div className="flex gap-4 items-center">
                    <Button variant="default">Select</Button>
                    <Button variant="secondary" onClick={openCreateModal}>
                        <Plus className="w-4 h-4 text-slate-800" /> Create
                    </Button>
                    <More
                        className="w-4 h-4 text-secondary cursor-pointer"
                        onClick={openDeleteModal}
                    />
                </div>
            </header>

            <CreateBoardModal
                stateControl={{
                    open: open.create,
                    setOpen: handleCreate,
                }}
            />

            <DeleteBoardModal
                stateControl={{ open: open.delete, setOpen: handleDelete }}
            />
        </>
    );
};

export default Header;
