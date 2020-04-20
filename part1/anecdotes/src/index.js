import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ title, text, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{text}</p>
      <p>Has {votes} votes.</p>
    </div>
  )
}

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>
}

const App = (props) => {
  let size = props.anecdotes.length
  const [selected, setSelected] = useState(0)
  const [topVoted, setTopVoted] = useState(0)
  const [votes, setVotes] = useState(() => {
    let initVotes = []
    for (let i = 0; i < size; i++) {
      initVotes.push(0)
    }
    return initVotes
  });

  const randomize = () => {
    setSelected(Math.floor(Math.random() * size))
  }

  const vote = ({ selected }) => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    if (newVotes[selected] > newVotes[topVoted]) {
      setTopVoted(selected)
    }
    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote
        title="Today's Anecdote"
        text={props.anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button handler={randomize} text='Randomize' />
      <Button handler={() => vote({ selected })} text='V O T E' />
      <Anecdote
        title="Top Voted Anecdote"
        text={props.anecdotes[topVoted]}
        votes={votes[topVoted]}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)