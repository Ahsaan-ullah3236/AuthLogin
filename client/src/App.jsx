import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Login from "./components/Login";
import SignUp from "./components/SignIn";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;