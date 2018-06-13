import React from 'react'
import {Line} from 'react-chartjs-2';
import { ENDPOINT_SIMULATION, messageType } from '../../app-config'
import {red500, lightGreen500 } from 'material-ui/styles/colors'

export default class SimulationResult extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      chartData: undefined
    }
  }

  componentWillMount() {
    //request response is too long to be passed as state
    fetch(ENDPOINT_SIMULATION, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({simulacao: this.props.location.state.simulationData})
    })
      .then(res => {
        console.log('post response', res);
        if (res.status === 201 || res.status === 200 || res.status === 0) {
          this.props.handleShowMessage("Gerando gráfico...", messageType.mInfo)

          res.json().then(apiChartData => {

            let chartData = {
              labels: [],
              datasets: [{
                label: "Curva de concentração",
                data: [],
                fill: false,
                backgroundColor: lightGreen500,
                borderColor: lightGreen500,
              },{
                label: "Concentração desejada",
                type: 'line',
                data:[],
                fill: false,
                backgroundColor: red500,
                borderColor: red500,
              }]
            }

            for(let data in apiChartData) {
              chartData.labels.push(apiChartData[data]['eixo_y'])                             //Tempo(h)
              chartData.datasets[0]['data'].push(apiChartData[data]['simulacao_curva_final']) //Concentração(mg/L)
              chartData.datasets[1]['data'].push(this.props.location.state.simulationData.concentracao_desejada)
            }

            this.setState({
              chartData: chartData,
            });
          })
        } else {
          this.props.handleShowMessage("Falha ao processar o gráfico.", messageType.mError)
          this.props.history.goBack()
        }
      });

  }

  render() {

      let chartOptions = {
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: false
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: false
            }
          }]
        }
      }

      let chart = this.state.chartData !== undefined
        ? <Line data={this.state.chartData} options={chartOptions} />
        : null

    return (
      <div>
        {chart}
      </div>
    );
  }

}
