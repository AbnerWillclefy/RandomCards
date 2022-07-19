import { Routes, Route } from "react-router-dom";

import App from "../pages/App";
import MyCards from "../pages/MyCards";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/mycards" element={<MyCards />} />
    </Routes>
  );
}
