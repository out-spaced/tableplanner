function ResetButton({ setResetClicked }: { setResetClicked: Function }) {
  return (
    <button onClick={() => setResetClicked(true)} className="btn-oj">
      Reset
    </button>
  );
}

export default ResetButton;
