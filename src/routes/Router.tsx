import { BrowserRouter, Routes, Route } from "react-router-dom";

import Coins from "./Coins";
import Coin from "./Coin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
