import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const router = (
  <Router>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashbord" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);
function App() {
  return <div>{router}</div>;
}

export default App;
