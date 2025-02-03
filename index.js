// Definição dos valores para os quadrados
const numeroQuadrados = 200;
const valorTotal = 20000;
const valoresQuadrados = [];
const container = document.getElementById("container");
const totalInvestido = document.getElementById("total");

// Distribuição fixa de valores para garantir a soma de 20.000 reais
const distribuicaoValores = [5, 10, 15, 20, 30, 50, 100, 200, 400, 300];

// Contagem de quadrados para cada valor
const distribuicaoQuantidades = {
    5: 20,
    10: 20,
    15: 20,
    20: 20,
    30: 20,
    50: 20,
    100: 20,
    200: 20,
    400: 20,
    300: 20
};

// Gerar os valores fixos conforme a distribuição
for (let valor of distribuicaoValores) {
    for (let i = 0; i < distribuicaoQuantidades[valor]; i++) {
        valoresQuadrados.push(valor);
    }
}

// Recupera os quadrados marcados do localStorage
let quadradosMarcados = JSON.parse(localStorage.getItem("quadradosMarcados")) || [];

// Renderiza os quadrados
valoresQuadrados.forEach((valor, index) => {
    const quadrado = document.createElement("div");
    quadrado.classList.add("quadrado");
    quadrado.setAttribute("data-valor", valor);
    quadrado.textContent = `R$ ${valor}`;

    // Verifica se o quadrado já foi marcado
    if (quadradosMarcados.includes(index)) {
        quadrado.classList.add("marcado");
    }

    // Adiciona o evento de clique para marcar/desmarcar
    quadrado.addEventListener("click", function () {
        if (quadrado.classList.contains("marcado")) {
            quadrado.classList.remove("marcado");
            quadradosMarcados.splice(quadradosMarcados.indexOf(index), 1);
        } else {
            quadrado.classList.add("marcado");
            quadradosMarcados.push(index);
        }

        // Salva os quadrados marcados no localStorage
        localStorage.setItem("quadradosMarcados", JSON.stringify(quadradosMarcados));
        atualizarTotal();
    });

    container.appendChild(quadrado);
});

// Atualiza o total investido
function atualizarTotal() {
    let total = quadradosMarcados.reduce((acc, index) => acc + valoresQuadrados[index], 0);
    totalInvestido.textContent = total.toFixed(2);
}

// Atualiza o total investido inicialmente
atualizarTotal();
