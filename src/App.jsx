import { useState } from "react";
import BarcodeScanner from "./components/BarcodeScanner";
import { consultarProduto } from "./services/api";

function App() {
  const [codigo, setCodigo] = useState("");
  const [produto, setProduto] = useState(null);
  const [ultimoCodigo, setUltimoCodigo] = useState("");

  const [produtoPendente, setProdutoPendente] = useState(null);
  const [itens, setItens] = useState([]);

  function confirmarProduto() {
  setItens((anterior) => [
    ...anterior,
    {
      gtin: produtoPendente.gtin,
      descricao: produtoPendente.description,
      marca: produtoPendente.brand?.name,
      categoria: produtoPendente.category?.description,
      dataHora: new Date().toLocaleString()
    }
  ]);

  setProdutoPendente(null);
}

function cancelarProduto() {
  setProdutoPendente(null);
}

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

      // setProduto(dados);
      setProdutoPendente(dados);
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

      {produtoPendente && (
  <div
    style={{
      border: "1px solid #ccc",
      padding: "20px",
      marginTop: "20px",
      borderRadius: "10px"
    }}
  >
    <h2>Confirmar Produto</h2>

    <img
      src={produtoPendente.thumbnail}
      alt={produtoPendente.description}
      width="150"
    />

    <p>
      <strong>Descrição:</strong>
      {produtoPendente.description}
    </p>

    <p>
      <strong>GTIN:</strong>
      {produtoPendente.gtin}
    </p>

    <p>
      <strong>Marca:</strong>
      {produtoPendente.brand?.name}
    </p>

    <button
      onClick={confirmarProduto}
      style={{
        marginRight: "10px"
      }}
    >
      Confirmar
    </button>

    <button
      onClick={cancelarProduto}
    >
      Cancelar
    </button>
  </div>
)}
    </div>
    
  );
}

export default App;