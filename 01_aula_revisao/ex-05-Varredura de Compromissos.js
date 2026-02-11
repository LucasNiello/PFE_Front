(function varreduraDeAgenda() {
    // 1. O Array (A Lista de Dados)
    const agendaHorarios = [8, 12, 25, 15, -2, 20];

    // Variáveis de Controle
    let contagemValidos = 0; // Desafio Extra: Contador
    let relatorioFinal = "--- RELATÓRIO DE VARREDURA ---\n\n"; // Acumulador de texto

    // 2. Estrutura de Repetição (Loop)
    // Lê-se: "Para cada 'hora' DA 'agendaHorarios'..."
    for (let hora of agendaHorarios) {
        
        // 3. Lógica de Decisão (Filtro)
        if (hora >= 0 && hora < 24) { // assim fica melhor que <= 23
            // Horário Válido
            relatorioFinal += `✅ [${hora}h]: Compromisso Agendado.\n`;
            contagemValidos++; // Soma +1 na contagem (Desafio Extra)
        } else {
            // Horário Inválido
            relatorioFinal += `❌ [${hora}h]: Atenção! Horário inválido.\n`;
        }
    }

    // Adicionando o rodapé com a contagem total
    relatorioFinal += `\n------------------------------\n`;
    relatorioFinal += `Total de horários válidos: ${contagemValidos}`;

    // Exibição única
    alert(relatorioFinal);
})();