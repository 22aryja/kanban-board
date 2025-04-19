import Modal from "@/components/ui-mods/Modal";
import { Button } from "@/components/ui/button";
import { StateControl } from "@/types/common";

type DeleteBoardModalProps = {
    stateControl: StateControl;
};

const DeleteBoardModal: React.FC<DeleteBoardModalProps> = ({
    stateControl,
}) => {
    const { setOpen } = stateControl;

    const handleCancel = () => {
        setOpen(false);
    };

    const handleDelete = () => {
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
