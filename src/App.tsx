import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Tenders from "./pages/tenders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tenders" element={<Tenders />} />
      </Routes>
    </Router>
  );
}

export default App;
