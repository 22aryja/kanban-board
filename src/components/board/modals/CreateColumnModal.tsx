import InputWithLabel from "@/components/ui-mods/InputWithLabel";
import Modal from "@/components/ui-mods/Modal";
import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { useBoardsStore } from "@/store/board";
import { Board, Column } from "@/types/board";
import { StateControl } from "@/types/common";
import { useEffect, useState } from "react";

type CreateColumnModalProps = {
    stateControl: StateControl;
    columnId?: number;
};

export const CreateColumnModal: React.FC<CreateColumnModalProps> = ({
    stateControl,
    columnId,
}) => {
    const [columnName, setColumnName] = useState<string>("");
    const boards = useBoardsStore((state) => state.boards);
    const setBoards = useBoardsStore((state) => state.setBoards);
    const currentBoard = useBoardsStore((state) => state.currentBoard);
    const setCurrentBoard = useBoardsStore((state) => state.setCurrentBoard);
    const { setOpen } = stateControl;

    useEffect(() => {
        if (columnId && currentBoard) {
            const foundColumn: Column | undefined = currentBoard.columns.find(
                (col: Column) => col.id === columnId
            );
            if (foundColumn) {
                setColumnName(foundColumn.name);
            }
        } else {
            setColumnName("");
        }
    }, [columnId, currentBoard]);

    const handleClick = () => {
        if (!currentBoard) return;

        const index: number = boards.indexOf(currentBoard);

        if (columnId) {
            const updatedBoards = boards.map((board: Board) => {
                if (board.id === currentBoard.id) {
                    const updatedColumns: Column[] = board.columns.map(
                        (col: Column) => {
                            if (col.id === columnId) {
                                return { ...col, name: columnName };
                            } else {
                                return col;
                            }
                        }
                    );
                    return { ...board, columns: updatedColumns };
                } else {
                    return board;
                }
            });
            setBoards(updatedBoards);
            setCurrentBoard(updatedBoards[index]);
        } else {
            const newColumn: Column = {
                id: generateId(currentBoard.columns),
                name: columnName,
                tasks: [],
            };

            const updatedBoards = boards.map((board: Board) => {
                if (board.id === currentBoard.id) {
                    return { ...board, columns: [...board.columns, newColumn] };
                } else {
                    return board;
                }
            });

            setBoards(updatedBoards);
            setCurrentBoard(updatedBoards[index]);
        }
        setColumnName("");
        setOpen(false);
    };

    const applyText = (): string => {
        return columnId ? "Edit" : "Create";
    };

    return (
        <Modal stateControl={stateControl}>
            <div className="w-full h-full flex flex-col gap-4">
                <InputWithLabel
                    label="Column Name"
                    placeholder="Board Column"
                    value={columnName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setColumnName(e.target.value)
                    }
                />

                <div className="flex w-full justify-center">
                    <Button onClick={handleClick}>{applyText()}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateColumnModal;
