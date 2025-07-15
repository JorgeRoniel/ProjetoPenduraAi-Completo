import "../../pages/home/home.css";
interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export function Modal({ isOpen, children }: ModalProps): JSX.Element | null {
  if (isOpen) {
    return <div className="janela">{children}</div>;
  } else {
    return null;
  }
}
