export default function SectionTitle({title}: {title: string}) {
  return (
    <h1 className="text-2xl flex items-center gap-2 text-primary-200 col-span-full ">
      {title}
    </h1>
  );

}