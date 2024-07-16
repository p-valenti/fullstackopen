import { useState } from 'react'

const Statistics = (props) => {
    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
        return (<p>No feedback given</p>)
    }
    const total = props.good + props.neutral + props.bad;
    const average = (props.good-props.bad)/total;
    const percentage = props.good/total * 100 + "%";
    return (
        <table>
            <tbody>
            <StatisticLine text="Good" value={props.good} />
            <StatisticLine text="Neutral" value={props.neutral} />
            <StatisticLine text="Bad" value={props.bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Percentage" value={percentage} />
            </tbody>
        </table>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}: </td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({scoreButton, text}) => (
    <button onClick={scoreButton}>{text}</button>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClickGood = () => {
        console.log('clicked the good-button')
        setGood(good + 1);
    }

    const handleClickNeutral = () => {
        console.log('clicked the neutral-button')
        setNeutral(neutral + 1);
    }

    const handleClickBad = () => {
        console.log('clicked the bad-button')
        setBad(bad + 1);
    }

    return (
        <div>
            <h2>Give feedback</h2>
            <Button scoreButton={handleClickGood} text="good"/>
            <Button scoreButton={handleClickNeutral} text="neutral"/>
            <Button scoreButton={handleClickBad} text="bad"/>
            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App