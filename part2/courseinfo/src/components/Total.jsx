import React from 'react';

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => {
        console.log('what is happening', sum, part)
        return sum + part.exercises;
    }, 0)

    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

export default Total;
