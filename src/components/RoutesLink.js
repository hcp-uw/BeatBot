import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { LandingPage } from './LandingPage';
import { QuestionOnePage } from "./QuestionOnePage";
import { QuestionTwoPage } from "./QuestionTwoPage";


function RouteLinks() {
    return (
    <   BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/i" element={<QuestionOnePage />} />
                <Route path="/j" element={<QuestionTwoPage />} />
            </Routes>
        </BrowserRouter>

    );
}

export default RouteLinks;