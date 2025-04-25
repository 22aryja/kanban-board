import Tick from "@/assets/icons/tick.svg?react";
import { Input } from "@/components/ui/input";
import { useBoardsStore } from "@/store/board";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useRef, useState } from "react";
import Tag from "./Tag";

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
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
        boxShadow: isDragging ? "0 0 10px rgba(0,0,0,0.2)" : "none",
    };

    const [title, setTitle] = useState<string>("");
    const tasks = useBoardsStore((state) => state.tasks);
    const updateTask = useBoardsStore((state) => state.updateTask);
    const createTask = useBoardsStore((state) => state.createTask);
    const deleteTask = useBoardsStore((state) => state.deleteTask);
    const input = useRef<HTMLInputElement | null>(null);
    const [inputActive, setInputActive] = useState<boolean>(false);

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

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-white p-2 rounded shadow-sm ${
                isDragging ? "ring-2 ring-blue-500" : ""
            }`}
        >
            <section className="flex flex-col gap-2 bg-secondary rounded-sm p-2 min-w-[12vw]">
                <div className="flex gap-1 flex-wrap">
                    <Tag tag={{ color: "#4ade80", text: "Urgent" }} />
                    <Tag tag={{ color: "#22d3ee", text: "Urgent" }} />
                    <Tag tag={{ color: "#a78bfa", text: "Urgent" }} />
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
                    <Tick className="w-4 h-4 " />
                </div>
            </section>
        </div>
    );
};

export default Task;
