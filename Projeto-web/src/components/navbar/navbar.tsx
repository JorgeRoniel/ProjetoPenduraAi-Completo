import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import "./navbar.css";

export function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <h1>PenduraAí.com</h1>
        <button className="btn btn--light btn-navbar" onClick={handleLogout}>
          sair
        </button>
      </nav>
    </>
  );
}
