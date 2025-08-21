import "./register.css";

export function Register() {
  return (
    <>
      <div className="container-register">
        <h1>Bem vindo ao Pendura Aí</h1>
        <div className="register-window">
          <h2>Crie Sua Conta!</h2>
          <form action="">
            <label htmlFor="name" className="labels-register">
              Nome:
            </label>
            <input
              type="text"
              name="name"
              className="input-register"
              placeholder="Digite seu nome..."
            />
            <label htmlFor="email" className="labels-register">
              Email:
            </label>
            <input
              type="text"
              name="email"
              className="input-register"
              placeholder="Digite seu email..."
            />

            <label htmlFor="pass" className="labels-register">
              Senha:
            </label>
            <input
              type="text"
              name="pass"
              className="input-register"
              placeholder="Digite sua senha..."
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
