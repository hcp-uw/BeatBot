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
    <div className="q1-page" >
      <img className="mascot-logo2" src={mascot} alt="beatbot mascot" />
      <section className="section-q1-page">
        <div className class="q1-title">
          <h1>Are there any <span style={{color:"#9E8DCE"}}>songs</span> you want to include?</h1>
        </div>
        <p>
          Some example songs would help a lot!
        </p>
        <PromptSearch classes={["q1-input", "q1-but"]} />
      </section>
    </div>
    );
}