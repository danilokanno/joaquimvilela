// ===============================
// LISTAS DE FOTOS POR SEÇÃO
// ===============================

const aprovacoes = [
  { src: "imagens/fotos/aprovacoes/liviatoledo.jpg", legenda: "Lívia Toledo - Aprovada na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/yasminsiqueira.jpg", legenda: "Yasmin Siqueira - Aprovada na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/joaomiguel.jpg", legenda: "João Miguel - Aprovado na ETEC 2026" },
  { src: "imagens/fotos/aprovacoes/isabelatoledo.jpg", legenda: "Isabela Toledo - Aprovada na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/abelrafael.jpg", legenda: "Abel Rafael - Aprovado na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/abelliviaisabela.jpg", legenda: "Abel, Isabela e Lívia - Aprovados na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/annalivia.jpg", legenda: "Anna Lívia - Aprovada na ETEC 2026" },
  { src: "imagens/fotos/aprovacoes/mariateresa.png", legenda: "Maria Teresa - Aprovada na ETEC 2026" },
  { src: "imagens/fotos/aprovacoes/anthony.jpg", legenda: "Anthony - Aprovado na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/analaura.jpg", legenda: "Ana Laura - Aprovada na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/analauramariana.jpg", legenda: "Ana Laura, Ana Carolina e Mariana - Aprovadas na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/vinicius.png", legenda: "Vinicius Domiciano - Aprovado no COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/anacarolina.jpg", legenda: "Ana Carolina - Aprovada na ETEC 2026" },
  { src: "imagens/fotos/aprovacoes/pedroferreira.jpg", legenda: "Pedro Ferreira e Pedro Novaes - Aprovados na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/pedrohenrique.jpg", legenda: "Pedro Henrique - Aprovado na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/pedronovaes.jpg", legenda: "Pedro Novaes e Anthony - Aprovados na  ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/yasminsiqueira2.jpg", legenda: "Yasmin Siqueira - Aprovada na ETEC e COTEC 2026" },
  { src: "imagens/fotos/aprovacoes/kayoadriel.jpg", legenda: "Kayo Adriel - Aprovado na ETEC, COTEC e COTEL 2026" },
  { src: "imagens/fotos/aprovacoes/kayopedro.jpg", legenda: "Kayo e Pedro Henrique - Aprovado na ETEC, COTEC e COTEL 2026" },
  { src: "imagens/fotos/aprovacoes/miguelarlindo.png", legenda: "Miguel Arlindo - Aprovado na ETEC 2026" },
  { src: "imagens/fotos/aprovacoes/mylenarabelo.png", legenda: "Mylena Rabelo - Aprovada na ETEC 2026" },
  { src: "imagens/fotos/aprovacoes/joaopedro.jpg", legenda: "João Pedro - Aprovado na ETEC 2026" }

];

const trotes = [
  { src: "imagens/fotos/2025/9afinal.jpg", legenda: "Último dia 9ºA 2025" },
  { src: "imagens/fotos/2025/paraninfo.jpg", legenda: "Paraninfo aceito para o 9ºA 2025" },
  { src: "imagens/fotos/2025/danilovers.jpg", legenda: "Danilovers" },
  { src: "imagens/fotos/2025/2025paulo.jpg", legenda: "Haloween" },
  { src: "imagens/fotos/2025/2025haloween1.jpg", legenda: "Halloween" },
  { src: "imagens/fotos/2025/2025haloween2.jpg", legenda: "Halloween" },
  { src: "imagens/fotos/2025/2025haloween3.jpg", legenda: "Halloween" },
  { src: "imagens/fotos/2025/2025haloween4.jpg", legenda: "Halloween" },
  { src: "imagens/fotos/2025/2025haloween5.jpg", legenda: "Halloween" },
  { src: "imagens/fotos/2025/2025haloween6.jpg", legenda: "Halloween" },
  { src: "imagens/fotos/2025/2025gincana1.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana2.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana3.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana4.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana5.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana6.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana7.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana8.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana9.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana10.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025gincana11.jpg", legenda: "Dia do Estudante" },
  { src: "imagens/fotos/2025/2025cafona.jpg", legenda: "" },
  { src: "imagens/fotos/2025/2025visto.jpg", legenda: "" }
];


// ===============================
// FUNÇÃO PARA RENDERIZAR CADA GALERIA
// ===============================

function renderGaleria(containerId, lista) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  lista.forEach((foto) => {
    const card = document.createElement("div");
    card.className = "card foto-card radius shadow";

    const img = document.createElement("img");
    img.src = foto.src;
    img.alt = foto.legenda;
    img.className = "foto-img"; // ESSA CLASSE É O GATILHO DO CLIQUE

    const legenda = document.createElement("p");
    legenda.className = "foto-legenda";
    legenda.textContent = foto.legenda;

    card.appendChild(img);
    card.appendChild(legenda);
    container.appendChild(card);
  });
}


// ===============================
// LIGHTBOX
// ===============================

const lightbox      = document.getElementById("lightbox");
const lightboxImg   = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".close-lightbox");

function abrirLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function fecharLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}


// ===============================
// EVENTOS DO LIGHTBOX
// ===============================

// Fechar ao clicar na sombra de fundo
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    fecharLightbox();
  }
});

// Fechar ao clicar no X
lightboxClose.addEventListener("click", fecharLightbox);

// Fechar ao pressionar ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharLightbox();
});


// ===============================
// EVENTO DE CLIQUE NAS MINIATURAS
// ===============================

// Delegação de eventos — funciona mesmo para elementos criados dinamicamente
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("foto-img")) {
    abrirLightbox(e.target.src);
  }
});


// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  renderGaleria("aprovacoes", aprovacoes);
  renderGaleria("trotes", trotes);
});