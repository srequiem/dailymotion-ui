import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./features/header/Header";
import SearchPage from "./features/search";
import VideoPage from "./features/video";

const App = () => (
  <div className="app-shell">
    <Header />
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/video/:id" element={<VideoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </div>
);

export default App;
