/* eslint-disable no-unused-vars */
export const validCNS = (value) => {
  const cns = value.replace(/\s+/g, '')

  console.log(cns)

  if (cns.length != 15) {
    return false
  }

  const definitivo = /[1-2][0-9]{10}00[0-1][0-9]/ // começam com 1 ou 2
  const provisorio = /[7-9][0-9]{14}/ // começam com 7,8 ou 9
  if (!definitivo.test(cns) && !provisorio.test(cns)) {
    return false
  }

  let soma = 0
  for (let i = 0; i < cns.length; i++) {
    soma += parseInt(cns[i]) * (15 - i)
  }

  return soma % 11 == 0
}
