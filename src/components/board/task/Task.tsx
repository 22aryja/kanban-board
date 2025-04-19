import Tag from "./Tag";

const Task = () => {
    return (
        <section className="flex flex-col gap-2 bg-secondary rounded-sm p-2">
            <div className="flex gap-1 flex-wrap">
                <Tag tag={{ color: "red", text: "Urgent" }} />
                <Tag tag={{ color: "red", text: "Urgent" }} />
                <Tag tag={{ color: "red", text: "Urgent" }} />
            </div>
            <div>
                <h1>Complete math homework</h1>
            </div>
            <div></div>
        </section>
    );
};

export default Task;
