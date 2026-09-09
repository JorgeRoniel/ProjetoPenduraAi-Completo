import { useState } from "react";
import { Modal } from "../../components/window_modal/modal";
import "./home.css";
import { BlockUser } from "../../components/bloco-user/bloco-user";
import api from "../../services/api";
import { Navbar } from "../../components/navbar/navbar";
import { useAuth } from "../../utils/auth";

interface Dados {
  id: number;
  cliente: string;
  valor: string;
}

export function Home() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<Dados[]>();
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [cliente, setCliente] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    if (!nome.trim() || !valor.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await api.post("api/divida", {
        nome,
        valor,
        user_id: user.id,
      });
      setNome("");
      setValor("");
      alert("Cliente Cadastrado com Sucesso!");
      setOpenModal(false);
    } catch {
      alert("Falha ao cadastrar cliente.");
    }
  };

  const search = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.get<Dados[]>("api/divida", {
        params: { cliente },
      });
      setData(response.data);
    } catch {
      alert("Erro ao buscar dados.");
    }
  };

  const handleUpdateDivida = async (id: number, novo_valor: string) => {
    const url = `api/divida/${id}/update`;
    try {
      const response = await api.put(url, { novo_valor });
      alert(response.data);
      setData((prev) =>
        prev?.map((item) =>
          item.id === id ? { ...item, valor: novo_valor } : item
        )
      );
    } catch {
      alert("Erro ao atualizar o valor.");
    }
  };

  const handleDeleteDivida = async (id: number) => {
    const url = `api/divida/${id}/quitar`;
    try {
      const response = await api.delete(url);
      alert(response.data);
      setData((prev) => prev?.filter((item) => item.id !== id));
    } catch {
      alert("Erro ao quitar a dívida.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="pesquisa-div">
          <h1 className="title-h1">Olá, seja bem vindo!</h1>

          <form className="input-div" onSubmit={search}>
            <input
              type="text"
              id="pesquisa"
              placeholder="Pesquise aqui..."
              onChange={(e) => setCliente(e.target.value)}
              value={cliente}
            />
            <button type="submit" className="btn btn--primary">
              Pesquisar
            </button>
          </form>

          <div className="scrool-area">
            <div className="clients-list">
              {data && data.length > 0 ? (
                data.map((item) => (
                  <BlockUser
                    key={item.id}
                    cliente={item.cliente}
                    valor={item.valor}
                    id={item.id}
                    onUpdate={handleUpdateDivida}
                    onDelete={handleDeleteDivida}
                  />
                ))
              ) : (
                <h2 className="title-h2">
                  consulte a dívida dos seus clientes!
                </h2>
              )}
            </div>
          </div>
        </div>
        <button
          className="btn btn--primary btn--round btn-add"
          onClick={() => setOpenModal(true)}
        >
          +
        </button>
        <Modal isOpen={openModal}>
          <div className="form-divida">
            <button
              className="btn btn--danger btn--round close-btn"
              onClick={() => setOpenModal(false)}
            >
              {" "}
              X{" "}
            </button>
            <h1 className="title-h1">Cadastro de Cliente</h1>
            <div>
              <form onSubmit={handleSave}>
                <label className="label" htmlFor="nome">
                  Nome:
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  className="input-form-divida"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
                <label className="label" htmlFor="valor">
                  Valor:
                </label>
                <input
                  type="number"
                  name="valor"
                  id="valor"
                  className="input-form-divida"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn--primary btn-form">
                  Salvar
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
