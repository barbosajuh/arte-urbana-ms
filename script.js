// Banco de dados dos artistas e manifestações de MS com os nomes exatos da pasta img/
const listaArtistas = [
    {
        id: 1,
        nome: "Cena Urbana de Nova Andradina",
        cidade: "Nova Andradina - MS",
        regiao: "nova-andradina",
        resumo: "Cultura do skate, grafite e intervenções visuais em espaços urbanos de Nova Andradina.",
        descricao: "Registros da relação entre o grafite e a ocupação dos espaços urbanos em Nova Andradina, dialogando com a juventude, o skate e as manifestações visuais nas rampas e muros da cidade.",
        imagens: [
            "img/nova-andradina-1.jpg.jpeg",
            "img/nova-andradina-2.jpg.jpeg",
            "img/nova-andradina-3.jpeg"
        ],
        fonte: "Acervo fotográfico do projeto • IFMS Campus Nova Andradina (2026)"
    },
    {
        id: 2,
        nome: "Marcelo 'Big' (Circuito Urbano)",
        cidade: "Dourados - MS",
        regiao: "dourados",
        resumo: "Muralismo comunitário e pintura ao vivo em espaços escolares e do interior.",
        descricao: "Registro de pintura de mural em parede externa com uso de escada, cores vibrantes, silhueta urbana e elementos de grafite realizados pelo artista.",
        imagens: [
            "img/marcelo-big.png"
        ],
        fonte: "Registro fotográfico enviado pelo grupo • Circuito Urbano / Dourados - MS"
    },
    {
        id: 3,
        nome: "Marilena Grolli & Fabrício Martins",
        cidade: "Bodoquena - MS",
        regiao: "bodoquena",
        resumo: "Murais e pinturas temáticas que dialogam com a fauna e a identidade sul-mato-grossense.",
        descricao: "Pintura de onça em portão metálico com destaque para os olhos verdes e cores marcantes, integrando arte visual e identidade regional ao espaço público.",
        imagens: [
            "img/victor-macaulin.jpg"
        ],
        fonte: "Registro fotográfico enviado pelo grupo • Arte de Rua em MS"
    },
    {
        id: 4,
        nome: "Victor Macaulin",
        cidade: "Campo Grande - MS",
        regiao: "campo-grande",
        resumo: "Artista visual, grafiteiro e pesquisador da arte pública em Mato Grosso do Sul.",
        descricao: "Artista visual, grafiteiro e pesquisador da arte pública em Mato Grosso do Sul, atuando em grandes painéis murais e na reflexão acadêmica sobre a presença da arte urbana na cidade.",
        imagens: [
            "img/imagens (3).jpeg"
        ],
        fonte: "Registro fotográfico enviado pelo grupo • Arte Pública em MS"
    }
];

const imagemPadraoFallback = "https://images.unsplash.com/photo-1561059488-916d69792237?auto=format&fit=crop&w=800&q=80";

const gridArtistas = document.getElementById("grid-artistas");
const botoesFiltro = document.querySelectorAll(".btn-filtro");

// Elementos do Modal
const modal = document.getElementById("modal-artista");
const fecharModal = document.getElementById("fechar-modal");
const modalImg = document.getElementById("modal-img");
const modalCidade = document.getElementById("modal-cidade");
const modalNome = document.getElementById("modal-nome");
const modalThumbs = document.getElementById("modal-thumbs");
const modalDescricao = document.getElementById("modal-descricao");
const modalFonte = document.getElementById("modal-fonte");

function aplicarTratamentoImagem(elementoImg) {
    elementoImg.addEventListener("error", function () {
        if (elementoImg.src !== imagemPadraoFallback) {
            elementoImg.src = imagemPadraoFallback;
        }
    });
}

function carregarArtistas(filtroRegiao) {
    if (!gridArtistas) {
        return;
    }

    gridArtistas.innerHTML = "";

    for (let i = 0; i < listaArtistas.length; i++) {
        const artista = listaArtistas[i];

        if (filtroRegiao === "todos" || artista.regiao === filtroRegiao) {
            const card = document.createElement("div");
            card.classList.add("card-artista");

            const imgCard = document.createElement("img");
            imgCard.src = artista.imagens[0];
            imgCard.alt = artista.nome;
            aplicarTratamentoImagem(imgCard);

            const corpoCard = document.createElement("div");
            corpoCard.classList.add("card-corpo");

            const topoCard = document.createElement("div");

            const badge = document.createElement("span");
            badge.classList.add("badge");
            badge.textContent = artista.cidade;

            const titulo = document.createElement("h4");
            titulo.textContent = artista.nome;

            const resumo = document.createElement("p");
            resumo.textContent = artista.resumo;

            topoCard.appendChild(badge);
            topoCard.appendChild(titulo);
            topoCard.appendChild(resumo);

            const botaoDetalhes = document.createElement("button");
            botaoDetalhes.classList.add("btn-detalhes");
            botaoDetalhes.type = "button";
            botaoDetalhes.textContent = "Ver Detalhes";

            botaoDetalhes.addEventListener("click", function () {
                abrirDetalhes(artista.id);
            });

            corpoCard.appendChild(topoCard);
            corpoCard.appendChild(botaoDetalhes);

            card.appendChild(imgCard);
            card.appendChild(corpoCard);

            gridArtistas.appendChild(card);
        }
    }
}

function selecionarFotoModal(caminhoImagem, miniaturaClicada) {
    modalImg.src = caminhoImagem;
    aplicarTratamentoImagem(modalImg);

    const todasMiniaturas = document.querySelectorAll(".modal-thumb");
    for (let i = 0; i < todasMiniaturas.length; i++) {
        todasMiniaturas[i].classList.remove("ativa");
    }

    miniaturaClicada.classList.add("ativa");
}

function abrirDetalhes(idArtista) {
    for (let i = 0; i < listaArtistas.length; i++) {
        if (listaArtistas[i].id === idArtista) {
            const escolhido = listaArtistas[i];

            modalImg.src = escolhido.imagens[0];
            modalImg.alt = escolhido.nome;
            aplicarTratamentoImagem(modalImg);

            modalCidade.textContent = escolhido.cidade;
            modalNome.textContent = escolhido.nome;
            modalDescricao.textContent = escolhido.descricao;
            modalFonte.textContent = escolhido.fonte;

            modalThumbs.innerHTML = "";

            if (escolhido.imagens.length > 1) {
                for (let j = 0; j < escolhido.imagens.length; j++) {
                    const thumb = document.createElement("img");
                    thumb.src = escolhido.imagens[j];
                    thumb.alt = escolhido.nome + " - foto " + (j + 1);
                    thumb.classList.add("modal-thumb");
                    aplicarTratamentoImagem(thumb);

                    if (j === 0) {
                        thumb.classList.add("ativa");
                    }

                    thumb.addEventListener("click", function () {
                        selecionarFotoModal(escolhido.imagens[j], thumb);
                    });

                    modalThumbs.appendChild(thumb);
                }
            }

            modal.style.display = "flex";
        }
    }
}

for (let i = 0; i < botoesFiltro.length; i++) {
    botoesFiltro[i].addEventListener("click", function () {
        for (let j = 0; j < botoesFiltro.length; j++) {
            botoesFiltro[j].classList.remove("ativo");
        }
        this.classList.add("ativo");

        const regiaoSelecionada = this.getAttribute("data-regiao");
        carregarArtistas(regiaoSelecionada);
    });
}

if (fecharModal) {
    fecharModal.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

window.addEventListener("click", function (evento) {
    if (evento.target === modal) {
        modal.style.display = "none";
    }
});

carregarArtistas("todos");