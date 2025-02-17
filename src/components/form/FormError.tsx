export default function FormError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="mt-2 text-center text-sm text-red-500">{error}</p>;
}
