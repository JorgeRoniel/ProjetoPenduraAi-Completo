import "./App.css";
import { Home } from "./pages/home/home";
//import { Login } from "./pages/login/login";
import { Navbar } from "./components/navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
