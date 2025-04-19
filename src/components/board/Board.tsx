import Column from "./column/Column";

export const Board = () => {
    return (
        <section className="w-full h-full flex justify-evenly p-4 gap-4">
            {Array.from({ length: 5 }).map((_, i: number) => (
                <Column key={i} />
            ))}
        </section>
    );
};

export default Board;
