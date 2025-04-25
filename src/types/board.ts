export type TagColor = "#fb7185" | "#34d399" | "#fbbf24" | "#a3a3a3";

export type Tag = { color: TagColor; text: string };

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
