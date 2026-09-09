import { useState } from "react";
import "./register.css";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const role = "USER";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("api/user/register", {
        nome,
        email,
        senha,
        role,
      });
      const message = response.data;
      alert(message);
      navigate("/login");
    } catch {
      alert("Falha ao cadastrar usuário. Verifique os dados informados.");
    }
  };

  return (
    <>
      <div className="container-auth">
        <h1>Bem vindo ao Pendura Aí</h1>
        <div className="auth-window">
          <h2>Crie Sua Conta!</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="labels-auth">
              Nome:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="input-auth"
              placeholder="Digite seu nome..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit" className="btn btn--primary btn-auth">
              Cadastrar
            </button>
          </form>
          <p>
            Já possui uma conta? <Link to="/login">Clique aqui</Link>!
          </p>
        </div>

        <footer>
          <p>Desenvolvido por Jorge Roniel.</p>
        </footer>
      </div>
    </>
  );
}
