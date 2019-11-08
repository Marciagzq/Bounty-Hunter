import React from "react";
import HealthBar from "../HealthBar/hp";
import ManaBar from "../ManaBar/mp.js";
import "./styles.css"

function HUD () {
    return (
        <div className="hud">
            <HealthBar />
            <ManaBar />
        </div>
    )
}

export default HUD