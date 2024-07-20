export interface Registry
 {
  id?: number
  username: string
  email: string
  password: string
  cpf: string
  birthday: Date
  phone: string
  cep: string
  state: string
  city: string
  district: string
  address: string
  addressNumber: number
 }

export interface API {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}
