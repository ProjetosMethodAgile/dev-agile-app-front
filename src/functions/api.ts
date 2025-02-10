export const API_URL = "https://devagile.com.br/api";

export function GET_USER_ID(userId: string) {
  return {
    url: API_URL + `/api/usuario/${userId}`,
  };
}
