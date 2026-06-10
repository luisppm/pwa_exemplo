export async function consultarProduto(codigo) {
  console.log('código:', codigo);
  const response = await fetch(
    `https://buscaprodutospwa.vercel.app/product_consult?barcode=${codigo}`
  );
//    `/api/produto/${codigo}`
  if (!response.ok) {
    throw new Error("Erro ao consultar API");
  }

  return response.json();
}