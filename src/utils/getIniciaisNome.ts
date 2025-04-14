function getIniciaisNome(nomeCompleto: string) {
  const partes = nomeCompleto.trim().split(/\s+/); // divide por espaços

  const primeira = partes[0]?.charAt(0).toUpperCase() || "";
  const segunda = partes[1]?.charAt(0).toUpperCase() || "";

  return segunda ? `${primeira}.${segunda}.` : `${primeira}.`;
}

export default getIniciaisNome;
