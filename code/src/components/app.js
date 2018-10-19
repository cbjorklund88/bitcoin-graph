import React from "react"
import openGdaxWebsocket from "../gdax-websocket"
import { LineChart, Line, Tooltip, YAxis, XAxis, Legend, CartesianGrid } from "recharts"

class App extends React.Component {

  state = {
    tickerMessages: []
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => { //using functions in state.
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])
    }))
  }

  render() {
    return (
      <div>
        <h2>Bitcoin Ticker</h2>
        <div className="wrapper">
          <LineChart className="line-chart" width={1200} height={500} data={this.state.tickerMessages}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis datakey="price" />
            <XAxis dataKey="time" />
            <Tooltip />
            <Line type="monotone" dataKey="high_24h" stroke="#6B4D57" width={20} />
            <Line type="monotone" dataKey="low_24h" stroke="#DDC8C4" width={20} />
            <Legend verticalAlign="top" height={36} />
          </LineChart>
        </div>
      </div>
    )
  }

}

export default App
