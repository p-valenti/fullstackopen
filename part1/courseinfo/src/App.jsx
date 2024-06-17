const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => <p> {props.part} {props.exercises} </p>

const Content = (props) => {
    return (
        <>
            <Part part={props.part1.name} exercises={props.part1.exercises1} />
            <Part part={props.part2.name} exercises={props.part2.exercises2} />
            <Part part={props.part3.name} exercises={props.part3.exercises3} />
        </>
    )
}

const Total = (props) => <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>

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
            <Content part1={parts[0]} part2={parts[1]} part3={parts[2]} />
            <Total exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises} />
        </div>
    )
}

export default App