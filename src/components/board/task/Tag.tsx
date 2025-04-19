import { Tag as ITag } from "@/types/board";

type TagProps = {
    tag: ITag;
};

export const Tag: React.FC<TagProps> = ({ tag }) => {
    return (
        <div className="p-1 rounded-sm" style={{ background: tag.color }}>
            <h1 className="text-xs font-medium text-white">{tag.text}</h1>
        </div>
    );
};

export default Tag;
