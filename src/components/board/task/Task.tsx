import Tick from "@/assets/icons/tick.svg?react";
import { Input } from "@/components/ui/input";
import { useBoardsStore } from "@/store/board";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "@/assets/icons/draggable.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import Tag from "./Tag";
import { cn } from "@/lib/utils";
import { Tag as ITag } from "@/types/board";
import AddTagModal from "../modals/AddTagModal";

type TaskProps = {
    columnId: number;
    taskId: number;
};

export const Task: React.FC<TaskProps> = ({ taskId, columnId }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: taskId,
        data: {
            columnId,
        },
    });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        touchAction: "none",
        userSelect: "none",
        boxShadow: isDragging ? "0 0 10px rgba(0,0,0,0.2)" : "none",
    };

    const [title, setTitle] = useState<string>("");
    const tasks = useBoardsStore((state) => state.tasks);
    const updateTask = useBoardsStore((state) => state.updateTask);
    const createTask = useBoardsStore((state) => state.createTask);
    const deleteTask = useBoardsStore((state) => state.deleteTask);
    const deleteTag = useBoardsStore((state) => state.deleteTag);
    const input = useRef<HTMLInputElement | null>(null);
    const [inputActive, setInputActive] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const isDraft: boolean = useMemo(() => taskId < 0, [taskId]);

    useEffect(() => {
        if (input.current) {
            input.current.focus();
        }
    }, []);

    const handleCreate = () => {
        if (taskId < 0) {
            deleteTask(taskId);
            createTask(columnId, title);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        updateTask(taskId, { title: event.target.value });
    };

    const handleBlur = () => {
        if (title.trim().length === 0) {
            deleteTask(taskId);
        } else {
            if (taskId < 0) {
                handleCreate();
            } else {
                updateTask(taskId, { title });
            }
            setInputActive(false);
        }
    };

    const handleDoubleClick = () => {
        setInputActive(true);
    };

    const markAsCompleted = () => {
        updateTask(taskId, { isCompleted: !tasks[taskId].isCompleted });
    };

    const isTaskCompleted: boolean = useMemo(
        () => tasks[taskId].isCompleted,
        [taskId, tasks]
    );

    const handleTagDelete = (tagName: string) => {
        deleteTag(taskId, tagName);
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                className={cn(
                    "bg-white p-2 rounded shadow-sm border-2 border-solid transition-colors",
                    isDragging ? "ring-2 ring-blue-500" : "",
                    isTaskCompleted ? "border-emerald-600" : ""
                )}
            >
                <section className="flex flex-col gap-2 bg-secondary rounded-sm p-2 min-w-[12vw] max-w-80">
                    <div className="flex justify-between w-full">
                        <div className="flex gap-1 flex-wrap items-center">
                            {tasks[taskId].tags.map((tag: ITag) => (
                                <Tag tag={tag} onDelete={handleTagDelete} />
                            ))}
                            <Plus
                                className="w-4 h-4 text-slate-600 cursor-pointer hover:scale-150 transition-transform"
                                onClick={() => setModalOpen(true)}
                            />
                        </div>

                        <Draggable
                            className="w-4 h-4 cursor-grab hover:scale-150 transition-transform"
                            {...listeners}
                        />
                    </div>
                    <div>
                        {isDraft || inputActive ? (
                            <Input
                                ref={input}
                                value={tasks[taskId].title}
                                className="w-full"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        ) : (
                            <h1 onDoubleClick={handleDoubleClick}>
                                {tasks[taskId].title}
                            </h1>
                        )}
                    </div>
                    <div className="w-full flex justify-end">
                        <Tick
                            className={cn(
                                "w-4 h-4 cursor-pointer transition-transform active:scale-50",
                                isTaskCompleted
                                    ? "text-emerald-600 scale-150"
                                    : "text-slate-600"
                            )}
                            onClick={markAsCompleted}
                        />
                    </div>
                </section>
            </div>

            <AddTagModal
                stateControl={{ open: modalOpen, setOpen: setModalOpen }}
                taskId={taskId}
            />
        </>
    );
};

export default Task;
