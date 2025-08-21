import { useState } from "react";
import "./register.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const role = "USER";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await api.post("api/user", { nome, email, senha, role });
    const message = response.data;
    alert(message);
    navigate("/login");
  };
  return (
    <>
      <div className="container-register">
        <h1>Bem vindo ao Pendura Aí</h1>
        <div className="register-window">
          <h2>Crie Sua Conta!</h2>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name" className="labels-register">
              Nome:
            </label>
            <input
              type="text"
              name="name"
              className="input-register"
              placeholder="Digite seu nome..."
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="email" className="labels-register">
              Email:
            </label>
            <input
              type="text"
              name="email"
              className="input-register"
              placeholder="Digite seu email..."
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="pass" className="labels-register">
              Senha:
            </label>
            <input
              type="password"
              name="pass"
              className="input-register"
              placeholder="Digite sua senha..."
              onChange={(e) => setSenha(e.target.value)}
            />

            <button type="submit" className="btn-register">
              Entrar
            </button>
          </form>
          <p>
            Já possui uma conta? <a href="/login">Clique aqui</a>!
          </p>
        </div>

        <footer>
          <p>Desenvolvido por Jorge Roniel.</p>
        </footer>
      </div>
    </>
  );
}
