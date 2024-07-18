import React from 'react';
import Header from './Header';
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const Course = ({courses}) => {
    console.log("after header")
    return (
        <>
            {courses.map(course => (
                <div key={course.id}>
                    <Header course={course.name}/>
                    <Content parts={course.parts}/>
                    <Total parts={course.parts}/>
                </div>
            ))}

        </>
    )
}

export default Course;