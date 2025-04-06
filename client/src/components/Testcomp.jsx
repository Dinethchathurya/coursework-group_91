import React from "react";

const Greet = (props) => {
    // Check if 'name' exists and is a string
    if (props.name && typeof props.name === 'string') {
        return <h1>Hello {props.name}</h1>;
    }

    return <button>Login</button>;
}

export default Greet;
