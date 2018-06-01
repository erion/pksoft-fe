import React from 'react'
import {Line} from 'react-chartjs-2';
import { ENDPOINT_SIMULATION, SimulationModel, messageType } from '../../app-config'

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
                data: []
              }]
            }

            console.log(apiChartData)
            for(let data in apiChartData) {
              console.log(apiChartData[data])
              chartData.labels.push(apiChartData[data]['eixo_y'])                             //Tempo(h)
              chartData.datasets[0]['data'].push(apiChartData[data]['simulacao_curva_final']) //Concentração(mg/L)
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

      let chart = this.state.chartData !== undefined ? <Line data={this.state.chartData} /> : null

    return (
      <div>
        {chart}
      </div>
    );
  }

}
