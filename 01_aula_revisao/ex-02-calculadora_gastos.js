(function iniciarCalculadora() {
    alert("Exercício 2: Calculadora Financeira\nVamos calcular seu saldo. Clique em OK para começar.");

    // Entradas
    let salario = parseFloat(prompt("Digite seu SALÁRIO (R$):"));
    let aluguel = parseFloat(prompt("Valor do ALUGUEL (R$):"));
    let alimentacao = parseFloat(prompt("Gasto com ALIMENTAÇÃO (R$):"));
    let lazer = parseFloat(prompt("Gasto com LAZER (R$):"));

    // Validação básica para garantir que números foram digitados
    if (isNaN(salario) || isNaN(aluguel) || isNaN(alimentacao) || isNaN(lazer)) {
        alert("❌ Erro: Por favor, digite apenas números válidos (use ponto para centavos).");
        return;
    }

    // Processamento
    let totalDespesas = aluguel + alimentacao + lazer;
    let saldo = salario - totalDespesas;

    // Montagem da mensagem de saída
    let relatorio = "--- Resumo Financeiro ---\n";
    relatorio += `Salário: R$ ${salario.toFixed(2)}\n`;
    relatorio += `Total Despesas: R$ ${totalDespesas.toFixed(2)}\n`;
    relatorio += `Saldo Final: R$ ${saldo.toFixed(2)}\n\n`;

    // Lógica de Decisão
    if (saldo > 0) {
        relatorio += "✅ RESULTADO: Saldo Positivo!";
    } else if (saldo === 0) {
        relatorio += "⚠️ RESULTADO: No Limite (Zero).";
    } else {
        relatorio += "🚨 RESULTADO: Saldo Negativo!";
    }

    // Saída
    alert(relatorio);
})();