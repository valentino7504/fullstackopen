const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.partObj.name} {props.partObj.exercises}
    </p>
  )
};

const Content = (props) => {
  return (
    <>
      <Part partObj={props.course.parts[0]} />
      <Part partObj={props.course.parts[1]} />
      <Part partObj={props.course.parts[2]} />
    </>
  );
};

const Total = (props) => {
  let exerciseNos = props.course.parts.map(part => part.exercises);
  return (
    <p>Number of exercises {exerciseNos.reduce((a, b) => a + b, 0)}</p>
  );
};

const App = () => {
  const course =
  {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
