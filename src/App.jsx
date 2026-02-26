import "./App.css";
import Memory from "./Memory.jsx";
import Landing from "./Landing.jsx";
import Speed from "./Speed.jsx";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Memory" element={<Memory />} />
          <Route path="/Speed" element={<Speed />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
