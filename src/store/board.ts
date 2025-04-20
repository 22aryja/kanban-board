import { Board } from "@/types/board";
import { create } from "zustand";

type BoardsStates = {
    boards: Board[];
    setBoards: (boards: Board[]) => void;
};

type CurrentBoard = {
    currentBoard: Board | null;
    setCurrentBoard: (board: Board | null) => void;
};

type BoardsStore = BoardsStates & CurrentBoard;

export const useBoardsStore = create<BoardsStore>()((set) => ({
    // BoardsStates
    boards: [],
    setBoards: (boards: Board[]) => set({ boards }),

    // CurrentBoard
    currentBoard: null,
    setCurrentBoard: (board: Board | null) => set({ currentBoard: board }),
}));
