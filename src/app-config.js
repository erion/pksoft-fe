export const WSRoot = 'http://localhost:3001'

export const PatientModel = {
  id: "",
  nome: "",
  agente_saude:"",
  altura: "",
  cpf: "",
  cr_paciente: "",
  genero: "",
  nascimento: "",
  observacao: "",
  peso: "",
  rg: "",
  telefone: "",
  unidade_tratamento: ""
}

export const PharmacoModel = {
  id: "",
  nome: ""
}

export const HistoryModel = {
  id: "",
  evento: "",
  atributo: "",
  valor: "",
  data: "",
  horario: "",
  pacienteId: "",
  tratamentoId: ""
}

export const TreatmentModel = {
  id: "",
  codigo_paciente: null,
  codigo_farmaco: null
}

export const UserModel = {
  id: "",
  nome: "",
  login:"",
  senha: "",
  avatar: ""
}