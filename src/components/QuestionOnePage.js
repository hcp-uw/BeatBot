import React, { useState } from "react";
import NextButton from "./NextButton";
import mascot from "../img/mascot2.png";
import PromptSearch from "./PromptSearch.js";

export function QuestionOnePage() {
//   const [screenNumber, setScreenNumber] = useState(0);
//   const handleGoNext = () => {
//     setScreenNumber(screenNumber + 1);
//   }

return (
  <div style={{backgroundColor:'#DEE0ED', height:'1000px'}} >
      <div className="landing-page" >
      
        <section>
          <div className="title-name">
            <h1 style={{color: "#756D7D"}}>What kind of <span style={{color:"#9E8DCE"}}>songs</span> do you want?</h1>
          </div>
          <p style={{color:'grey'}}>
            This will give me an idea what playlist to make
          </p>
          <PromptSearch/>
          <div>
          </div>
        </section>
        <div className="mascot-logo">
          <img src={mascot} alt="beatbot mascot" />
        </div>
      </div>
    </div>
    );
}

///artist page
///landing page for finishing playlist  

//redo songs
///make css page