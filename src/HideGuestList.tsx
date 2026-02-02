function HideGuestList({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: Function;
}) {
  return (
    <button
      className="m-1 p-2 pt-1 pb-1 bg-blue-300 rounded-sm shadow-gray-500 hover:shadow-md"
      onClick={() => setIsVisible((prev: boolean) => !prev)}
    >
      {isVisible ? "Hide guestlist" : "Show Guestlist"}
    </button>
  );
}

export default HideGuestList;
