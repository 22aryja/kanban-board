import { generateId } from "@/lib/utils";
import { Board, Column, Tag, Task } from "@/types/board";
import { create } from "zustand";

type Entities = {
    boards: Record<number, Board>;
    columns: Record<number, Column>;
    tasks: Record<number, Task>;
    tags: Record<number, Tag>;
};

type CurrentBoard = {
    currentBoardId: number | null;
    setCurrentBoard: (boardId: number | null) => void;
};

type CRUD = {
    // Board
    createBoard: (name: string) => void;
    updateBoard: (id: number, name: string) => void;
    deleteBoard: (id: number) => void;

    // Column
    createColumn: (boardId: number, name: string) => void;
    updateColumn: (id: number, updates: Partial<Column>) => void;
    deleteColumn: (id: number) => void;

    // Task
    createTask: (columnId: number, task: Omit<Task, "id">) => void;
    updateTask: (id: number, updates: Partial<Task>) => void;
    deleteTask: (id: number) => void;

    // Tag
    createTag: (taskId: number, tag: Tag) => void;
    deleteTag: (taskId: number, tagText: string) => void;
};

type Derived = {
    getColumnsByBoard: (boardId: number) => Column[];
    getTasksByColumn: (columnId: number) => Task[];
};

type BoardStore = Entities & CurrentBoard & CRUD & Derived;

export const useBoardsStore = create<BoardStore>((set, get) => ({
    boards: {},
    columns: {},
    tasks: {},
    tags: {},

    currentBoardId: null,
    setCurrentBoard: (id) => set({ currentBoardId: id }),

    // BOARD
    createBoard: (name) => {
        const state = get();
        const newId = generateId(Object.values(state.boards));
        set({
            boards: {
                ...state.boards,
                [newId]: { id: newId, name, columns: [] },
            },
        });
    },

    updateBoard: (id, name) => {
        set((state) => ({
            boards: {
                ...state.boards,
                [id]: { ...state.boards[id], name },
            },
        }));
    },

    deleteBoard: (id) => {
        set((state) => {
            const { [id]: _, ...rest } = state.boards;
            return { boards: rest };
        });
    },

    // COLUMN
    createColumn: (boardId, name) => {
        const state = get();
        const newId = generateId(Object.values(state.columns));
        const newColumn: Column = {
            id: newId,
            name,
            isCompleted: false,
            tasks: [],
        };

        set({
            columns: {
                ...state.columns,
                [newId]: newColumn,
            },
            boards: {
                ...state.boards,
                [boardId]: {
                    ...state.boards[boardId],
                    columns: [...state.boards[boardId].columns, newColumn],
                },
            },
        });
    },

    updateColumn: (id, updates) => {
        set((state) => ({
            columns: {
                ...state.columns,
                [id]: { ...state.columns[id], ...updates },
            },
        }));
    },

    deleteColumn: (id) => {
        set((state) => {
            const { [id]: deletedCol, ...restCols } = state.columns;

            const updatedBoards = Object.values(state.boards).reduce(
                (acc, board) => {
                    acc[board.id] = {
                        ...board,
                        columns: board.columns.filter((col) => col.id !== id),
                    };
                    return acc;
                },
                {} as Record<number, Board>
            );

            return { columns: restCols, boards: updatedBoards };
        });
    },

    // TASK
    createTask: (columnId, taskData) => {
        const state = get();
        const newId = generateId(Object.values(state.tasks));
        const newTask = { ...taskData, id: newId };

        set({
            tasks: {
                ...state.tasks,
                [newId]: newTask,
            },
            columns: {
                ...state.columns,
                [columnId]: {
                    ...state.columns[columnId],
                    tasks: [...state.columns[columnId].tasks, newTask],
                },
            },
        });
    },

    updateTask: (id, updates) => {
        set((state) => ({
            tasks: {
                ...state.tasks,
                [id]: { ...state.tasks[id], ...updates },
            },
        }));
    },

    deleteTask: (id) => {
        set((state) => {
            const { [id]: _, ...restTasks } = state.tasks;

            const updatedColumns = Object.values(state.columns).reduce(
                (acc, col) => {
                    acc[col.id] = {
                        ...col,
                        tasks: col.tasks.filter((t) => t.id !== id),
                    };
                    return acc;
                },
                {} as Record<number, Column>
            );

            return { tasks: restTasks, columns: updatedColumns };
        });
    },

    // TAG
    createTag: (taskId, tag) => {
        set((state) => ({
            tasks: {
                ...state.tasks,
                [taskId]: {
                    ...state.tasks[taskId],
                    tags: [...state.tasks[taskId].tags, tag],
                },
            },
        }));
    },

    deleteTag: (taskId, tagText) => {
        set((state) => ({
            tasks: {
                ...state.tasks,
                [taskId]: {
                    ...state.tasks[taskId],
                    tags: state.tasks[taskId].tags.filter(
                        (tag) => tag.text !== tagText
                    ),
                },
            },
        }));
    },

    // DERIVED
    getColumnsByBoard: (boardId) => {
        return get().boards[boardId]?.columns ?? [];
    },

    getTasksByColumn: (columnId) => {
        return get().columns[columnId]?.tasks ?? [];
    },
}));
