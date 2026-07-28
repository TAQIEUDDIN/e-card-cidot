export default function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <span className="divider-line w-10" />
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
        <path
          d="M11 13 C 6 10, 2 6, 4 2 C 7 4, 9 7, 11 13 Z"
          stroke="#C9A66B"
          strokeWidth="1"
        />
        <path
          d="M11 13 C 16 10, 20 6, 18 2 C 15 4, 13 7, 11 13 Z"
          stroke="#C9A66B"
          strokeWidth="1"
        />
      </svg>
      <span className="divider-line w-10" />
    </div>
  );
}
