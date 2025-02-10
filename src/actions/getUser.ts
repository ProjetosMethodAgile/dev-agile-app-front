import apiError from "@/functions/api-error";

export default async function getUser() {
  try {
    const response = await fetch("http://localhost:3000/route/usuario/");
    const data = await response.json();
    return { data, ok: true };
  } catch (error) {
    console.log(error);

    return apiError(error);
  }
}
