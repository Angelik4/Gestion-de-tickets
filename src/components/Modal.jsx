import * as Dialog from "@radix-ui/react-dialog";
import "../styles/modal-generic.scss";

export default function Modal({ open, onClose, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <div className="modal-header">
            <Dialog.Title className="modal-title">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="modal-close" onClick={() => console.log("cerrar clickeado")}>
                ✖
              </button>
            </Dialog.Close>
          </div>
          <div className="modal-body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
