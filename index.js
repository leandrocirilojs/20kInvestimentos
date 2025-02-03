
        // Definição dos valores para os quadrados
        const numeroQuadrados = 200;
        const valorTotal = 20000;
        const valoresQuadrados = [];
        const container = document.getElementById("container");
        const totalInvestido = document.getElementById("total");

        // Distribuindo valores fixos para garantir a soma exata de R$ 20.000
        // Exemplo: 50 quadrados com R$ 100 e 150 quadrados com R$ 100
        for (let i = 0; i < numeroQuadrados - 1; i++) {
            valoresQuadrados.push(100);
        }
        // O último quadrado vai garantir a soma exata
        valoresQuadrados.push(100);

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
