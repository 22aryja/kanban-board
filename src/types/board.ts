export type Tag = { color: string; text: string };

export type Task = {
    id: number;
    title: string;
    description: string;
    tags: Tag[];
};

export type Column = {
    id: number;
    name: string;
    isCompleted: boolean;
    tasks: Task[];
};

export type Board = {
    id: number;
    name: string;
    columns: Column[];
};
