import React from "react";
import store from "../../../../Config/store";
import "./styles.css";

const xp = store.getState().player.xp;
const maxXP = store.getState().player.xpLv;
const percXP = (xp / maxXP) * 100;

const XPBar = () => {
    return (
        <div className="xpBar">
            <Filler percentage={percXP} />
        </div>
    )
}

const Filler = (props) => {
    return (
        <div className="fillerXP"
            style={{ width: `${props.percentage}%` }}
        />
    )
}

export default XPBar;