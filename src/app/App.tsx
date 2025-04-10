import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import GameLayout from "./layouts/GameLayout";
import GamePage from "./pages/Gamepage";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="game" element={<GameLayout />}>
          <Route index element={<GamePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
