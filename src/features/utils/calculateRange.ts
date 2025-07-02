export type FaixaProduto = {
  dataMinima: Date | null
  dataMaxima: Date | null
  faixa: string
}


const MILISSEGUNDOS_POR_DIA = 1000 * 60 * 60 * 24
const PERCENTUAL_PADRAO = 5

const criarFaixaBasica = (dataFabricacao: Date, faixa: string): FaixaProduto => ({
  dataMinima: new Date(dataFabricacao),
  dataMaxima: new Date(dataFabricacao),
  faixa
})

const calcularDiasRestantes = (dataVencimento: Date): number => {
  const hoje = new Date()
  return Math.ceil((dataVencimento.getTime() - hoje.getTime()) / MILISSEGUNDOS_POR_DIA)
}

const calcularDataVencimento = (dataFabricacao: Date, shelfLife: number): Date => {
  const dataVencimento = new Date(dataFabricacao)
  dataVencimento.setDate(dataVencimento.getDate() + shelfLife)
  return dataVencimento
}

const calcularFaixaAvancada = (
  dataFabricacao: Date,
  percentualVidaUtil: number,
  percentualMinimo: number,
  percentualMaximo: number
): FaixaProduto => {
  const diasAdicionais = Math.floor((percentualVidaUtil * (percentualMaximo/100)))
  const reduzirDias = Math.floor((percentualVidaUtil * (percentualMinimo/100)))
  
  const dataMaxima = new Date(dataFabricacao)
  dataMaxima.setDate(dataMaxima.getDate() + diasAdicionais)
  
  const dataMinima = new Date(dataFabricacao)
  dataMinima.setDate(dataMinima.getDate() - reduzirDias)
  
  return {
    dataMinima,
    dataMaxima,
    faixa: "Verde"
  }
}

export const calcularFaixaProduto = (
  dataFabricacao: Date,
  shelfLife: number,
  vermelhaFaixa: number,
  laranjaFaixa: number,
  amareloFaixa: number,
  verdeFaixa: number,
  percentualMinimo: string,
  percentualMaximo: string
): FaixaProduto => {
  // Early return para dados inválidos
  if (!dataFabricacao || !shelfLife) {
    return {
      dataMinima: null,
      dataMaxima: null,
      faixa: "Sem informação"
    }
  }

  const dataVencimento = calcularDataVencimento(dataFabricacao, shelfLife)
  const diasRestantes = calcularDiasRestantes(dataVencimento)
  const percentualVidaUtil = (diasRestantes / shelfLife) * 100

  const percentMin = parseFloat(percentualMinimo) || PERCENTUAL_PADRAO
  const percentMax = parseFloat(percentualMaximo) || PERCENTUAL_PADRAO

  // Determinar faixa baseada no percentual de vida útil
  if (percentualVidaUtil <= vermelhaFaixa) {
    return criarFaixaBasica(dataFabricacao, "Vermelha")
  }
  
  if (percentualVidaUtil <= laranjaFaixa) {
    return criarFaixaBasica(dataFabricacao, "Laranja")
  }
  
  if (percentualVidaUtil <= amareloFaixa) {
    return criarFaixaBasica(dataFabricacao, "Amarela")
  }
  
  return calcularFaixaAvancada(dataFabricacao, shelfLife, percentMin, percentMax)
}