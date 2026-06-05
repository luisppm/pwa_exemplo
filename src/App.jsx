import { useState } from "react";
import BarcodeScanner from "./components/BarcodeScanner";

function App() {
  const [codigo, setCodigo] = useState("");

  async function consultarProduto(codigoLido) {
    setCodigo(codigoLido);

    console.log("Código lido:", codigoLido);

    try {
      const response = await fetch(
        `/api/produto/${codigoLido}`
      );

      const dados = await response.json();

      console.log(dados);
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div>
      <h1>Consulta de Produtos</h1>

      <BarcodeScanner
        onScan={consultarProduto}
      />

      <h2>Código:</h2>

      <p>{codigo}</p>
    </div>
  );
}

export default App;