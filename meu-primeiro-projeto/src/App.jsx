import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// ==========================================
// Saudação
// ==========================================
function Saudacao() {
  return(
    <div style={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginBottom: '10px'}}>
      <h2 style={{ color: '#007cff'}}>Olá, alunos!</h2>
      <p>Este componente foi criado separadamente</p>
    </div>
  )
}

// ==========================================
// Componente > ALERTA DE SISTEMA (Cyberpunk/Neobrutalismo)
// ==========================================
function PainelHacker() {
  const estiloRadical1 = {
    backgroundColor: '#000000',
    color: '#0f0',
    padding: '20px',
    borderRadius: '0px',
    border: '4px solid #0f0',
    fontFamily: '"Courier New", Courier, monospace',
    textTransform: 'uppercase', // ----- Essa budega vai deixar todos os textos em maiúsculo -----
    boxShadow: '10px 10px 0px #ff0055', // shadow do container principal
    margin: '20px 0',
    position: 'relative',
    overflow: 'hidden'
  };
  //-------------- SPAN - Status --------------
  const estiloTag = {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#ff0055',
    color: 'white',
    padding: '2px 10px',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  return (
    <div style={estiloRadical1}>
      <span style={estiloTag}>STATUS: CRÍTICO</span>
      // ----- Alerta de sistema -----
      <h3 style={{ color: '#ffffff', textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px rgb(0, 255, 0)', margin: '10px 0' }}>
        &gt; Alerta de Sistema
      </h3>
      <p style={{margin: '0 0 10px 0'}}>Tentativa de invasão detectada no nó de rede 7. Executando protocolos de contra-medida...</p>
      <p style={{ fontSize: '12px', color: '#555', margin: 0 }}>[Level 5 acces only]</p>
    </div>
  );
}

// ==========================================
// NOVO COMPONENTE 2 (KAOS TOTAL)
// ==========================================
function CardAcido(props) {
  const estiloRadical2 = {
    background: 'linear-gradient(45deg, #ff00ff, #7000ff, #ff8800)',
    color: '#fff',
    padding: '30px',
    borderRadius: '50px',
    margin: '40px auto',
    width: '80%',
    textAlign: 'center',
    transform: 'rotate(-5deg)', // Esse style é mucho loko papito!!!
    boxShadow: '0 20px 50px rgba(112, 0, 255, 0.7)',
    border: '5px solid #fff'
  };

  const estiloTitulo = {
    fontSize: '40px',
    fontWeight: '900',
    margin: '0 0 10px 0',
    letterSpacing: '-2px',
    textTransform: 'lowercase',
    WebkitTextStroke: '1px #000000',  // Borda do titulo
    color: '#fff'
  };

  return (
    <div style={estiloRadical2}>
      <h1 style={estiloTitulo}>kaos total</h1>
      <p style={{ fontSize: '18px', fontWeight: 'bold', background: 'rgba(183, 40, 196, 0.3)', padding: '5px', margin: 0 }}>
        A ordem é uma ilusão. O React é a única verdade. Quebre as regras do DOM.
      </p>

      {/* ----- PROPS----- */}
      <div style={{ backgroundColor: 'rgba(183, 40, 196, 0.3)', color: 'rgb(255, 255, 255)', padding: '10px', borderRadius: '10px', fontSize: '16px' }}> -- <strong>{props.mensagemFeliz}</strong> <br/>
      -- <span style={{ color: '#ffffff' }}>{props.nomeDev}</span>
      </div>
    </div>
  );
}

// ==========================================
//              function App()
// ==========================================
function App() {

  return (
  <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
    <h1>Olá, React!</h1>
    <p>Estou alterando meu primeiro componente.</p>

    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Minha primeira aula de React</h1>
      <hr />

      <p>Componente:</p>
      <Saudacao/>
      <Saudacao/>
      <Saudacao/>

      <hr style={{ margin: '30px 0' }} />
      <p>NOvo Componente 1</p>
      {/* Chamando o novo componente 1 */}
      <PainelHacker />

      <hr style={{ margin: '30px 0' }} />
<p>Estilo Radical 2: Card Ácido com Props</p>
      
      {/* Preenchendo as propriedades na hora de usar */}
      <CardAcido 
        mensagemFeliz="codando sem bugs na sexta-feira" 
        nomeDev="Manveru Aerdor" 
      />

    </div>
  </div>
  )
}

export default App