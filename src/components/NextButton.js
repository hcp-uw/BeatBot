import React from "react";

export default function NextButton(props) {
    const { handleGoNext } = props;
    return (
        <div>
            <button onClick={handleGoNext}>Next</button>
        </div>
    )
}