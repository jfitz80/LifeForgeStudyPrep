import Link from 'next/link';

const paths = [
  {
    title: 'New to insurance',
    description: 'Learn basics',
    href: '/knowledge'
  },
  {
    title: 'Test yourself',
    description: 'Free practice exam',
    href: '/free-practice'
  },
  {
    title: 'Get fully prepared',
    description: 'Exam prep guide',
    href: '/exam-prep'
  }
] as const;

export default function ForStudentsStrip() {
  return (
    <section className="my-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-[#1F2A44]">Studying for the LLQP?</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {paths.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#2FAF9E] hover:bg-white"
          >
            <h3 className="text-sm font-bold text-[#1F2A44]">{item.title}</h3>
            <p className="mt-1 text-sm text-[#4A5568]">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
