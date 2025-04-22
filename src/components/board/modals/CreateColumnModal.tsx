import InputWithLabel from "@/components/ui-mods/InputWithLabel";
import Modal from "@/components/ui-mods/Modal";
import { Button } from "@/components/ui/button";
import { useBoardsStore } from "@/store/board";
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
    const currentBoardId = useBoardsStore((state) => state.currentBoardId);
    const columns = useBoardsStore((state) => state.columns);
    const updateColumn = useBoardsStore((state) => state.updateColumn);
    const createColumn = useBoardsStore((state) => state.createColumn);
    const { setOpen } = stateControl;

    useEffect(() => {
        if (columnId) {
            setColumnName(columns[columnId].name);
        } else {
            setColumnName("");
        }
    }, [columnId, columns]);

    const handleClick = () => {
        if (columnId) {
            updateColumn(columnId, columnName);
        } else {
            createColumn(currentBoardId, columnName);
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
