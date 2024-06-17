const Header = (props) => <h1>{props.name}</h1>

const Content = (props) => {
    return (
        <>
            <p>
                {props.part1} {props.exercises1}
            </p>
            <p>
                {props.part2} {props.exercises2}
            </p>
            <p>
                {props.part3} {props.exercises3}
            </p>
        </>
    )
}

const Total = (props) => <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>

const App = () => {
    const course = {
        name: 'Half Stack application development',
        part1: 'Fundamentals of React',
        exercises1: 10,
        part2: 'Using props to pass data',
        exercises2: 7,
        part3: 'State of a component',
        exercises3: 14
    }

    return (
        <div>
            <Header name={course.name}/>
            <Content part1={course.part1} exercises1={course.exercises1} part2={course.part2}
                     exercises2={course.exercises2} part3={course.part3} exercises3={course.exercises3}/>
            <Total exercises1={course.exercises1} exercises2={course.exercises2} exercises3={course.exercises3} />
        </div>
    )
}

export default App