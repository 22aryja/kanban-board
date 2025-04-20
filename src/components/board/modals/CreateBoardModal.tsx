import InputWithLabel from "@/components/ui-mods/InputWithLabel";
import Modal from "@/components/ui-mods/Modal";
import { Button } from "@/components/ui/button";
import { StateControl } from "@/types/common";
import { useState } from "react";

type CreateBoardModalProps = {
    stateControl: StateControl;
    forEdit?: boolean;
};

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
    stateControl,
    forEdit = false,
}) => {
    const [boardName, setBoardName] = useState<string>("");

    const handleClick = () => {
        const { setOpen } = stateControl;
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
