import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Saudacao() {
return(
  <div style={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginBotton: '10px'}}>
    <h2 style={{ color: '#007cff'}}>Olá, alunos!</h2>
    <p>Este componente foi criado separadamente</p>
  </div>
)
}

function App() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <h1>Olá, React!</h1>
    <p>Estou alterando meu primeiro componente.</p>

    <div style={{ padding: '20px'}}>
      <h1>Minha primeira aula de React</h1>
      <hr />

      {/* 3. Aqui nós chamamos o componente que criamos acima*/}

      <Sauacao/>
      <Saudacao/>
      <Saudacao/>

      <p>Note que eu posso repetir o componente quantas vezes eu quiser!</p>

    </div>
  </div>
  )
}

export default App
