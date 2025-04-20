import Board from "./components/board/Board";
import Header, { HeaderRef } from "./components/layout/Header";
import Plus from "@/assets/icons/plus.svg?react";
import { Board as IBoard } from "./types/board";
import { Button } from "./components/ui/button";
import { useEffect, useRef } from "react";
import { useBoardsStore } from "./store/board";

const App = () => {
    const boards = useBoardsStore((state) => state.boards);
    const currentBoard = useBoardsStore((state) => state.currentBoard);
    const headerRef = useRef<HeaderRef>(null);

    useEffect(() => {
        console.log(boards);
    }, [boards]);

    const openCreateModal = () => {
        if (headerRef.current) {
            headerRef.current.openModal();
        }
    };

    return (
        <main className="bg-slate-300 w-screen h-screen flex flex-col gap-6">
            <Header ref={headerRef} />

            {currentBoard ? (
                <Board board={currentBoard} />
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
