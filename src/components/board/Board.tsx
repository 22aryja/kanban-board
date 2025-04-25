import { useBoardsStore } from "@/store/board";
import { Board as IBoard, Column as IColumn } from "@/types/board";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import Column from "./column/Column";
import GhostColumn from "./column/GhostColumn";
import CreateColumnModal from "./modals/CreateColumnModal";
import Task from "./task/Task";

type BoardProps = {
    board: IBoard;
};

export const Board: React.FC<BoardProps> = ({ board }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [activeColumnId, setActiveColumnId] = useState<number | null>(null);
    const [activeType, setActiveType] = useState<"task" | "column" | null>(
        null
    );

    const columns = useBoardsStore((state) => state.columns);
    const moveTask = useBoardsStore((state) => state.moveTask);
    const moveColumn = useBoardsStore((state) => state.moveColumn);

    const handleClick = () => {
        setOpen(true);
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as number);

        if (active.data.current?.type === "column") {
            setActiveType("column");
        } else {
            setActiveType("task");
            setActiveColumnId(active.data.current?.columnId as number);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            if (activeType === "column") {
                const oldIndex = board.columns.findIndex(
                    (col) => col.id === active.id
                );
                const newIndex = board.columns.findIndex(
                    (col) => col.id === over.id
                );

                const newColumns = arrayMove(board.columns, oldIndex, newIndex);
                moveColumn(newColumns);
            } else {
                const activeColumnId = active.data.current?.columnId;
                const overColumnId = over.data.current?.columnId;
                const activeTaskId = active.id as number;
                const overTaskId = over.id as number;

                if (activeColumnId === overColumnId) {
                    const column = columns[activeColumnId];
                    const oldIndex = column.tasks.findIndex(
                        (task) => task.id === activeTaskId
                    );
                    const newIndex = column.tasks.findIndex(
                        (task) => task.id === overTaskId
                    );

                    const newTasks = arrayMove(
                        column.tasks,
                        oldIndex,
                        newIndex
                    );
                    moveTask(activeColumnId, newTasks);
                } else {
                    const sourceColumn = columns[activeColumnId];
                    const destinationColumn = columns[overColumnId];
                    const task = sourceColumn.tasks.find(
                        (t) => t.id === activeTaskId
                    );

                    if (task) {
                        const newSourceTasks = sourceColumn.tasks.filter(
                            (t) => t.id !== activeTaskId
                        );
                        const newDestinationTasks = [
                            ...destinationColumn.tasks,
                            task,
                        ];

                        moveTask(activeColumnId, newSourceTasks);
                        moveTask(overColumnId, newDestinationTasks);
                    }
                }
            }
        }

        setActiveId(null);
        setActiveColumnId(null);
        setActiveType(null);
    };

    return (
        <>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <section className="w-full h-full flex justify-evenly 2xl:p-4 gap-4 overflow-auto px-4 pt-4 pb-18">
                    <SortableContext items={board.columns.map((col) => col.id)}>
                        {board.columns.map((column: IColumn) => (
                            <SortableContext
                                key={column.id}
                                items={column.tasks.map((task) => task.id)}
                            >
                                <Column key={column.id} columnId={column.id} />
                            </SortableContext>
                        ))}
                    </SortableContext>
                    <GhostColumn onClick={handleClick} />
                </section>
                <DragOverlay>
                    {activeId && activeType ? (
                        activeType === "column" ? (
                            <div className="opacity-50">
                                <Column columnId={activeId} />
                            </div>
                        ) : (
                            <div className="opacity-50">
                                <Task
                                    taskId={activeId}
                                    columnId={activeColumnId!}
                                />
                            </div>
                        )
                    ) : null}
                </DragOverlay>
            </DndContext>

            <CreateColumnModal stateControl={{ open: open, setOpen }} />
        </>
    );
};

export default Board;
