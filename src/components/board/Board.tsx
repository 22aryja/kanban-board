import { Column as IColumn, Board as IBoard } from "@/types/board";
import Column from "./column/Column";
import GhostColumn from "./column/GhostColumn";
import CreateColumnModal from "./modals/CreateColumnModal";
import { useState } from "react";

type BoardProps = {
    board: IBoard;
};

export const Board: React.FC<BoardProps> = ({ board }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <>
            <section className="w-full h-full flex justify-evenly p-4 gap-4 overflow-auto">
                {board.columns.map((column: IColumn) => (
                    <Column key={column.id} column={column} />
                ))}
                <GhostColumn onClick={handleClick} />
            </section>

            <CreateColumnModal
                stateControl={{ open: open, setOpen }}
            />
        </>
    );
};

export default Board;
