type CardProps = {
  title: string;
  cta: string;
  href: string;
};

export function Card({ title, cta, href }: CardProps) {
  return (
    <a
      className="from-brandred to-brandblue group mt-4 overflow-hidden rounded-lg border border-transparent bg-gradient-to-r bg-origin-border text-[#6b7280]"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="h-full bg-zinc-900 p-4">
        <p className="inline-block text-xl text-white">{title}</p>
        <div className="mt-4 text-xs group-hover:underline">{cta} →</div>
      </div>
    </a>
  );
}
