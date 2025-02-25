export default function SectionTitle({ title }: { title: string }) {
  return (
    <h1 className="dark:text-primary-200 col-span-full flex items-center gap-2 text-2xl">
      {title}
    </h1>
  );
}
