type Tag = { color: string; text: string };

type TagProps = {
    tag: Tag;
};

export const Tag: React.FC<TagProps> = ({ tag }) => {
    return (
        <div className="p-1 rounded-sm" style={{ background: tag.color }}>
            <h1 className="text-xs font-medium text-white">{tag.text}</h1>
        </div>
    );
};

export default Tag;
