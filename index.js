document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.toLowerCase();

  if (path.includes("adocao.html")) {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");

    const filtrarAnimais = () => {
      const termoBusca = searchInput ? searchInput.value.toLowerCase().trim() : "";
      const filtroAtivo = document.querySelector(".filter-btn.active")?.dataset.filter || "all";

      cards.forEach((card) => {
        if (card.querySelector("h3")?.textContent.includes("Não encontrou")) return;

        const nome = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const textoCard = card.textContent.toLowerCase();
        
        const especie = card.dataset.especie || (textoCard.includes("gato") ? "gato" : "cao");
        const idade = card.dataset.idade || (textoCard.includes("filhote") || textoCard.includes("meses") ? "filhote" : "adulto");
        const castrado = card.dataset.castrado === "sim" || textoCard.includes("castrado");
        const vacinado = card.dataset.vacinado === "sim" || textoCard.includes("vacinado");

        let atendeFiltro = false;
        if (filtroAtivo === "all") atendeFiltro = true;
        else if (filtroAtivo === "cao" && especie === "cao") atendeFiltro = true;
        else if (filtroAtivo === "gato" && especie === "gato") atendeFiltro = true;
        else if (filtroAtivo === "filhote" && idade === "filhote") atendeFiltro = true;
        else if (filtroAtivo === "adulto" && idade === "adulto") atendeFiltro = true;
        else if (filtroAtivo === "castrado" && castrado) atendeFiltro = true;
        else if (filtroAtivo === "vacinado" && vacinado) atendeFiltro = true;

        const atendeBusca = nome.includes(termoBusca) || textoCard.includes(termoBusca);

        if (atendeFiltro && atendeBusca) {
          card.style.setProperty("display", "block", "important");
        } else {
          card.style.setProperty("display", "none", "important");
        }
      });
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filtrarAnimais();
      });
    });

    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        filtrarAnimais();
      });
    }
    if (searchInput) {
      searchInput.addEventListener("input", filtrarAnimais);
    }

    cards.forEach(card => {
      const btn = card.querySelector("button");
      if (btn && !card.textContent.includes("Criar Alerta")) {
        btn.addEventListener("click", () => {
          const nomePet = card.querySelector("h3").textContent;
          alert(`Obrigado pelo seu interesse! O formulário de adoção para o(a) ${nomePet} será enviado para o seu e-mail.`);
        });
      }
    });
  }

  if (path.includes("areausuario.html")) {
    const inputBusca = document.getElementById("busca");
    const rows = document.querySelectorAll("tbody tr");

    if (inputBusca) {
      inputBusca.addEventListener("input", () => {
        const termo = inputBusca.value.toLowerCase().trim();
        rows.forEach((row) => {
          const protocolo = row.querySelector("td")?.textContent.toLowerCase() || "";
          row.style.display = protocolo.includes(termo) ? "" : "none";
        });
      });
    }
  }

  if (path.includes("resgate.html")) {
    const mapLink = document.querySelector(".map-link");
    const enderecoInput = document.getElementById("endereco");
    const pontoReferencia = document.getElementById("ponto-referencia");
    const mapFrame = document.getElementById("mapFrame");

    const updateMap = () => {
      const endereco = enderecoInput?.value.trim() || "";
      const referencia = pontoReferencia?.value.trim() || "";
      const termoBusca = `${endereco} ${referencia}`.trim() || "Brasil";
      const urlEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(termoBusca)}&output=embed`;
      const urlLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(termoBusca)}`;

      if (mapFrame) {
        mapFrame.src = urlEmbed;
      }
      if (mapLink) {
        mapLink.href = urlLink;
      }
    };

    enderecoInput?.addEventListener("input", updateMap);
    pontoReferencia?.addEventListener("input", updateMap);
    updateMap();

    if (mapLink) {
      mapLink.addEventListener("click", (event) => {
        if (!enderecoInput?.value.trim() && !pontoReferencia?.value.trim()) {
          event.preventDefault();
          alert("Digite o endereço ou o ponto de referência para abrir o mapa corretamente.");
        }
      });
    }
  }

  if (path.includes("novasenha.html")) {
    const form = document.querySelector("form");
    const novaSenhaInput = document.getElementById("nova-senha");
    const confirmaSenhaInput = document.getElementById("confirma-senha");

    if (form) {
      form.addEventListener("submit", (e) => {
        const senha = novaSenhaInput.value;
        const confirma = confirmaSenhaInput.value;

        const temOitoCaracteres = senha.length >= 8;
        const temMaiuscula = /[A-Z]/.test(senha);
        const temNumero = /[0-9]/.test(senha);

        if (!temOitoCaracteres || !temMaiuscula || !temNumero) {
          e.preventDefault();
          alert("A senha não atende aos requisitos mínimos exigidos.");
          return;
        }

        if (senha !== confirma) {
          e.preventDefault();
          alert("As senhas informadas não coincidem.");
          return;
        }

        alert("Senha alterada com sucesso!");
      });
    }
  }

  const formGeral = document.querySelector("form");
  const paginasEspeciais = path.includes("adocao.html") || path.includes("areausuario.html") || path.includes("novasenha.html");
  
  if (formGeral && !paginasEspeciais) {
    formGeral.addEventListener("submit", (e) => {
      e.preventDefault();

      if (path.includes("telacadastro.html")) {
        alert("Cadastro realizado com sucesso! Seja bem-vindo à ARCA.");
        window.location.href = "telalogin.html";
      } else if (path.includes("telalogin.html")) {
        alert("Login efetuado com sucesso!");
        window.location.href = "areausuario.html";
      } else if (path.includes("denuncia.html")) {
        const protocolo = "#" + Math.floor(100000 + Math.random() * 900000);
        alert(`Denúncia enviada com sucesso de forma sigilosa!\nGuarde seu Protocolo de Acompanhamento: ${protocolo}`);
      } else if (path.includes("resgate.html")) {
        alert("Solicitação de Resgate enviada! Nossa equipe de campo foi notificada com a sua localização.");
      } else if (path.includes("castracao.html")) {
        alert("Dados do tutor salvos com sucesso! Prossiga para os dados do animal.");
      } else if (path.includes("voluntario.html")) {
        alert("Obrigado pelo seu interesse! Seu formulário de voluntariado foi recebido.");
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function(){

  const botaoConcluir = document.querySelector("#concluir");

  if(Concluir){
    botaoConcluir.addEventListener("click", function(event){
      event.preventDefault();
      alert("Castração agendada com sucesso!");
    });
  }

});
document.addEventListener("DOMContentLoaded", function(){ const botaoProximo = document.querySelector("#proximo"); if(botaoProximo){ botaoProximo.addEventListener("click", function(event){ event.preventDefault(); alert("Indo para o próximo passo..."); }); } });

