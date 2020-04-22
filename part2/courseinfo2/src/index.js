import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) =>
        <Part key={part.name} part={part} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))