import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./app/AppRoutes";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes />
    </>
  );
}

export default App;