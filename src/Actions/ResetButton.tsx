function ResetButton({ setResetClicked }: { setResetClicked: Function }) {
  return (
    <button
      onClick={() => setResetClicked(true)}
      className="btn-default btn-reset"
    >
      Reset
    </button>
  );
}

export default ResetButton;
