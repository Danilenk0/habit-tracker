const SunIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ color: "yellow" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75h.008v.008H9.75V9.75Zm0 2.25h.008v.008H9.75v-.008Zm0 2.25h.008v.008H9.75v-.008Zm2.25-6h.008v.008h-.008V9.75Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.25-6h.008v.008h-.008V9.75Zm0 2.25h.008v.008h-.008v-.008Z"
      />
    </svg>
  );
};

export default SunIcon;
