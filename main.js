const nossaTaxaDebito = 1.9
const nossaTaxaCredito = 7.6

// Pegar id dos container
let containerPrincipal = document.querySelector('#container-principal') // Default: Display: flex;
let containerSecundario = document.querySelector('#container-secundario') // Default: Display: none;

// ### - Pegar os campos que vão ser alterados no gráfico.

// Valor total - Bar e text
let valorTotalBar = document.querySelector('#valor-total-bar')
let valorTotalText = document.querySelector('#valor-total-text')
let valorTotalBarAnother = document.querySelector('#valor-total-bar-another')
let valorTotalTextAnother = document.querySelector('#valor-total-text-another')

// Parcelas - Bar e text
let parcelaBar = document.querySelector('#parcela-bar')
let parcelaText = document.querySelector('#parcela-text')
let parcelaBarAnother = document.querySelector('#parcela-bar-another')
let parcelaTextAnother = document.querySelector('#parcela-text-another')

// Taxa mensal - Bar e text
let taxaMensalBar = document.querySelector('#taxa-mensal-bar')
let taxaMensalText = document.querySelector('#taxa-mensal-text')
let taxaMensalBarAnother = document.querySelector('#taxa-mensal-bar-another')
let taxaMensalTextAnother = document.querySelector('#taxa-mensal-text-another')

// Taxa total - Bar e text
let taxaTotalBar = document.querySelector('#taxa-total-bar')
let taxaTotalText = document.querySelector('#taxa-total-text')
let taxaTotalBarAnother = document.querySelector('#taxa-total-bar-another')
let taxaTotalTextAnother = document.querySelector('#taxa-total-text-another')

// elementGraphs
let valorTotal = [valorTotalText, valorTotalBar]
let valorTotalAnother = [valorTotalTextAnother, valorTotalBarAnother]

let parcela = [parcelaText, parcelaBar]
let parcelaAnother = [parcelaTextAnother, parcelaBarAnother]

let taxaMensal = [taxaMensalText, taxaMensalBar]
let taxaMensalAnother = [taxaMensalTextAnother, taxaMensalBarAnother]

let taxaTotal = [taxaTotalText, taxaTotalBar]
let taxaTotalAnother = [taxaTotalTextAnother, taxaTotalBarAnother]

// ### Functions

function CalcularTaxas(valor, taxa, parcelas) {
  let parcelaSemTaxa = valor / parcelas
  let taxaMensal = parcelaSemTaxa * (taxa / 100)
  let taxaTotal = taxaMensal * parcelas
  let parcelaComTaxa = parcelaSemTaxa + taxaMensal
  let valorTotal = parcelaComTaxa * parcelas

  let valoresCalculados = {
    valorTotal: `R$ ${valorTotal.toFixed(2)}`,
    valorParcela: `R$ ${parcelaComTaxa.toFixed(2)}`,
    taxaMensal: `R$ ${taxaMensal.toFixed(2)}`,
    taxaTotal: `R$ ${taxaTotal.toFixed(2)}`
  }
  return valoresCalculados
}

function Simular() {
  // Pegar todos os inputs
  let valorTotalInput = document.querySelector('#valor-total')
  let parcelasInput = document.querySelector('#n-parcelas')
  let tipoPagamento = document.querySelector('#tipo-pagamento')

  let taxaPagamento = 0
  if (tipoPagamento.value == 'credito') {
    taxaPagamento = nossaTaxaCredito
  } else if (tipoPagamento.value == 'debito') {
    taxaPagamento = nossaTaxaDebito
  }

  let valor = valorTotalInput.value
  let parcelas = parcelasInput.value
  let taxa = taxaPagamento

  let valores = CalcularTaxas(valor, taxa, parcelas)

  valorTotalText.innerText = valores['valorTotal']
  parcelaText.innerText = valores['valorParcela']
  taxaMensalText.innerText = valores['taxaMensal']
  taxaTotalText.innerText = valores['taxaTotal']

  let compararTaxa = checkBoxComparar.checked

  if (compararTaxa) {
    let compararTaxaField = document.querySelector('#comparar-taxa-field')
    let taxaAnother = compararTaxaField.value

    console.log(typeof compararTaxaField.value)

    taxaAnother = taxaAnother.replace(',', '.')

    valoresAnother = CalcularTaxas(valor, taxaAnother, parcelas)

    valorTotalTextAnother.innerText = valoresAnother['valorTotal']
    parcelaTextAnother.innerText = valoresAnother['valorParcela']
    taxaMensalTextAnother.innerText = valoresAnother['taxaMensal']
    taxaTotalTextAnother.innerText = valoresAnother['taxaTotal']

    valorTotalBarAnother.classList.remove('disable')
    parcelaBarAnother.classList.remove('disable')
    taxaMensalBarAnother.classList.remove('disable')
    taxaTotalBarAnother.classList.remove('disable')

    // calcular e mudar o tamanho da barra menor.
    mudarTamanhoBarraMenor(valorTotal, valorTotalAnother)
    mudarTamanhoBarraMenor(parcela, parcelaAnother)
    mudarTamanhoBarraMenor(taxaMensal, taxaMensalAnother)
    mudarTamanhoBarraMenor(taxaTotal, taxaTotalAnother)
  } else {
    console.log('escolheu não comparar')
  }

  // Mudar containers
  containerPrincipal.classList.toggle('container--disable')
  containerSecundario.classList.toggle('container--disable')

}

function mudarTamanhoBarraMenor(elementGraph, elementGraphAnother) {
  let firstValor = elementGraph[0].textContent.replace('R$ ', '')
  let firstBar = elementGraph[1]

  let secondValor = elementGraphAnother[0].textContent.replace('R$ ', '')
  let secondBar = elementGraphAnother[1]

  let barWidth = 0

  // fómula: tamanho da barra menor =  valor menor * 100 / valor maior

  if (firstValor > secondValor) {
    barWidth = (secondValor * 100) / firstValor
    secondBar.style.width = `${barWidth.toFixed(2) - 10}%`
  } else if (secondValor > firstValor) {
    barWidth = (firstValor * 100) / secondValor
    firstBar.style.width = `${barWidth.toFixed(2) - 10}%`
  } else {
    console.log('as barras tem o mesmo tamanho')
  }

  return
}

function CompararChecked() {
  compararTaxaContainer.classList.toggle('disable')

}

function SimularNovamente() {
  containerPrincipal.classList.toggle('container--disable')
  containerSecundario.classList.toggle('container--disable')

  valorTotalBarAnother.classList.add('disable')
  parcelaBarAnother.classList.add('disable')
  taxaMensalBarAnother.classList.add('disable')
  taxaTotalBarAnother.classList.add('disable')
}

// ### Buttons

let compararTaxaContainer = document.querySelector('#comparar-taxa-container')
let checkBoxComparar = document.querySelector('#comparar-check')
checkBoxComparar.addEventListener('click', CompararChecked)

let btnSimular = document.querySelector('#btn-simular')
btnSimular.addEventListener('click', Simular)

let btnSimularNovamente = document.querySelector('#btn-simular-novamente')
btnSimularNovamente.addEventListener('click', SimularNovamente)


if (checkBoxComparar.checked){
  compararTaxaContainer.classList.remove('disable')
} else {
  compararTaxaContainer.classList.add('disable')
}