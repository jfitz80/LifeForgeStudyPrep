import Link from 'next/link';

type LogoProps = {
  href?: string;
  className?: string;
};

export default function Logo({ href = '/', className = '' }: LogoProps) {
  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`.trim()} aria-label="LifeForgePrep">
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2C3440] text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M12 2.5 4.5 6v5.6c0 4.4 2.5 8.4 7.5 9.9 5-1.5 7.5-5.5 7.5-9.9V6L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white"
          />
          <path
            d="M12.2 8.1c1 1.1 2 2.2 2 3.7 0 1.8-1.4 3.2-3.2 3.2-1.6 0-2.9-1.3-2.9-2.9 0-1.8 1.3-3.1 3.1-4Z"
            fill="#FA933A"
          />
        </svg>
      </span>
      <span className="text-xl font-bold tracking-tight">
        <span className="text-[#2C3440]">LifeForge</span>
        <span className="text-[#FA933A]">Prep</span>
      </span>
    </Link>
  );
}
