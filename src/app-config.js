import {red500, amber500, lightGreen500 } from 'material-ui/styles/colors'

//export const WSRoot = 'http://ceted.feevale.br:8100'
export const WSRoot = 'http://localhost:8000'

//API ENDPOINTS
export const ENDPOINT_LIST_PATIENTS = WSRoot + '/tabela_pacientes';
export const ENDPOINT_NEW_PATIENTS = WSRoot + '/novo_paciente';
export const ENDPOINT_UPDATE_PATIENTS = WSRoot + '/alterar_paciente';
export const ENDPOINT_DELETE_PATIENTS = WSRoot + '';

export const ENDPOINT_LIST_TREATMENT = WSRoot + '/pesquisa_tratamentos';
export const ENDPOINT_NEW_TREATMENT = WSRoot + '/novo_tratamento';
export const ENDPOINT_UPDATE_TREATMENT = WSRoot + '/alterar_tratamento';
export const ENDPOINT_DELETE_TREATMENT = WSRoot + '';

export const ENDPOINT_LIST_HISTORY = WSRoot + '/historico';
export const ENDPOINT_NEW_HISTORY = WSRoot + '';
export const ENDPOINT_DELETE_HISTORY = WSRoot + '';

export const ENDPOINT_LIST_PHARMACO = WSRoot + '/get_farmacos';
export const ENDPOINT_NEW_PHARMACO = WSRoot + '/novo_farmaco';
export const ENDPOINT_UPDATE_PHARMACO = WSRoot + '/alterar_farmaco';
export const ENDPOINT_DELETE_PHARMACO = WSRoot + '';

//message types background color (snackbar)
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
  cod_farmaco: "",
  nome_farmaco: ""
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
  cod_tratamento: "",
  cod_paciente: null,
  cod_farmaco: null
}

export const UserModel = {
  id: "",
  nome: "",
  login:"",
  senha: "",
  avatar: ""
}