import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part title={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part title={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part title={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.title} {props.exercises}
    </div>
  )
}

const Total = (props) => {
  let total = props.parts
    .map(function (part) { return part.exercises; })
    .reduce(function (prev, curr) { return prev + curr; });

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));