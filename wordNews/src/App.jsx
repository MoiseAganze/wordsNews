import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Guerres, Meteo, Tech } from "./pages/pages";
import Base from "./pages";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route path="/" element={<Tech />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/guerres" element={<Guerres />} />
          <Route path="/meteo" element={<Meteo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
