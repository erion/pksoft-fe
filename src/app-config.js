import {red500, amber500, lightGreenA400 } from 'material-ui/styles/colors'

export const WSRoot = 'http://localhost:3001'

export const messageType = {
  mError: red500,
  mSuccess: lightGreenA400,
  mInfo: amber500
}

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