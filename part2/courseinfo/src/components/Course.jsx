import React from 'react';
import Header from './Header';
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const Course = ({course}) => {
    console.log("after header")
    return (
        <>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </>
    )
}

export default Course;