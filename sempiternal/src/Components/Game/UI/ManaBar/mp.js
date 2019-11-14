import React from "react";
import store from "../../../../Config/store";
import "./styles.css";

const mp = store.getState().player.mp;
const maxmp = store.getState().player.maxmp;
const percMP = (mp / maxmp) * 100;

const ManaBar = () => {
    return (
        <div className="manaBar">
            <Filler percentage={percMP} />
        </div>
    )
}

const Num = (props) => {
    return (
        <div className="mpNum">
            {props.mp}/{props.maxmp}
        </div>
    )
}

const Filler = (props) => {
    return (
        <div className="fillerMana"
            style={{ width: `${props.percentage}%` }}
        >
            <Num mp={mp} maxmp={maxmp} />
        </div>
    )
}

export default ManaBar;