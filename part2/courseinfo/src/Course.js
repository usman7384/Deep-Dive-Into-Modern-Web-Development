import React, { useState } from 'react';


const Course = (props) => {
    return (
        <div>
        <Header course={props.course} />
        <Content parts={props.parts} />
        <Total parts={props.parts}/>
        </div>
        );
    };
    
    const Header = (props) => {
        return (
            <div>
            <h1>{props.course}</h1>
            </div>
            );
        };
        
        const Content = (props) => {
            return (
                <div>
                {props.parts.map((part) => (
                    <Part key={part.name} name={part.name} exercises={part.exercises} />
                    ))}
                    </div>
                    );
                };
                
                const Total = (props) => {
                    const total = props.parts
                    .map((data) => data.exercises)
                    .reduce((a, b) => a + b);
                    return (
                        <div>
                        <p>total of {total} exercises </p>
                        </div>
                        );
                    };
                    
                    
                    const Part = (props) => {
                        return (
                            <p>
                            {props.name} {props.exercises}
                            </p>
                            );
                        };

export default Course;