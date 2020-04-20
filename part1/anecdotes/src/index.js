import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  let size = props.anecdotes.length
  const [selected, setSelected] = useState(0)
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
    setVotes(newVotes)
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes.</p>
      <button onClick={randomize}>Random Anecdote</button>
      <button onClick={() => vote({selected})}>V O T E</button>
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