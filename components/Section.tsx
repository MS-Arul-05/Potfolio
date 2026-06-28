export default function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section scroll-mt-20">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2">{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
      <div className="mt-10">{children}</div>
    </section>
  );
}
