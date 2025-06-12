import React from "react";

interface ReusableModalProps {
  id: string;
  heading: string;
  children: React.ReactNode;
}

const ReusableModal = ({ id, heading, children }: ReusableModalProps) => {
  return (
    <>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <h1 className="text-center font-bold text-2xl"> {heading}</h1>
          {children}
          <button
            type="button"
            onClick={() => {
              const dialog = document.getElementById(id);
              if (dialog instanceof HTMLDialogElement) {
                dialog.close();
              }
            }}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm absolute right-4 top-5 p-2 z-50"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  );
};

export default ReusableModal;
