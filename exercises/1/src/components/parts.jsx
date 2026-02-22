export const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

export const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </>
  );
};

export const Total = (props) => {
  return (
    <p>
      Total of exercises {props.total}
    </p>
  );
};