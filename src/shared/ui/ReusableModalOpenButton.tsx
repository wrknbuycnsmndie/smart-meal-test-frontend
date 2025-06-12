interface IReusableModalOpenButton {
  id: string;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
}

const ReusableModalOpenButton = ({
  id,
  text,
  icon,
  className = "btn w-full",
}: IReusableModalOpenButton) => {
  return (
    <div>
      <button
        onClick={() => {
          const dialog = document.getElementById(`${id}`);
          if (dialog instanceof HTMLDialogElement) {
            dialog.showModal();
          }
        }}
        className={className}
      >
        {icon}
        {text}
      </button>
    </div>
  );
};

export default ReusableModalOpenButton;
