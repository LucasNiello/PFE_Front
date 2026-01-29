(function calcularDiasParaEvento() {
    // 1. Constantes Matemáticas (Boas Práticas: Evitar "números mágicos" soltos no código)
    // 1000ms * 60s * 60m * 24h = Total de milissegundos em 1 dia
    const MS_POR_DIA = 1000 * 60 * 60 * 24; 

    // 2. Obter a Data do Evento
    // O padrão internacional de data é AAAA-MM-DD (Ano-Mês-Dia)
    let inputData = prompt("📅 AGENDA DE EVENTOS\n\nDigite a data do compromisso (no formato AAAA-MM-DD):\nExemplo: 2024-12-25");

    if (inputData === null) return; // Se cancelar

    // 3. Criação dos Objetos de Data
    let dataEvento = new Date(inputData);
    let dataHoje = new Date();

    // Validação Profissional: Verifica se a data digitada é válida
    // O comando isNaN verifica se o resultado "Não é um Número" (Not a Number)
    if (isNaN(dataEvento.getTime())) {
        alert("❌ Erro: Data inválida! Use o formato AAAA-MM-DD (Ex: 2025-01-30).");
        return;
    }

    // --- TRUQUE PROFISSIONAL ---
    // Para comparar apenas os DIAS, zeramos as horas.
    // Assim comparamos Meia-noite de hoje com Meia-noite do evento.
    dataEvento.setHours(0, 0, 0, 0);
    dataHoje.setHours(0, 0, 0, 0);

    // 4. O Cálculo Matemático
    // Subtrair datas em JS resulta na diferença em MILISSEGUNDOS
    let diferencaEmMs = dataEvento - dataHoje;

    // Convertendo ms para dias e arredondando para cima
    // Math.ceil garante que se faltarem 1.1 dias, ele diga "2 dias" (pois o dia 1 já acabou)
    let diasRestantes = Math.ceil(diferencaEmMs / MS_POR_DIA);

    // 5. Exibição Inteligente
    if (diasRestantes < 0) {
        alert(`⚠️ O evento já passou faz ${Math.abs(diasRestantes)} dias.`);
    } else if (diasRestantes === 0) {
        alert("🚨 É HOJE! Corra para o seu compromisso.");
    } else {
        alert(`⏳ CONTAGEM REGRESSIVA\n\nFaltam ${diasRestantes} dias para o seu compromisso!`);
    }
})();