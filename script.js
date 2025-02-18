// Carregar perguntas do arquivo perguntas.json
fetch('perguntas.json')
    .then(response => response.json())
    .then(perguntas => {
        // Criar perguntas no container
        criarPerguntas(perguntas);

        // Adicionar evento de clique ao botão Trocar Perguntas
        document.getElementById('trocar').addEventListener('click', () => {
            // Trocar perguntas
            trocarPerguntas(perguntas);
        });

        // Adicionar evento de clique ao botão Enviar Respostas
        document.getElementById('enviar').addEventListener('click', () => {
            // Enviar respostas
            enviarRespostas(perguntas);
        });

        // Adicionar evento de clique ao botão Refazer
        document.getElementById('refazer').addEventListener('click', () => {
            // Refazer
            refazer(perguntas);
        });
    });

// Função para criar perguntas no container
function criarPerguntas(perguntas) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    // Selecionar 10 perguntas aleatórias
    const perguntasAleatorias = perguntas.sort(() => Math.random() - 0.5).slice(0, 10);

    // Criar perguntas no container
    perguntasAleatorias.forEach((pergunta, index) => {
        const divPergunta = document.createElement('div');
        divPergunta.innerHTML = `
            <p>${pergunta.pergunta}</p>
            <input type="radio" name="pergunta${index}" value="0">${pergunta.respostas[0]}</input>
            <input type="radio" name="pergunta${index}" value="1">${pergunta.respostas[1]}</input>
            <input type="radio" name="pergunta${index}" value="2">${pergunta.respostas[2]}</input>
            <input type="radio" name="pergunta${index}" value="3">${pergunta.respostas[3]}</input>
        `;
        container.appendChild(divPergunta);
    });

    // Adicionar botões
    const divBotoes = document.createElement('div');
    divBotoes.innerHTML = `
        <button id="enviar">Enviar Respostas</button>
        <button id="refazer">Refazer</button>
        <button id="trocar">Trocar Perguntas</button>
    `;
    container.appendChild(divBotoes);
}

// Função para trocar perguntas
function trocarPerguntas(perguntas) {
    // Selecionar 10 perguntas aleatórias que não foram selecionadas anteriormente
    const perguntasAleatorias = perguntas.filter(pergunta => !document.querySelector(`input[name="pergunta${perguntas.indexOf(pergunta)}"]`)).sort(() => Math.random() - 0.5).slice(0, 10);

    // Criar perguntas no container
    criarPerguntas(perguntasAleatorias);
}

// Função para enviar respostas
function enviarRespostas(perguntas) {
    // Obter respostas selecionadas
    const respostas = [];
    perguntas.slice(0, 10).forEach((pergunta, index) => {
        const resposta = document.querySelector(`input[name="pergunta${index}"]:checked`);
        if (resposta) {
            respostas.push(resposta.value);
        } else {
            respostas.push(null);
        }
    });

    // Exibir respostas
    const divRespostas = document.createElement('div');
    divRespostas.id = 'respostas';
    divRespostas.innerHTML = `
        <h2>Respostas:</h2>
        ${respostas.map((resposta, index) => `
            <p>Pergunta ${index + 1}: ${resposta !== null ? perguntas[index].respostas[resposta] : 'Não respondida'} ${resposta !== null && resposta == perguntas[index].correta ? '(Correto)' : resposta !== null ? '(Incorreto)' : ''}</p>
        `).join('')}
    `;
    document.body.appendChild(divRespostas);
}

// Função para refazer
function refazer(perguntas) {
    // Desmarcar opções selecionadas
    perguntas.forEach((pergunta, index) => {
        const inputs = document.querySelectorAll(`input[name="pergunta${index}"]`);
        inputs.forEach(input => input.checked = false);
    });
}