import {Header, Content, Total} from './parts.jsx';

const Course = ({course}) => {
  const initialValue = 0
  const total = course.parts.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.exercises
    }, 
    initialValue
  )

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total}/>
    </div>
  )
}

const ManyCourses = (props) => {
  return (
    <div>
      {props.courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export default ManyCourses