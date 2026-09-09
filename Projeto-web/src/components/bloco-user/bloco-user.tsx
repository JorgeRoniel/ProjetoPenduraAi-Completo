import { useState } from "react";
import "./bloco-user.css";
import { Modal } from "../window_modal/modal";

interface UserProps {
  cliente: string;
  valor: string;
  id: number;
  onUpdate: (id: number, novo_valor: string) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
}

export function BlockUser({
  cliente,
  valor,
  id,
  onUpdate,
  onDelete,
}: UserProps) {
  const [openModal, setOpenModal] = useState(false);
  const [novo_valor, setNovoValor] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
    setNovoValor("");
  };

  const handleSaveValor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novo_valor.trim()) {
      alert("Por favor, informe o novo valor.");
      return;
    }

    await onUpdate(id, novo_valor);
    handleCloseModal();
  };

  const handleDeleteDivida = async (e: React.FormEvent) => {
    e.preventDefault();
    await onDelete(id);
  };

  return (
    <>
      <div className="infor-user">
        <div className="infor">
          <h3>{cliente}</h3>
          <p>R${valor}</p>
        </div>
        <div className="buttons">
          <button
            className="btn btn--primary btn-edit"
            onClick={() => setOpenModal(true)}
          >
            Editar
          </button>
          <button
            className="btn btn--danger btn-del"
            onClick={handleDeleteDivida}
          >
            Quitar
          </button>
        </div>
      </div>
      <Modal isOpen={openModal}>
        <div className="divida-content">
          <button
            id="btn-close"
            className="btn btn--danger btn--round"
            onClick={handleCloseModal}
          >
            X
          </button>
          <h1>Valor: R${valor}</h1>
          <form className="divida-values" onSubmit={handleSaveValor}>
            <label htmlFor="novo-valor">
              Digite o novo valor:
            </label>
            <input
              type="number"
              name="novo-valor"
              id="novo-valor"
              value={novo_valor}
              onChange={(e) => setNovoValor(e.target.value)}
              required
            />
            <button type="submit" className="btn btn--primary btn-save">
              Salvar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
