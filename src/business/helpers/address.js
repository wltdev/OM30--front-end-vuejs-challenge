export const getAddresByCEP = async (zipcode) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
    const address = await response.json()

    if (address.erro) {
      return {
        error: true
      }
    }

    return {
      zipcode,
      city: address.localidade,
      street: address.logradouro,
      neighborhood: address.bairro,
      state: address.uf
    }
  } catch (e) {
    return {
      error: true
    }
  }
}
