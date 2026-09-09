import { useState } from "react";
import "./login.css";
import { useAuth } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      alert("Email ou Senha Incorretos!");
    }
  };

  return (
    <>
      <div className="container-auth">
        <h1>Bem vindo ao Pendura Aí</h1>
        <div className="auth-window">
          <h2>Faça o Login Para Entrar!</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="labels-auth">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input-auth"
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="pass" className="labels-auth">
              Senha:
            </label>
            <input
              type="password"
              name="pass"
              id="pass"
              className="input-auth"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn--primary btn-auth">
              Entrar
            </button>
          </form>
          <p>
            Não possui uma conta? <Link to="/register">Cadastre-se aqui</Link>!
          </p>
        </div>

        <footer>
          <p>Desenvolvido por Jorge Roniel.</p>
        </footer>
      </div>
    </>
  );
}
