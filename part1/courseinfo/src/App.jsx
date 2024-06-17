const Header = (props) => <h1>{props.name}</h1>

const Part = (props) => <p>{props.part.name} {props.part.exercise}</p>

const Content = (props) => {
    return (
        <>
            <Part part = {props.parts[0]} />
            <Part part = {props.parts[1]} />
            <Part part = {props.parts[2]} />
        </>
    )
}

const Total = (props) => <p>Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}</p>

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {name: 'Fundamentals of React', exercise: 10},
            {name: 'Using props to pass data', exercise: 7},
            {name: 'State of a component', exercise: 14},
    ]
    }

    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </>
    )
}

export default App