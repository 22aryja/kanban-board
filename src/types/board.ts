export type Tag = { color: string; text: string };

export type Task = {
    title: string;
    description: string;
    tags: Tag[];
};

export type Column = {
    tasks: Task[];
};

export type Board = {
    name: string;
    columns: Column[];
};
