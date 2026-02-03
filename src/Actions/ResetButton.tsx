function ResetButton({ setResetClicked }: { setResetClicked: Function }) {
  return (
    <button
      onClick={() => setResetClicked(true)}
      className="m-1 p-2 pt-1 pb-1 bg-amber-500 rounded-sm shadow-gray-500 hover:shadow-md"
    >
      Reset
    </button>
  );
}

export default ResetButton;
