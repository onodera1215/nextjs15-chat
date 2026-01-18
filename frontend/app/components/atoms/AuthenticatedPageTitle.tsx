export default function AuthenticatedPageTitle({ title }: { title: string }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl text-primary font-bold mb-4">{title}</h1>
      <div className="my-4 shadow-[0_0_2px_1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}
