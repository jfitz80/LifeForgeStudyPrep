type ShieldEmblemProps = {
  className?: string;
};

export default function ShieldEmblem({ className }: ShieldEmblemProps) {
  return (
    <svg
      viewBox="0 0 420 420"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M210 40 C130 80 80 160 80 210 C80 310 170 360 210 380 C250 360 340 310 340 210 C340 160 290 80 210 40Z"
        fill="#1F2A44"
      />
      <path
        d="M210 90 C180 130 190 200 210 240 C230 200 240 130 210 90Z"
        fill="#2FAF9E"
      />
      <path
        d="M210 120 C195 150 200 190 210 210 C220 190 225 150 210 120Z"
        fill="#6BC4B8"
      />
    </svg>
  );
}
