import { useState } from "react";
import BarcodeScanner from "./components/BarcodeScanner";
import { consultarProduto } from "./services/api";

function App() {
  const [codigo, setCodigo] = useState("");
  const [produto, setProduto] = useState(null);
  const [ultimoCodigo, setUltimoCodigo] = useState("");

  async function onScan(codigoLido) {
    if (!codigoLido) return;

    if (codigoLido === ultimoCodigo) {
      return;
    }

    setUltimoCodigo(codigoLido);
    setCodigo(codigoLido);
    navigator.vibrate?.(200);

    try {
      const dados = await consultarProduto(codigoLido);

      setProduto(dados);
    } catch (err) {
      console.error(err);
      setProduto(null);
    }
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <h1>Consulta de Produtos</h1>

      <BarcodeScanner onScan={onScan} />

      <h2>Código Lido</h2>

      <p>{codigo}</p>

      {produto && (
        <>
          <h2>Produto</h2>

          <pre>
            {JSON.stringify(produto, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

export default App;