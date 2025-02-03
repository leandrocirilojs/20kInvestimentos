const numeroQuadrados = 200;
const valoresPossiveis = [5, 10, 20, 50, 100, 200, 300, 400];
const valorTotal = 20000;
const container = document.getElementById("container");
const totalInvestido = document.getElementById("total");

// Função para gerar valores fixos que somam exatamente 20.000
function gerarValoresFixos() {
    let valores = [];
    let soma = 0;

    // Gera valores aleatórios até atingir o total desejado
    while (valores.length < numeroQuadrados - 1) {
        let valor = valoresPossiveis[Math.floor(Math.random() * valoresPossiveis.length)];
        if (soma + valor > valorTotal) continue; // Ignora valores que excedem o total
        valores.push(valor);
        soma += valor;
    }

    // Adiciona o último valor para completar exatamente 20.000
    valores.push(valorTotal - soma);
    return valores;
}

// Verifica se os valores já existem no localStorage
let valoresQuadrados = JSON.parse(localStorage.getItem("valoresQuadrados"));

// Se não existirem ou estiverem incorretos, gera novos valores e salva no localStorage
if (!valoresQuadrados || valoresQuadrados.length !== numeroQuadrados || valoresQuadrados.reduce((acc, val) => acc + val, 0) !== valorTotal) {
    valoresQuadrados = gerarValoresFixos();
    localStorage.setItem("valoresQuadrados", JSON.stringify(valoresQuadrados));
}

// Recupera os quadrados marcados do localStorage
const quadradosMarcados = JSON.parse(localStorage.getItem("quadradosMarcados")) || [];

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

    // Adiciona o evento de clique
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

atualizarTotal();
