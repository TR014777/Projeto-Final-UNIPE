async function converter() {
    const valor = parseFloat(document.getElementById('valor').value);
    const moedaDe = document.getElementById('moedaDe').value
    const moedaPara = document.getElementById('moedaPara').value;
      
    if (isNaN(valor) || valor < 0) {
      document.getElementById('resultado').innerText = "Digite um valor válido.";
      return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${moedaDe}`;

    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      const taxa = dados.rates[moedaPara];
      const valorDe = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: `${moedaDe}`,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      }).format(valor);
      const valorPara = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: `${moedaPara}`,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      }).format(valor * taxa);

      document.getElementById('resultado').innerText =
        `${valorDe} = ${valorPara}`;
    } catch (erro) {
      document.getElementById('resultado').innerText = "Erro ao buscar a cotação.";
    }
  }