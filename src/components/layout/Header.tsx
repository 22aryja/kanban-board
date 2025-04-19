import { Button } from "../ui/button";

export const Header = () => {
    return (
        <header className="w-full bg-slate-700 p-4 flex justify-between">
            <h1 className="text-2xl font-semibold text-accent">Kanban</h1>
            <div className="flex gap-4">
                <Button variant="default">Select</Button>
                <Button variant="secondary">+ Create</Button>
            </div>
        </header>
    );
};

export default Header;
