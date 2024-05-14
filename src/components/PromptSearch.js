import React, { useState } from 'react';


export default function PromptSearch(props) {
    const [page, setPage] = useState(0);
    const classes = props.classes;
    console.log(classes);

    if (page === 0) {
        return (
            <div className="prompt-search">
                <input className={classes[0]} type="text" placeholder="Enter your prompt here..."/>
                <button className={classes[1]} onClick={() => setPage(1)}>Continue</button>
            </div>
        );
    }
    else if (page === 1) {
        return (
            <div style={{display:"flex", flexDirection:"column"}}>
                <div style={{overflowY: 'auto',height: 200}}>
                    <div><h1>songs</h1></div>
                    <div><h1>songs</h1></div>
                    <div><h1>songs</h1></div>
                    <div><h1>songs</h1></div>
                    <div><h1>songs</h1></div>
                    <div><h1>songs</h1></div>
                    <div><h1>songs</h1></div>
                    <div><h1>songs</h1></div>
                </div>

            <div>

            <button className="back-but" onClick={() => setPage(0)}>Back</button>
            <button className="submit-but" onClick={() => setPage(2)}>Submit</button>

            </div>

            </div>
        );
    }
    else {
        return (
            <div>
            <h1>done</h1>
            </div>
        );
    }
}
