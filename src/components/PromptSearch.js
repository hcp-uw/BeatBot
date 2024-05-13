import React, { useState } from 'react';


export default function PromptSearch() {
    const [page, setPage] = useState(0);

    if (page === 0) {
        return (
            <div style={{display:"flex", flexDirection:"column", height:60, width:200}}>
                <input type="text" style={{height:200,width:350,backgroundColor:'rgb(255, 255, 255)',margin:0, borderRadius:15, borderColor: '#545082', marginBottom: '10px', padding: '10px'}}/>
                <button style={{padding: '10px'}} onClick={() => setPage(1)}>Continue</button>

            </div>
        );
    }
    else if (page === 1) {
        return (
            <div style={{display:"flex", flexDirection:"column"}}>
                <div style={{overflowY: 'auto',height: 200 }}>
                    <div ><h1>The alphabets</h1></div>
                    <div ><h1>twinkle twinkle little stars</h1></div>
                    <div ><h1>Marry had a little lamb</h1></div>
                    <div ><h1>Merry Christmas</h1></div>
                    <div ><h1>Row the Boat</h1></div>
                    <div><h1>Random song 1</h1></div>
                    <div ><h1>US National Anthem</h1></div>
                    <div ><h1>some other song</h1></div>

                </div>

            <div style={{display: 'flex',flexDirection:'row'}}>      
                <button onClick={() => setPage(0)}>back</button>
                <div style={{width:20, height:1}}></div>
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
