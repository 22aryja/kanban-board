import { Tag as ITag } from "@/types/board";

type TagProps = {
    tag: ITag;
    onDelete: (tagName: string) => void;
};

export const Tag: React.FC<TagProps> = ({ tag, onDelete }) => {
    const handleDoubleClick = () => {
        onDelete(tag.text);
    };

    return (
        <div
            className="p-1 rounded-sm cursor-pointer"
            style={{ background: tag.color }}
            onDoubleClick={handleDoubleClick}
        >
            <h1 className="text-xs font-medium text-white">{tag.text}</h1>
        </div>
    );
};

export default Tag;
