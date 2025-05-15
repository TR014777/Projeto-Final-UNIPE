async function converter() {
  const valor = parseFloat(document.getElementById('valor').value);
  const moedaDe = document.getElementById('moedaDe').value
  const moedaPara = document.getElementById('moedaPara').value;
      
  if (isNaN(valor) || valor <= 0) {
    document.getElementById('resultado').innerText = "Digite um valor válido.";
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${moedaDe}`;

try {
  const resposta = await fetch(url);
  const dados = await resposta.json();
  const taxa = dados.rates[moedaPara];
  const dataDaCotacao = dados.date
  const partesData = dataDaCotacao.split('-'); 
  const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

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

  const selectMoedaDe = document.getElementById('moedaDe');
  const textoMoedaDe = selectMoedaDe.options[selectMoedaDe.selectedIndex].text;

  const selectMoedaPara = document.getElementById('moedaPara');
  const textoMoedaPara = selectMoedaPara.options[selectMoedaPara.selectedIndex].text;

  document.getElementById('resultado').innerText =
    `Conversão de: ${textoMoedaDe}\n
    Valor a converter: ${valorDe}\n
    Para: ${textoMoedaPara}\n
    Valor convertido: ${valorPara}\n
    Data da cotação utilizada: ${dataFormatada}`;
    
  } catch (erro) {
    document.getElementById('resultado').innerText = "Erro ao buscar a cotação.";
  }
}

document.getElementById('trocar').addEventListener('click', function() {
  const moedaDe = document.getElementById('moedaDe');
  const moedaPara = document.getElementById('moedaPara');
  const valorMoedaDe = moedaDe.value;
  const valorMoedaPara = moedaPara.value;
  
  moedaDe.value = valorMoedaPara;
  moedaPara.value = valorMoedaDe;
  converter()
});

converter()