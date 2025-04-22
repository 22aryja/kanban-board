export type Tag = { color: string; text: string };

export type Task = {
    id: number;
    title: string;
    isCompleted: boolean;
    tags: Tag[];
};

export type Column = {
    id: number;
    name: string;
    tasks: Task[];
};

export type Board = {
    id: number;
    name: string;
    columns: Column[];
};
