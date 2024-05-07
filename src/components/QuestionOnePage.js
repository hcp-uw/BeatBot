import React, { useState } from "react";
import NextButton from "./NextButton";
import mascot from "../img/mascot.png";
import PromptSearch from "./PromptSearch.js";

export function QuestionOnePage() {
//   const [screenNumber, setScreenNumber] = useState(0);
//   const handleGoNext = () => {
//     setScreenNumber(screenNumber + 1);
//   }

return (

    <div className="landing-page">
      <section>
        <div className="title-name">
          <h1>What kind of <span style={{color:"black"}}>m  ood</span> are you in?</h1>
        </div>
        <p>
          This will give me an idea what playlist to make
        </p>
        <div className="button-div">
        <PromptSearch/>
        </div>
      </section>
      <div className="mascot-logo">
        <img src={mascot} alt="beatbot mascot" />
      </div>
    </div>
    );
}