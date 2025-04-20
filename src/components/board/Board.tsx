import { Board as IBoard } from "@/types/board";
import Column from "./column/Column";

type BoardProps = {
    board: IBoard;
};

export const Board: React.FC<BoardProps> = ({ board }) => {
    return (
        <section className="w-full flex justify-evenly p-4 gap-4">
            {Array.from({ length: 5 }).map((_, i: number) => (
                <Column key={i} />
            ))}
        </section>
    );
};

export default Board;
