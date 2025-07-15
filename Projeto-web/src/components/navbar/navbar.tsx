import "./navbar.css";
export function Navbar() {
  return (
    <>
      <nav className="navbar">
        <h1>PenduraAí.com</h1>
        <button
          className="btn-navbar"
          onClick={() => {
            alert("Sem funcionamento... (Por enquanto!)");
          }}
        >
          sair
        </button>
      </nav>
    </>
  );
}
