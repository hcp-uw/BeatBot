import React from "react";
// import NextButton from "./NextButton";
import { Mascot } from "./Mascot";

export function LandingPage() {

  return (
    <div className="landing-page">
      <section>
        <div className="title-name">
          <h1>Welcome</h1>
          <h1>to</h1>
          <h1>BeatBot</h1>
        </div>
        <p>
          Using AI to generate a playlist blah blah blahf aiofhjasdkl sjfskjf
          sjdsk skl slkvnasknskl nsknlskn skndslkfnsdn sfn lskanfsakl ksn
          lksanskld nsdl nsl’k ks’kl skjksnlksa nl’skl’n vnlksanvl; io’shn
          lkvnkszn vlzx vnxsl;nvs/lkvnsbvl asoa’
        </p>
        <div className="button-div">
          <button>Connect your Spotify</button>
        </div>
      </section>
      <div className="mascot-logo">
        <Mascot />
      </div>
    </div>
  );
}