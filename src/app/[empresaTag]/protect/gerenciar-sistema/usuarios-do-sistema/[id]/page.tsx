// import getUser from "@/actions/getUser";

type UserParams = {
  params: Promise<{ id: string }>;
};

export default async function UsuarioSistemaPage({ params }: UserParams) {
  const { id } = await params;

  // const usuario = await getUser()

  return <div>{id}</div>;
}
