import React, { useState } from 'react';


export default function PromptSearch() {
    const [page, setPage] = useState(0);

    if (page === 0) {
        return (
            <div style={{display:"flex", flexDirection:"column", height:60, width:200}}>
                <input type="text" style={{height:100,backgroundColor:'rgb(214, 183, 237',margin:0}}/>
                <button onClick={() => setPage(1)}>Continue</button>

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
                
            <button onClick={() => setPage(0)}>back</button>
            <button onClick={() => setPage(2)}>submit</button>

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
