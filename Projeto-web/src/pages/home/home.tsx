import { useState } from "react";
import { Modal } from "../../components/window_modal/modal";
import "./home.css";
import { BlockUser } from "../../components/bloco-user/bloco-user";
import api from "../../services/api";
import { Navbar } from "../../components/navbar/navbar";

export function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<Dados[]>();
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const user_id = 1;
  const [cliente, setCliente] = useState("");

  interface Dados {
    id: number;
    cliente: string;
    valor: string;
  }
  //let dados: Dados[] = [];
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("api/divida", { nome, valor, user_id });
      setNome("");
      setValor("");
      alert("Cliente Cadastrado com Sucesso!");
      console.log(response.status);
      setOpenModal(false);
    } catch (err) {
      alert("Falha ao cadasrar cliente.");
    }
  };

  const search = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.get<Dados[]>("api/divida", {
        params: { cliente },
      });
      setData(response.data);
    } catch (err) {
      alert("Erro ao buscar dados.");
    }
  };

  const updateSucess = async () => {
    try {
      const res = await api.get("api/divida", { params: { cliente } });
      setData(res.data);
    } catch (err) {
      alert("Erro ao atualizar a Lista.");
    }
  };

  const deleteSucess = async (del: number) => {
    const UpdatedList = data?.filter((item) => item.id != del);
    setData(UpdatedList);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="pesquisa-div">
          <h1 className="title-h1">Olá, seja bem vindo!</h1>

          <div className="input-div">
            <input
              type="text"
              id="pesquisa"
              placeholder="Pesquise aqui..."
              onChange={(e) => setCliente(e.target.value)}
              value={cliente}
            />
            <button onClick={search}>Pesquisar</button>
          </div>

          <div className="scrool-area">
            <div className="clients-list">
              {data && data.length > 0 ? (
                data.map((item) => (
                  <BlockUser
                    cliente={item.cliente}
                    valor={item.valor}
                    index={item.id}
                    onUpdate={updateSucess}
                    onDelete={deleteSucess}
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
        <button className="btn-add" onClick={() => setOpenModal(true)}>
          +
        </button>
        <Modal isOpen={openModal}>
          <div className="form-divida">
            <button className="close-btn" onClick={() => setOpenModal(false)}>
              {" "}
              X{" "}
            </button>
            <h1 className="title-h1">Cadastro de Cliente</h1>
            <div>
              <form action="">
                <label className="label" htmlFor="nome">
                  Nome:
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  className="input-form-divida"
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
                  onChange={(e) => setValor(e.target.value)}
                  required
                />
              </form>
              <button type="submit" className="btn-form" onClick={handleSave}>
                Salvar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
