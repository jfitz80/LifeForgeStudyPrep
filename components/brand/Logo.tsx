import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 font-bold">
      <span>LifeForge</span>
      <span className="text-orange-500">Prep</span>
    </Link>
  );
}
