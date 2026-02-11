// O código executa assim que é lido
(function iniciarVerificador() {
    // Entrada via PROMPT
    // O prompt retorna texto, então usamos parseInt para converter em número inteiro
    let horaInput = prompt("Exercício 1: Verificador de Tarefas\n\nDigite a HORA da tarefa (0-23):");
    
    // Se o usuário clicar em Cancelar, sai da função
    if (horaInput === null) return; 
    let hora = parseInt(horaInput);

    let prioInput = prompt("Digite a PRIORIDADE (1-10):");
    if (prioInput === null) return;
    let prioridade = parseInt(prioInput);

    // Validação
    if (isNaN(hora) || hora < 0 || hora > 23) { // Esse sinal || é chamado de Operador OR (ou "OU" lógico). Ele é um dos pilares da lógica de programação e serve para verificar condições múltiplas em uma única expressão.
        alert("❌ Erro: Horário Inválido! Digite entre 0 e 23."); 
        return;
    }
    if (isNaN(prioridade) || prioridade < 1 || prioridade > 10) {
        alert("❌ Erro: Prioridade Inválida! Digite entre 1 e 10.");
        return;
    }

    // Lógica do Turno
    let turno = "";
    if (hora <= 11) turno = "Manhã";
    else if (hora <= 17) turno = "Tarde";
    else turno = "Noite";

    // Lógica da Mensagem
    let mensagem = `--- Resultado ---\nTurno: ${turno}\nPrioridade: ${prioridade}\n\n`;

    if (turno === "Noite") {
        mensagem += "✅ TAREFA NÃO IMPORTANTE (Horário de lazer)";
    } 
    else if (prioridade > 8 && (turno === "Manhã" || turno === "Tarde")) {
        mensagem += "🔥 TAREFA CRÍTICA/URGENTE";
    } 
    else if ((prioridade >= 7 && prioridade < 9) && (turno === "Manhã" || turno === "Tarde")) {
        mensagem += "⚠️ TAREFA IMPORTANTE";
    } 
    else {
        mensagem += "ℹ️ Tarefa de rotina";
    }

    // Saída via ALERT
    alert(mensagem);
})();