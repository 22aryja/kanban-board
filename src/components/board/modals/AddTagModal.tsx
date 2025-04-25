import InputWithLabel from "@/components/ui-mods/InputWithLabel";
import Modal from "@/components/ui-mods/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBoardsStore } from "@/store/board";
import { TagColor } from "@/types/board";
import { StateControl } from "@/types/common";
import { useEffect, useState } from "react";

type AddTagModalProps = {
    stateControl: StateControl;
    taskId: number;
};

const colors: TagColor[] = ["#34d399", "#a3a3a3", "#fb7185", "#fbbf24"];

export const AddTagModal: React.FC<AddTagModalProps> = ({
    stateControl,
    taskId,
}) => {
    const tasks = useBoardsStore((state) => state.tasks);
    const createTag = useBoardsStore((state) => state.createTag);
    const [tagName, setTagName] = useState<string>("");
    const [tagColor, setTagColor] = useState<TagColor | null>(null);
    const { setOpen } = stateControl;

    useEffect(() => {
        setTagName("");
        setTagColor(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks[taskId].tags.length]);

    const handleClick = () => {
        if (tagName && tagColor) {
            createTag(taskId, { color: tagColor, text: tagName });
            setOpen(false);
        }
    };

    return (
        <Modal stateControl={stateControl}>
            <div className="w-full h-full flex flex-col gap-4">
                <InputWithLabel
                    label="Enter the name of a tag"
                    placeholder="Fix"
                    value={tagName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTagName(e.target.value)
                    }
                />

                <div className="flex gap-2 w-full justify-center">
                    {colors.map((color: TagColor) => (
                        <Button
                            className={cn(
                                "transition-transform",
                                color === tagColor && "scale-125"
                            )}
                            style={{ background: color }}
                            onClick={() => setTagColor(color)}
                        />
                    ))}
                </div>

                <div className="flex w-full justify-center">
                    <Button onClick={handleClick}>Add tag</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddTagModal;
