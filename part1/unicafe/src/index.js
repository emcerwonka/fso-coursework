import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Section = ({ text }) => <h1>{text}</h1>

const Stats = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>g oo d : {good}</p>
      <p>n eu t ra l : {neutral}</p>
      <p>b ad : {bad}</p>
    </div>
  )
}

const Button = ({ text, handler }) => {
  console.log('text =', text);
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
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)