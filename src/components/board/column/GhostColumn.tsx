import Plus from "@/assets/icons/plus.svg?react";

type GhostColumnProps = {
    onClick: () => void;
};

export const GhostColumn: React.FC<GhostColumnProps> = ({ onClick }) => {
    return (
        <div
            className="w-80 h-full flex items-center justify-center border rounded-md border-dashed border-accent bg-[#ffffff11] cursor-pointer"
            onClick={onClick}
        >
            <div className="flex gap-2 items-center">
                <Plus className="w-4 h-4 text-slate-100" />
                <h1 className="text-slate-100">Add a column</h1>
            </div>
        </div>
    );
};

export default GhostColumn;
