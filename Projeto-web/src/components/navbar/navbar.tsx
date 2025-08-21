import { useAuth } from "../../utils/auth";
import "./navbar.css";
export function Navbar() {
  const { logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <h1>PenduraAí.com</h1>
        <button className="btn-navbar" onClick={logout}>
          sair
        </button>
      </nav>
    </>
  );
}
