import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  label: string;
  subTitle: string;
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  children,
  label,
  subTitle,
}) => {
  return (
    <ReactModal
      preventScroll={true}
      contentLabel={label}
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      onRequestClose={closeModal}
      style={{
        overlay: {
          background: "rgba(0,0,0,.3)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div className="mb-6">
        <h2 className="font-semibold text-lg">{label}</h2>
        {subTitle && <p className="font-light">{subTitle} </p>}
      </div>

      <div className="max-w-md">{children}</div>
    </ReactModal>
  );
};
