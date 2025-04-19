import { Button } from "@/components/ui/button";
import Task from "../task/Task";
import Plus from "@/assets/icons/plus.svg?react";

export const Column = () => {
    return (
        <section className="flex w-fit bg-slate-400 p-2 flex-col items-center justify-center rounded-md">
            <h1 className="text-left font-medium text-sm text-slate-800 w-full p-1">
                Current Tasks
            </h1>
            <div className="flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, i: number) => (
                    <Task key={i} />
                ))}
            </div>
            <footer className="w-full p-1">
                <Button variant="ghost" className="p-0 hover:bg-slate-400">
                    <Plus className="w-4 h-4 text-slate-800" />
                    <h1 className="text-left font-medium text-sm text-slate-800 ">
                        Add task
                    </h1>
                </Button>
            </footer>
        </section>
    );
};

export default Column;
