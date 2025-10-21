// Inicializa o mapa
const map = L.map('map', {
  center: [-30.877, -55.536],
  zoom: 13,
  minZoom: 12,
  maxZoom: 17,
  maxBounds: [[-30.95, -55.65], [-30.80, -55.40]],
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Dados simulados (enquanto não há backend)
const placas = [
  {
    titulo: "Placa caída - Av. Tamandaré",
    descricao: "Placa de Pare caída próximo ao cruzamento.",
    lat: -30.883,
    lng: -55.541,
    prazo: "3 dias",
    historico: "Último reparo há 4 meses",
    prioridade: "Alta"
  },
  {
    titulo: "Placa desgastada - BR-293",
    descricao: "Letreiro ilegível, precisa substituição.",
    lat: -30.874,
    lng: -55.520,
    prazo: "1 semana",
    historico: "Troca prevista em 2025",
    prioridade: "Média"
  },
  {
    titulo: "Placa suja - Bairro Prado",
    descricao: "Placa coberta de barro, precisa limpeza.",
    lat: -30.870,
    lng: -55.550,
    prazo: "2 semanas",
    historico: "Limpeza feita há 1 ano",
    prioridade: "Baixa"
  }
];

// Função pra exibir marcadores no mapa
placas.forEach(p => {
  const color =
    p.prioridade === "Alta" ? "red" :
    p.prioridade === "Média" ? "orange" : "green";

  const marker = L.circleMarker([p.lat, p.lng], {
    radius: 8,
    color,
    fillColor: color,
    fillOpacity: 0.7
  }).addTo(map);

  marker.bindPopup(`
    <b>${p.titulo}</b><br>
    ${p.descricao}<br>
    <b>Prazo:</b> ${p.prazo}<br>
    <b>Histórico:</b> ${p.historico}<br>
    <b>Prioridade:</b> ${p.prioridade}
  `);
});

// Envio do formulário (simulado)
document.getElementById('form-cadastro').addEventListener('submit', (e) => {
  e.preventDefault();

  const titulo = e.target.titulo.value;
  const descricao = e.target.descricao.value;

  alert(`O problema foi registrado com sucesso!\n\nTítulo: ${titulo}\nDescrição: ${descricao}`);
  e.target.reset();
});

function copiarTexto() {
  const textoParaCopiar = '00020126550014BR.GOV.BCB.PIX0133klebersonduartesantos39@gmail.com5204000053039865802BR5923Kleberson Duarte Santos6009SAO PAULO621405104vTWLEdaIl63049857';

  navigator.clipboard.writeText(textoParaCopiar)
    .then(() => {
      const botao = document.getElementById("botaoCopiar");
      botao.textContent = "Copiado";
      setTimeout(() => botao.textContent = "Copiar", 1000);
    })
    .catch(err => console.error('Erro ao copiar texto: ', err));
}