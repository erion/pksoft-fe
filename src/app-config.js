import {red500, amber500, lightGreen500 } from 'material-ui/styles/colors'

export const WSRoot = 'http://ceted.feevale.br:8100'

export const messageType = {
  mError: red500,
  mSuccess: lightGreen500,
  mInfo: amber500
}

export const PatientModel = {
  cod_paciente: "",
  nome_paciente: "",
  agente_saude:"",
  altura_paciente: "",
  cpf_paciente: "",
  cr_paciente: "",
  genero_paciente: "",
  nascimento_paciente: "",
  observacao_paciente: "",
  peso_paciente: "",
  rg_paciente: "",
  telefone_paciente: "",
  unid_int_paciente: ""
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