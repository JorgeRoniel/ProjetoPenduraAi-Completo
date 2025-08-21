import { useState } from "react";
import "./login.css";
import { useAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      alert("Email ou Senha Incorretos!");
    }
  };

  return (
    <>
      <div className="container-login">
        <h1>Bem vindo ao Pendura Aí</h1>
        <div className="login-window">
          <h2>Faça o Login Para Entrar!</h2>
          <form action="" onSubmit={HandleSubmit}>
            <label htmlFor="email" className="labels-login">
              Email:
            </label>
            <input
              type="text"
              name="email"
              className="input-login"
              placeholder="Digite seu email..."
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="pass" className="labels-login">
              Senha:
            </label>
            <input
              type="text"
              name="pass"
              className="input-login"
              placeholder="Digite sua senha..."
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn-login">
              Entrar
            </button>
          </form>
          <p>
            Não possui uma conta? <a href="/register">Cadastre-se aqui</a>!
          </p>
        </div>

        <footer>
          <p>Desenvolvido por Jorge Roniel.</p>
        </footer>
      </div>
    </>
  );
}
