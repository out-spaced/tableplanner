function HideGuestList({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: Function;
}) {
  return (
    <button
      className="btn-default"
      onClick={() => setIsVisible((prev: boolean) => !prev)}
    >
      {isVisible ? "Hide guestlist" : "Show Guestlist"}
    </button>
  );
}

export default HideGuestList;
