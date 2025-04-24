import { useBoardsStore } from "@/store/board";
import Tag from "./Tag";
import { Input } from "@/components/ui/input";
import Tick from "@/assets/icons/tick.svg?react";
import { useEffect, useMemo, useRef, useState } from "react";

type TaskProps = {
    columnId: number;
    taskId: number;
};

const Task: React.FC<TaskProps> = ({ columnId, taskId }) => {
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
    );
};

export default Task;
