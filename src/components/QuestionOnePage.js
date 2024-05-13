import React, { useState } from "react";
import NextButton from "./NextButton";
import mascot from "../img/mascot2.png";
import PromptSearch from "./PromptSearch.js";

export function QuestionOnePage() {
//   const [screenNumber, setScreenNumber] = useState(0);
//   const handleGoNext = () => {
//     setScreenNumber(screenNumber + 1);
//   }
document.body.style.backgroundColor = "#DEE0ED";
return (
  <div style={{height:'860px'}} >
      <div className="landing-page" >
      <div className="mascot-logo">
          <img src={mascot} alt="beatbot mascot" />
        </div>
        <section>
          <div className="title-name">
            <h1 style={{color: "#756D7D"}}>What kind of <span style={{color:"#9E8DCE"}}>songs</span> do you want?</h1>
          </div>
          <p style={{color:'gre'}}>
            This will give me an idea what playlist to make
          </p>
          <PromptSearch/>
          <div>
          </div>
        </section>

      </div>
    </div>
    );
}