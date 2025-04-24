import { generateId, generateNegativeId, getLastIdFrom } from "@/lib/utils";
import { Board, Column, Tag, Task } from "@/types/board";
import { create } from "zustand";

type Entities = {
    boards: Record<number, Board>;
    columns: Record<number, Column>;
    tasks: Record<number, Task>;
    tags: Record<number, Tag>;
};

type CurrentBoard = {
    currentBoardId: number;
    setCurrentBoardId: (boardId: number) => void;
};

type CRUD = {
    // Board
    createBoard: (name: string) => void;
    updateBoard: (id: number, name: string) => void;
    deleteBoard: (id: number) => void;

    // Column
    createColumn: (boardId: number, name: string) => void;
    updateColumn: (id: number, name: string) => void;
    deleteColumn: (id: number) => void;

    // Task
    createDraft: (columnId: number) => void;
    createTask: (columnId: number, name: string) => void;
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

    currentBoardId: 0,
    setCurrentBoardId: (boardId: number) => set({ currentBoardId: boardId }),

    // BOARD
    createBoard: (name) => {
        const state: BoardStore = get();
        const newId: number = generateId(Object.values(state.boards));
        const newBoard: Board = { id: newId, name, columns: [] };
        set({
            boards: {
                ...state.boards,
                [newId]: newBoard,
            },
            currentBoardId: newId,
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
            if (Object.values(rest).length > 0) {
                return {
                    boards: rest,
                    currentBoardId: getLastIdFrom(rest),
                };
            } else {
                return { boards: rest, currentBoardId: 0 };
            }
        });
    },

    // COLUMN
    createColumn: (boardId, name) => {
        const state = get();
        const newId = generateId(Object.values(state.columns));
        const newColumn: Column = {
            id: newId,
            name,
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

    updateColumn: (id, newName) => {
        set((state) => ({
            columns: {
                ...state.columns,
                [id]: { ...state.columns[id], name: newName },
            },
        }));
    },

    deleteColumn: (id) => {
        set((state) => {
            const { [id]: _, ...restCols } = state.columns;

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
    createDraft: (columnId) => {
        const state = get();
        const draftId = generateNegativeId(Object.values(state.tasks));
        const newTask: Task = {
            id: draftId,
            title: "",
            isCompleted: false,
            tags: [],
        };

        set({
            tasks: {
                ...state.tasks,
                [draftId]: newTask,
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
    createTask: (columnId, name) => {
        const state = get();
        const newId = generateId(Object.values(state.tasks));
        const newTask: Task = {
            id: newId,
            title: name,
            isCompleted: false,
            tags: [],
        };

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
