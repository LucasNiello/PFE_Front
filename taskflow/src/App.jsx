// -------------------- FORMATIVA  REACT --------------------
//                Lucas Terminiello - 3DEVT


// ===================================================================================================

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
// import React...: Aqui estamos trazendo as ferramentas do React. O useState serve para criar "variáveis" que o React observa (se elas mudarem, a tela atualiza). O useEffect serve para executar códigos em momentos específicos (como quando a página carrega).

// import './App.css': Puxa o arquivo de estilos para deixar tudo bonito.

// function App() {: Cria o nosso componente principal. Tudo o que a aplicação faz acontece dentro dessas chaves.

// ===================================================================================================

  // Estados originais ( A memória da aplicação)
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Baixa");
  const [taskList, setTaskList] = useState(() => {
    const saved = localStorage.getItem("@taskflow_data");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("Todas");

  // Novos estados para os requisitos adicionais
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [editPriority, setEditPriority] = useState("Baixa"); // Prioridade na edição

//   O useState sempre devolve duas coisas: o valor atual (ex: taskText) e uma função para alterar esse valor (ex: setTaskText).

// taskText: Guarda o que o usuário está digitando para criar uma nova tarefa. Começa vazio "".

// priority: Guarda a prioridade selecionada. Começa como "Baixa".

// taskList: É a lista principal onde todas as tarefas vão morar. Começa como um array vazio [].

// filter: Guarda qual aba de filtro está ativa ("Todas", "Pendentes", etc).

// searchTerm: Guarda o texto que o usuário digita na barra de busca.

// editingId: Guarda o ID da tarefa que está sendo editada no momento. null significa que nenhuma está sendo editada.

// editTaskText: Guarda o texto temporário enquanto o usuário edita uma tarefa.

// =================================================================================================

  // Removido o useEffect de carregamento porque agora o carregamento é feito direto no useState acima.

// =================================================================================================

  useEffect(() => {
    localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
  }, [taskList]);
  
//   Já esse useEffect tem o [taskList] no final. Isso significa: "Toda vez que a taskList mudar, rode isso".

// Ele pega a lista atualizada, transforma em texto puro (JSON.stringify) e salva no localStorage. É isso que faz as tarefas não sumirem quando você atualiza a página!

// =================================================================================================
// Metrônomo Global para sincronizar o piscar do neon
  useEffect(() => {
    const relogio = setInterval(() => {
      document.body.classList.toggle('neon-ligado');
    }, 500); // 500ms aceso, 500ms apagado
    
    return () => clearInterval(relogio);
  }, []);

// =================================================================================================

  const addTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };

    setTaskList([newTask, ...taskList]);
    setTaskText("");
  };

// e.preventDefault(): Impede a página de recarregar quando o formulário é enviado.

// if (!taskText.trim()) return;: Se o usuário só digitou espaços ou deixou em branco, a função para aqui e não faz nada.

// const newTask = {...}: Monta o objeto da nova tarefa. Usamos crypto.randomUUID() para gerar um ID único garantido (nativo dos navegadores). Setamos que ela não está completada e pegamos a data de hoje.

// setTaskList([newTask, ...taskList]);: Aqui é a mágica do React. Pegamos a lista antiga (...taskList), colocamos a newTask no começo, e salvamos essa nova lista.

// setTaskText("");: Limpa o campo de digitação para a próxima tarefa.

  // ==================================================================================================

  const toggleTask = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

// toggleTask: Essa função é o famoso "Interruptor". Ela serve para inverter o status de uma tarefa: se está pendente, vira concluída; se está concluída, volta a ser pendente.

  // ===============================================================================================

  // Requisito 4: Confirmação de Exclusão
  const deleteTask = (id) => {
    if (window.confirm("Tem certeza que deseja remover esta tarefa definitivamente?")) {
      setTaskList(taskList.filter(t => t.id !== id));  
    }
  };

// Abre aquela janelinha padrão do navegador perguntando "Tem certeza?". Se clicar em "OK", ele usa o .filter() para criar uma lista nova com todas as tarefas, exceto a que tem aquele ID. É como se você passasse por uma fila de pessoas perguntando o nome. Quando encontra a "Maria", você manda ela colocar um chapéu. Todas as outras pessoas continuam exatamente como estavam, e a fila agora é uma "nova fila" onde apenas a Maria está de chapéu.

  // ===============================================================================================

  // Funções do Requisito 3: Edição
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTaskText(task.text);
    setEditPriority(task.priority); 
  };

  // Quando clica em "Editar", o sistema grava o ID daquela tarefa e copia o texto dela para o input de edição.

  // ===============================================================================================

  const saveEdit = (id) => {
    if (!editTaskText.trim()) return;
    setTaskList(taskList.map(t => 
      t.id === id ? { ...t, text: editTaskText, priority: editPriority } : t
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTaskText("");
  };

//   saveEdit: Varre a lista com .map(). Achou a tarefa sendo editada? Troca o texto original pelo texto novo (editTaskText). Depois, limpa o editingId (mudando para null) para fechar o modo de edição.

// cancelEdit: Apenas cancela tudo limpando o ID.

// =================================================================================================

  // Lógica de Filtro + Requisito 2 (Busca) + Requisito 1 (Ordenação)
  const priorityWeights = { Alta: 3, Média: 2, Baixa: 1 };

  const processedTasks = taskList
    .filter(t => {
      // Filtro por status
      if (filter === "Pendentes") return !t.completed;
      if (filter === "Concluídas") return t.completed;
      return true;
    })
    .filter(t => {
      // Filtro por busca de texto (Requisito 2)
      return t.text.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      // Ordenação: Maior peso vem primeiro (Requisito 1)
      return priorityWeights[b.priority] - priorityWeights[a.priority];
    });

//     Nós não exibimos a taskList crua. Criamos a processedTasks, que é a lista passando por 3 transformações:

// Primeiro .filter(): Olha os botões de abas. Se for "Pendentes", só deixa passar quem não está completo.

// Segundo .filter(): Olha o que foi digitado na barra de busca (searchTerm) e só deixa passar as tarefas que contém esse texto. O toLowerCase() serve para ignorar letras maiúsculas ou minúsculas na busca.

// O .sort(): Organiza a lista. Ele usa a tabelinha priorityWeights. Uma prioridade "Alta" vale 3, uma "Baixa" vale 1. Ele faz a conta de subtração para colocar os mais pesados no topo.

// =================================================================================================

  return (
    <div className="app-container">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestão de Produtividade - Turma: 3DEVT</p>
      </header>

      <section className="form-section">
        <form onSubmit={addTask}>
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Descrição da nova tarefa..."
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <button type="submit">Criar</button>
        </form>
      </section>

      <section className="search-section">
        <input 
          type="text" 
          placeholder="Buscar tarefas..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </section>

      <section className="filter-section">
        {["Todas", "Pendentes", "Concluídas"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      <main className="task-grid">
        {processedTasks.map(item => (
          <div key={item.id} className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''}`}>
            
            <div className="task-content">
              {editingId === item.id ? (
                <div className="edit-mode">
                  <input 
                    type="text" 
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    autoFocus
                  />
                  
                  <select 
                    value={editPriority} 
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="edit-select"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>

                  <div className="edit-actions">
                    <button onClick={() => saveEdit(item.id)} className="save-btn">Salvar</button>
                    <button onClick={cancelEdit} className="cancel-btn">Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <h3>{item.text}</h3>
                  <span>Prioridade: {item.priority}</span>
                  <small>Criada em: {item.createdAt}</small>
                </>
              )}
            </div>

            <div className="task-actions">
              {!editingId && (
                <>
                  <button onClick={() => toggleTask(item.id)}>
                    {item.completed ? "Reabrir" : "Concluir"}
                  </button>
                  <button onClick={() => startEditing(item)} className="edit-btn">
                    Editar
                  </button>
                  <button onClick={() => deleteTask(item.id)} className="delete">
                    Remover
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {processedTasks.length === 0 && <p className="empty-state">Nenhuma tarefa encontrada.</p>}
      </main>
    </div>
  );
}

export default App;


/*
================================================================================
                    FLUXOGRAMA DO TASKFLOW (MARKDOWN/TEXTO)
================================================================================

 [ INÍCIO: Navegador abre o App ]
          |
          v
 [ LER DISCO RÍGIDO (localStorage) ]
          |
          +---> Tem dados salvos? ----> (Sim) -> [ Carrega na taskList ]
          |
          +---> Não tem dados? -------> (Não) -> [ taskList = [] (vazia) ]
          |
          v
 [ RENDERIZA A TELA (JSX) ] <-----------------------------------------+
          |                                                           |
          v                                                           |
 === O QUE O USUÁRIO FAZ? =========================================   |
   |                                                              |   |
   |--> Digita nova tarefa + "Criar" ---> [ addTask() ]           |   |
   |                                                              |   |
   |--> Clica em "Concluir/Reabrir" ----> [ toggleTask() ]        |   | (Filtros e Busca)
   |                                                              |   | alteram a view
   |--> Clica em "Remover" + "OK" ------> [ deleteTask() ]        |   | na hora, sem
   |                                                              |   | tocar no HD.
   |--> Clica em "Editar" + "Salvar" ---> [ saveEdit() ]          |   |
   |                                                              |   |
   |--> Usa Filtros / Barra de Busca ---> [ processedTasks ] -----+---+
   |                                                              
 ==================================================================   
          |
          v
 (As 4 primeiras ações acima alteram a memória central: taskList)
          |
          v
 [ ESTADO 'taskList' É ATUALIZADO ]
          |
          +---> 1. O React avisa a interface e recarrega a [ Renderização JSX ]
          |
          +---> 2. O `useEffect` detecta a mudança e ativa o Salvar Automático
                   |
                   v
          [ SALVA TUDO NO localStorage (Formato JSON) ]

================================================================================
*/