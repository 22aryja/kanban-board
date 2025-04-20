import InputWithLabel from "@/components/ui-mods/InputWithLabel";
import Modal from "@/components/ui-mods/Modal";
import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { useBoardsStore } from "@/store/board";
import { Board } from "@/types/board";
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
    const currentBoard = useBoardsStore((state) => state.currentBoard);
    const setBoards = useBoardsStore((state) => state.setBoards);
    const setCurrentBoard = useBoardsStore((state) => state.setCurrentBoard);
    const [boardName, setBoardName] = useState<string>("");

    useEffect(() => {
        if (!currentBoard) return;

        if (forEdit) {
            setBoardName(currentBoard.name);
        } else {
            setBoardName("");
        }
    }, [currentBoard, forEdit]);

    const handleClick = () => {
        const { setOpen } = stateControl;

        if (forEdit) {
            if (!currentBoard) return;
            const boardWithNewName: Board = {
                ...currentBoard,
                name: boardName,
            };
            const newBoards = boards.map((board: Board) => {
                if (board.id === currentBoard.id) {
                    return boardWithNewName;
                } else {
                    return board;
                }
            });
            setBoards(newBoards);
            setCurrentBoard(boardWithNewName);
        } else {
            const newBoard: Board = {
                id: generateId(boards),
                name: boardName,
                columns: [],
            };
            setBoards([...boards, newBoard]);
            setCurrentBoard(newBoard);
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
