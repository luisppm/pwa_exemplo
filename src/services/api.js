export async function consultarProduto(codigo) {
  const response = await fetch(
    `/api/produto/${codigo}`
  );

  if (!response.ok) {
    throw new Error("Erro ao consultar API");
  }

  return response.json();
}