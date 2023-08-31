type CardProps = {
  title: string;
  cta: string;
  href: string;
};

export function Card({ title, cta, href }: CardProps) {
  return (
    <a
      className="group mt-4 rounded-lg border border-transparent overflow-hidden bg-origin-border bg-gradient-to-r from-brandred to-brandblue text-[#6b7280]"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="p-4 bg-zinc-900 h-full">
        <p className="inline-block text-xl text-white">{title}</p>
        <div className="text-xs mt-4 group-hover:underline">{cta} →</div>
      </div>
    </a>
  );
}
