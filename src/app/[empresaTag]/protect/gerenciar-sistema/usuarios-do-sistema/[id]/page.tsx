import getUser from "@/actions/getUser";

type UserParams = {
    params: {
        id: string;
    }
}

export default async  function UsuarioSistemaPage({params}: UserParams){
    const usuario = await getUser()


    return <div>{params.id}</div>
}