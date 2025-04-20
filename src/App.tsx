import Board from "./components/board/Board";
import Header, { HeaderRef } from "./components/layout/Header";
import Plus from "@/assets/icons/plus.svg?react";
import { Board as IBoard } from "./types/board";
import { Button } from "./components/ui/button";
import { useRef } from "react";

const boards: IBoard[] = [];

const App = () => {
    const headerRef = useRef<HeaderRef>(null);

    const openCreateModal = () => {
        if (headerRef.current) {
            headerRef.current.openModal();
        }
    };

    return (
        <main className="bg-slate-300 w-screen h-screen flex flex-col gap-6">
            <Header ref={headerRef} />

            {boards.length > 0 ? (
                boards.map((board: IBoard) => (
                    <Board key={board.id} board={board} />
                ))
            ) : (
                <section className="w-full h-full flex justify-center items-center">
                    <Button onClick={openCreateModal}>
                        <Plus className="w-4 h-4 text-slate-300" />
                        <h1 className="text-slate-300">Create a new board</h1>
                    </Button>
                </section>
            )}
        </main>
    );
};

export default App;
