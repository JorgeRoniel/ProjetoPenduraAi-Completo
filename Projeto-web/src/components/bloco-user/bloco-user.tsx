import { useState } from "react";
import "./bloco-user.css";
import { Modal } from "../window_modal/modal";
import api from "../../services/api";

interface UserProps {
  cliente: string;
  valor: string;
  index: number;
  onUpdate: () => void;
  onDelete: (del: number) => void;
}

export function BlockUser({
  cliente,
  valor,
  index,
  onUpdate,
  onDelete,
}: UserProps) {
  const [openModal, setOpenModal] = useState(false);
  const [novo_valor, setNovoValor] = useState("");

  const updateValor = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = index;
    const url = `api/divida/${id}/update`;

    const response = await api.put(url, { novo_valor });
    alert(response.data);

    onUpdate();
    setOpenModal(false);
  };
  // FAZER A FUNÇÃO PRA ATUALIZAR VALOR
  const deleteDivida = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = index;
    const url = `api/divida/${id}/quitar`;

    const response = await api.delete(url);
    alert(response.data);

    onDelete(id);
  };
  return (
    <>
      <div className="infor-user">
        <div className="infor">
          <h3>{cliente}</h3>
          <p>R${valor}</p>
        </div>
        <div className="buttons">
          <button className="btn-edit" onClick={() => setOpenModal(true)}>
            Editar
          </button>
          <button className="btn-del" onClick={deleteDivida}>
            Quitar
          </button>
        </div>
      </div>
      <Modal isOpen={openModal}>
        <div className="divida-content">
          <button id="btn-close" onClick={() => setOpenModal(false)}>
            X
          </button>
          <h1>Valor: R${valor}</h1>
          <div className="divida-values">
            <label htmlFor="novo-valor" id="label">
              Digite o novo valor:
            </label>
            <input
              type="number"
              name="novo-valor"
              id="novo-valor"
              onChange={(e) => setNovoValor(e.target.value)}
            />
          </div>
          <button className="btn-save" onClick={updateValor}>
            Salvar
          </button>
        </div>
      </Modal>
    </>
  );
}
