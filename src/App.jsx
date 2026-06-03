import { useState } from 'react'

function App() {
  const [contador, setContador] = useState(0)

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px'
    }}>
      <h1>Meu Primeiro PWA</h1>

      <h2>{contador}</h2>

      <button
        onClick={() => setContador(contador + 1)}
      >
        Incrementar
      </button>
    </div>
  )
}

export default App