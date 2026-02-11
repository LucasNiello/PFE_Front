(function validadorInterativo() {
    // 1. Entrada
    let input = prompt("Exercício 3: Cadastro\n\nDigite o nome completo:");

    // Se clicar em cancelar na entrada
    if (input === null) return;

    // 2. Detecção de "Sujeira"
    // Regex que busca qualquer coisa que NÃO seja letra ou espaço
    const regexProibidos = /[^a-zA-Z\u00C0-\u00FF\s]/;
    
    // O método .test() retorna true se encontrar números ou símbolos
    const possuiErro = regexProibidos.test(input);

    // 3. Preparar a Sugestão (Tratamento/Sanitização)
    //======================================================================================
    let sugestao = input.replace(/[^a-zA-Z\u00C0-\u00FF\s]/g, '') // Remove o lixo
                        .replace(/\s+/g, ' ')                      // Corrige espaços duplos
                        .trim()                                    // Limpa pontas
                        .toUpperCase();                            // Põe em Maiúsculo



// [ ] (Colchetes): Define um conjunto de caracteres permitidos ou proibidos.

// ^ (Circunflexo): Dentro dos colchetes, ele funciona como uma negação. Ou seja: "procure por tudo o que NÃO seja o que está nesta lista".

// a-z e A-Z: Letras minúsculas e maiúsculas do alfabeto básico (sem acentos).

// \u00C0-\u00FF: Este é um intervalo de caracteres Unicode. Ele cobre a maioria dos caracteres acentuados e especiais do latim (como á, é, í, ó, ú, ç, ñ, etc.). Sem isso, nomes como "João" virariam "Jo".

// \s: Representa espaços em branco (espaço, tabulação, quebra de linha).

// /g (Flag Global): Indica que a busca deve continuar por todo o texto, e não parar na primeira ocorrência que encontrar.



    // 4. Fluxo de Decisão
    if (possuiErro) {
        // Passo A: Avisa que está inválido
        alert("⚠️ NOME INVÁLIDO DETECTADO!\n\nEncontramos números ou caracteres especiais que não são permitidos em nomes de pessoas.");

        // Passo B: Pede confirmação (Sim/Não)
        // O confirm retorna TRUE se clicar em OK e FALSE se clicar em Cancelar
        let aceitaCorrecao = confirm(`O sistema sugere a seguinte correção:\n\nDE: "${input}"\nPARA: "${sugestao}"\n\nDeseja aceitar esta correção?`);

        if (aceitaCorrecao) {
            // Se a sugestão for vazia (ex: usuário digitou "123"), não salvamos
            if (sugestao === "") {
                alert("❌ Erro: O nome ficou vazio após a remoção dos caracteres inválidos.");
            } else {
                alert(`✅ SUCESSO!\nNome salvo na agenda: ${sugestao}`);
            }
        } else {
            alert("🚫 Operação cancelada. O nome não foi alterado nem salvo.");
        }
    } 
    else {
        // Se o nome já estava limpo (só letras), salvamos direto (apenas formatando maiúsculas)
        alert(`✅ Nome Válido! Salvo como: ${sugestao}`);
    }
})();