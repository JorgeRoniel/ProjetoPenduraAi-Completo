import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { AuthProvider } from "./utils/auth";
import { PrivateRoute } from "./utils/privateRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute component={<Home />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
