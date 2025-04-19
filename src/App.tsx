import Board from "./components/board/Board";
import Header from "./components/layout/Header";

const App = () => {
    return (
        <main className="bg-slate-300 w-screen h-screen">
            <Header />
            <div className="mt-6">
                <Board />
            </div>
        </main>
    );
};

export default App;
