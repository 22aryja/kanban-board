import InputWithLabel from "@/components/ui-mods/InputWithLabel";
import Modal from "@/components/ui-mods/Modal";
import { Button } from "@/components/ui/button";
import { useBoardsStore } from "@/store/board";
import { StateControl } from "@/types/common";
import { useEffect, useState } from "react";

type CreateBoardModalProps = {
    stateControl: StateControl;
    forEdit?: boolean;
};

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
    stateControl,
    forEdit = false,
}) => {
    const boards = useBoardsStore((state) => state.boards);
    const currentBoardId = useBoardsStore((state) => state.currentBoardId);
    const createBoard = useBoardsStore((state) => state.createBoard);
    const updateBoard = useBoardsStore((state) => state.updateBoard);
    const [boardName, setBoardName] = useState<string>("");

    useEffect(() => {
        if (forEdit) {
            setBoardName(boards[currentBoardId].name);
        } else {
            setBoardName("");
        }
    }, [boards, currentBoardId, forEdit]);

    const handleClick = () => {
        const { setOpen } = stateControl;

        if (forEdit) {
            updateBoard(currentBoardId, boardName);
        } else {
            createBoard(boardName);
        }
        setBoardName("");
        setOpen(false);
    };

    const applyText = (): string => {
        return forEdit ? "Edit" : "Create";
    };

    return (
        <Modal stateControl={stateControl}>
            <div className="w-full h-full flex flex-col gap-4">
                <InputWithLabel
                    label="Enter the name"
                    placeholder="Kanban Board"
                    value={boardName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setBoardName(e.target.value)
                    }
                />

                <div className="flex w-full justify-center">
                    <Button onClick={handleClick}>{applyText()}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateBoardModal;
