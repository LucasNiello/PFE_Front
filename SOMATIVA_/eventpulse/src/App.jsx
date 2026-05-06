// ==========================================================================
// IMPORTAÇÕES NECESSÁRIAS
// ==========================================================================
import React, { useState, useEffect } from 'react';
import './App.css'; // Importa o arquivo de estilos (A "roupa" da aplicação)
import faviconCss from './assets/favicon_css.png'; // Imagem usada no botão flutuante

function App() {
  // ==========================================================================
  // ESTADOS DA APLICAÇÃO (STATE)
  // Variáveis que, quando alteradas, fazem a tela ser atualizada automaticamente.
  // ==========================================================================
  const [eventTitle, setEventTitle] = useState("");       // Guarda o texto digitado no campo de nome do evento
  const [eventType, setEventType] = useState("Palestra"); // Guarda o tipo selecionado (Palestra, Workshop, Painel)
  
  // REQUISITO 3: Estado para controlar a quantidade de vagas escolhida no formulário
  const [eventVagas, setEventVagas] = useState("30"); 
  
  const [eventList, setEventList] = useState([]);         // A lista principal que guarda todos os eventos criados
  const [filter, setFilter] = useState("Todos");          // Guarda qual botão de filtro está ativo no momento
  
  // REQUISITO 2: Estado para guardar o texto digitado na barra de pesquisa
  const [searchTerm, setSearchTerm] = useState(""); 
  
  // REQUISITO 5: Estado que controla se a janela do Modal está aberta (true) ou fechada (false)
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // ==========================================================================
  // EFEITOS (USEEFFECT) - BANCO DE DADOS LOCAL
  // ==========================================================================
  
  // 1. CARREGAR: Executa apenas uma vez quando a página abre (array vazio [])
  // Busca os dados salvos no navegador (LocalStorage) para não perder ao atualizar a página.
  useEffect(() => {
    const savedEvents = localStorage.getItem("@eventpulse_data");
    if (savedEvents) setEventList(JSON.parse(savedEvents));
  }, []);

  // 2. SALVAR: Executa toda vez que a lista de eventos (eventList) sofre alguma alteração.
  // Transforma a lista em texto (JSON) e salva no navegador.
  useEffect(() => {
    localStorage.setItem("@eventpulse_data", JSON.stringify(eventList));
  }, [eventList]);

  // ==========================================================================
  // FUNÇÕES DE LÓGICA DE NEGÓCIO
  // ==========================================================================

  // Função para CRIAR um novo evento
  const addEvent = (e) => {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário
    if (!eventTitle.trim()) return; // Se o título estiver vazio, não faz nada

    // Monta o "molde" do novo evento
    const newEvent = {
      id: crypto.randomUUID(), // Gera um ID único e aleatório
      title: eventTitle,
      type: eventType,
      status: "Agendado", // Todo evento nasce como Agendado
      date: new Date().toLocaleDateString(), // Pega a data atual do computador
      vagas: parseInt(eventVagas) // REQUISITO 3: Salva a quantidade de vagas convertida para número
    };

    // Adiciona o novo evento no topo da lista e limpa o campo de texto
    setEventList([newEvent, ...eventList]);
    setEventTitle("");
  };

  // Função para MUDAR O STATUS do evento (Agendado -> Em Andamento -> Encerrado)
  const toggleStatus = (id) => {
    setEventList(eventList.map(evt => {
      if (evt.id === id) { // Encontra o evento exato pelo ID
        const nextStatus = evt.status === "Agendado" ? "Em Andamento" :
          evt.status === "Em Andamento" ? "Encerrado" : "Agendado";
        return { ...evt, status: nextStatus }; // Retorna o evento com o status atualizado
      }
      return evt; // Retorna os outros eventos sem alterar
    }));
  };

  // Função para DELETAR um evento específico
  const deleteEvent = (id) => {
    setEventList(eventList.filter(evt => evt.id !== id)); // Mantém na lista apenas quem tem ID diferente
  };

  // REQUISITO 3: Função para DIMINUIR VAGAS (Inscrição)
  const inscreverAluno = (id) => {
    setEventList(eventList.map(evt => {
      // Se achar o evento pelo ID e ele ainda tiver vagas (> 0)
      if (evt.id === id && evt.vagas > 0) {
        return { ...evt, vagas: evt.vagas - 1 }; // Subtrai 1 da quantidade atual
      }
      return evt;
    }));
  };

  // REQUISITO 4: Função para LIMPAR O CRONOGRAMA com alerta de segurança
  const limparCronograma = () => {
    // window.confirm exibe aquela caixinha do navegador com "OK" ou "Cancelar"
    const confirma = window.confirm("Atenção: Deseja realmente apagar todo o cronograma? Esta ação não pode ser desfeita.");
    if (confirma) {
      setEventList([]); // Zera a lista no React
      localStorage.removeItem("@eventpulse_data"); // Apaga tudo do banco de dados do navegador
    }
  };

  // ==========================================================================
  // FILTRAGEM, PESQUISA E ORDENAÇÃO
  // Prepara a lista final que será exibida na tela
  // ==========================================================================
  const filteredEvents = eventList.filter(evt => {
    // Verifica se o evento combina com o botão de status clicado
    const matchStatus = 
      filter === "Todos" || 
      (filter === "Agendados" && evt.status === "Agendado") ||
      (filter === "Em Andamento" && evt.status === "Em Andamento") ||
      (filter === "Encerrados" && evt.status === "Encerrado");

    // REQUISITO 2: Verifica se o título do evento contém o texto digitado na pesquisa (ignorando maiúsculas/minúsculas)
    const matchSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchStatus && matchSearch; // Só exibe se passar nos dois filtros
  }).sort((a, b) => {
    // REQUISITO 1: Ordenação - Obriga os itens do tipo "Workshop" a ficarem sempre no topo da lista (-1)
    if (a.type === 'Workshop' && b.type !== 'Workshop') return -1;
    if (a.type !== 'Workshop' && b.type === 'Workshop') return 1;
    return 0;
  });

  // ==========================================================================
  // RENDERIZAÇÃO DA INTERFACE (O que o usuário vê - JSX)
  // ==========================================================================
  return (
    <div className="app-container">
      {/* CABEÇALHO */}
      <header>
        <div className="header-titles">
          <h1>EventPulse</h1>
          <p>Gestão de Eventos Acadêmicos</p>
        </div>
        <button onClick={limparCronograma} className="btn-limpar">Limpar Cronograma</button>
      </header>

      {/* FORMULÁRIO DE CADASTRO */}
      <section className="form-section">
        <form onSubmit={addEvent}>
          <input
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)} // Atualiza o estado ao digitar
            placeholder="Nome do evento ou atividade..."
          />
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="Palestra">Palestra</option>
            <option value="Workshop">Workshop</option>
            <option value="Painel">Painel</option>
          </select>
          
          {/* REQUISITO 3: Select de Vagas */}
          <select value={eventVagas} onChange={(e) => setEventVagas(e.target.value)} className="vagas-select">
            <option value="10">10 Vagas</option>
            <option value="30">30 Vagas</option>
            <option value="50">50 Vagas</option>
          </select>
          
          <button type="submit">Agendar</button>
        </form>
      </section>

      {/* REQUISITO 2: CAIXA DE PESQUISA */}
      <section className="search-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca a cada letra digitada
          placeholder="Pesquisar evento pelo título..."
          className="search-input"
        />
      </section>

      {/* BOTÕES DE FILTRO DE STATUS */}
      <section className="filter-section">
        {/* Mapeia os 4 status para criar os botões dinamicamente */}
        {["Todos", "Agendados", "Em Andamento", "Encerrados"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""} // Pinta o botão ativo
            onClick={() => setFilter(f)} // Muda o filtro atual ao clicar
          >
            {f}
          </button>
        ))}
      </section>

      {/* LISTA DE EVENTOS (GRID DE CARDS) */}
      <main className="event-grid">
        {/* Pega a lista já filtrada/ordenada e cria um card HTML para cada item */}
        {filteredEvents.map(item => (
          <div
            key={item.id}
            // Adiciona classes CSS dinâmicas baseadas no tipo e no status para aplicar as cores
            className={`event-card ${item.type.toLowerCase()} ${item.status.toLowerCase().replace(" ", "-")}`}
          >
            <div className="event-content">
              <h3>{item.title}</h3>
              <span className="event-tag">Tipo: {item.type}</span>
              <span className="status-badge">Status: {item.status}</span>
              <span className="vagas-badge">Vagas Restantes: {item.vagas}</span>
              <small>Registrado em: {item.date}</small>
            </div>
            
            <div className="event-actions">
              <button onClick={() => toggleStatus(item.id)} className="status-btn">
                {/* Muda o texto do botão de acordo com o status atual */}
                {item.status === "Agendado" ? "Iniciar" : item.status === "Em Andamento" ? "Encerrar" : "Reiniciar"}
              </button>
              <button onClick={() => deleteEvent(item.id)} className="delete">
                Remover
              </button>
            </div>
            
            {/* REQUISITO 3: BOTÃO DE INSCRIÇÃO */}
            <button 
              onClick={() => inscreverAluno(item.id)} 
              disabled={item.vagas === 0} // Desativa o clique se chegar a zero
              className={`inscrever-btn ${item.vagas === 0 ? "esgotado" : ""}`} // Aplica classe cinza se esgotado
            >
              {item.vagas === 0 ? "Esgotado" : "Inscrever Aluno"}
            </button>
          </div>
        ))}
      </main>

      {/* ==========================================================================
          REQUISITO 5: BOTÃO FLUTUANTE E MODAL
          ========================================================================== */}
      
      {/* Botão que fica no canto da tela. Ao clicar, muda o estado do Modal para true (abrir) */}
      <button className="floating-btn" onClick={() => setIsModalOpen(true)}>
        <img src={faviconCss} alt="Botão de Estilizações" className="floating-img" />
      </button>
      
      {/* Renderização Condicional: O bloco abaixo só existe na tela se isModalOpen for TRUE */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          {/* onClick={e => e.stopPropagation()} evita que clicar no bloco branco feche o modal */}
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Estilizações Aplicadas</h2>
            <ul>
              <li><strong>1. Fundo em Gradiente:</strong> O <code>body</code> da aplicação ganhou um background gradiente contínuo substituindo o fundo branco padrão.</li>
              <li><strong>2. Título Neon/Gradiente:</strong> O <code>h1</code> do cabeçalho agora possui um preenchimento em gradiente.</li>
              <li><strong>3. Cards Flutuantes (Hover):</strong> Ao passar o mouse sobre os <code>event-cards</code>, eles ganham escala (zoom) e uma sombra pronunciada.</li>
            </ul>
            {/* Botão que muda o estado do Modal para false (fechar) */}
            <button onClick={() => setIsModalOpen(false)} className="close-modal">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;