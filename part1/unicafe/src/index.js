import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Section = ({ text }) => <h1>{text}</h1>

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad
  let avg = (all !== 0) ? (((good * 1) + (neutral * 0) + (bad * -1)) / all) : 0
  let pos = (all !== 0) ? (good / all) : 0

  if (all !== 0) {
    return (
      <div>
        <table>
          <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={all} />
            <Statistic text='average' value={avg} />
            <Statistic text='positive' value={pos} />
          </tbody>
        </table>
      </div>
    )
  }

  return <p>n o + f e e d b a c k + g i v e n</p>
}

const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Section text='G I V E * F E E D B A C K' />
      <Button text='G OO D' handler={() => setGood(good + 1)} />
      <Button text='N EU T RA L' handler={() => setNeutral(neutral + 1)} />
      <Button text='B AD' handler={() => setBad(bad + 1)} />
      <Section text='* S T A T I S T I C S *' />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)