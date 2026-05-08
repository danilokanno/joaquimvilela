document.addEventListener('DOMContentLoaded', () => {
    const tabelaHead = document.getElementById('cabecalhoNotas');
    const tabelaBody = document.getElementById('corpoTabelaNotas');
    const turmaSelect = document.getElementById('turmaSelecionada');
    const tabButtons = document.querySelectorAll('.tab-btn');

    let dadosAtuais = [];
    let cabecalhos = [];
    let colunaTurmaIndex = -1;

    async function carregarCSV(arquivo) {
        tabelaHead.innerHTML = "<tr><th>Carregando...</th></tr>";
        tabelaBody.innerHTML = "";

        try {
            const resp = await fetch(arquivo);
            if (!resp.ok) throw new Error("Erro ao carregar o CSV.");

            const texto = await resp.text();
            const linhas = texto.trim().split(/\r?\n/).filter(l => l.trim());
            cabecalhos = separarLinha(linhas[0]);

            dadosAtuais = linhas.slice(1).map(linha => {
                const valores = separarLinha(linha);
                const obj = {};
                cabecalhos.forEach((c, i) => obj[c] = valores[i] ?? "");
                return obj;
            });

            colunaTurmaIndex = cabecalhos.indexOf("turma");

            atualizarCabecalho();
            popularTurmas();
            renderizarTabela(dadosAtuais);

        } catch (erro) {
            console.error(erro);
            tabelaHead.innerHTML = "<tr><th>Erro ao carregar</th></tr>";
        }
    }

    function separarLinha(linha) {
        const resultado = [];
        let atual = "";
        let dentroAspas = false;

        for (let i = 0; i < linha.length; i++) {
            const char = linha[i];

            if (char === '"') {
                dentroAspas = !dentroAspas;
            } else if (char === "," && !dentroAspas) {
                resultado.push(atual.trim());
                atual = "";
            } else {
                atual += char;
            }
        }

        resultado.push(atual.trim());
        return resultado;
    }

    function atualizarCabecalho() {
        tabelaHead.innerHTML = `
            <tr>${cabecalhos.map(h => `<th>${h}</th>`).join("")}</tr>
        `;
    }

    function popularTurmas() {
        const turmas = [...new Set(dadosAtuais.map(d => d["turma"]).filter(Boolean))].sort();

        turmaSelect.innerHTML = `<option value="">Todas</option>` +
            turmas.map(t => `<option value="${t}">${t}</option>`).join("");
    }

    function renderizarTabela(lista) {
        tabelaBody.innerHTML = lista.map(linha => `
            <tr>${cabecalhos.map(h => `<td>${linha[h] ?? ""}</td>`).join("")}</tr>
        `).join("");
    }

    turmaSelect.addEventListener("change", () => {
        const turma = turmaSelect.value;
        const filtrados = turma ? dadosAtuais.filter(d => d["turma"] === turma) : dadosAtuais;
        renderizarTabela(filtrados);
    });

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            carregarCSV(btn.dataset.csv);
        });
    });

    tabButtons[0].click();
});