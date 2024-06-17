const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => <p> {props.parts.name} {props.parts.exercise} </p>

const Content = (props) => {
    return (
        <>
            <Part parts={props.parts[0]} />
            <Part parts={props.parts[1]} />
            <Part parts={props.parts[2]} />
        </>
    )
}

const Total = (props) => <p>Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}</p>

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {name: 'Fundamentals of React', exercise: 10},
        {name: 'Using props to pass data', exercise: 7},
        {name: 'State of a component', exercise: 14},
        ]

    return (
        <div>
            <Header course={course}/>
            <Content parts={parts}/>
            <Total parts={parts} />
        </div>
)
}

export default App