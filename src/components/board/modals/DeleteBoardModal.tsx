import Modal from "@/components/ui-mods/Modal";
import { Button } from "@/components/ui/button";
import { useBoardsStore } from "@/store/board";
import { Board } from "@/types/board";
import { StateControl } from "@/types/common";

type DeleteBoardModalProps = {
    stateControl: StateControl;
};

const DeleteBoardModal: React.FC<DeleteBoardModalProps> = ({
    stateControl,
}) => {
    const currentBoard = useBoardsStore((state) => state.currentBoard);
    const setCurrentBoard = useBoardsStore((state) => state.setCurrentBoard);
    const boards = useBoardsStore((state) => state.boards);
    const setBoards = useBoardsStore((state) => state.setBoards);
    const { setOpen } = stateControl;

    const handleCancel = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if (!currentBoard) return;
        const filteredBoards: Board[] = boards.filter(
            (board: Board) => board.id !== currentBoard.id
        );

        setBoards(filteredBoards);

        if (filteredBoards.length === 0) {
            setCurrentBoard(null);
        } else {
            setCurrentBoard(filteredBoards[filteredBoards.length - 1]);
        }
        setOpen(false);
    };

    return (
        <Modal stateControl={stateControl}>
            <div className="w-full h-full flex flex-col gap-4">
                <h1 className="font-semibold text-center">
                    Delete this board?
                </h1>
                <div className="flex w-full justify-center gap-4">
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteBoardModal;
