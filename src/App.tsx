import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./pages/map";

import Tenders from "./pages/tenders";
import TenderDetailPage from "./pages/tenders/_id";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/tenders/:id" element={<TenderDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
