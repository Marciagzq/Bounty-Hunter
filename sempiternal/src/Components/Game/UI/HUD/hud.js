import React from "react";
import HealthBar from "../HealthBar/hp";
import ManaBar from "../ManaBar/mp.js";
import XPBar from "../XP/xp.js";
import Portrait from "../Portrait/port.js";
import "./styles.css"

function HUD() {
    return (
        <div className="hud">
            {/* <Portrait /> */}
            <div className="bars">
                <HealthBar />
                <ManaBar />
                <XPBar />
            </div>

        </div>
    )
}

export default HUD