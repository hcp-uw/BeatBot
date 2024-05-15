import React, { useState } from "react";
import NextButton from "./NextButton";
import mascot from "../img/mascot3.png";
import PromptSearch from "./PromptSearch.js";

export function QuestionTwoPage() {
//   const [screenNumber, setScreenNumber] = useState(0);
//   const handleGoNext = () => {
//     setScreenNumber(screenNumber + 1);
//   }
document.body.style.backgroundColor = "#EBD6C1";
return (
    <div className="q2-page" >
      <div className class="q2-title">
        <h1>What specific <span style={{color:"#E2B47D"}}>artist</span> do you want to listen to?</h1>
        <p>
          The final step! Hit continue and I’ll start on your playlist.
        </p>
      </div>
      <section className="section-q2-page">
        <img className="mascot-logo3" src={mascot} alt="beatbot mascot" />
        <div>
          <PromptSearch classes={["q2-input", "q2-but"]} />
        </div>
      </section>
    </div>
    );
}