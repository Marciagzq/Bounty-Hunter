import React from "react";
import store from "../../../../Config/store";
import "./styles.css";

const hp = store.getState().player.hp;
const maxhp = store.getState().player.maxhp;
const percHP = (hp / maxhp) * 100;

const HealthBar = () => {
    return (
        <div className="healthBar">
            <Filler percentage={percHP} />
        </div>
    )
}

const Filler = (props) => {
    return (
        <div className="filler"
            style={{ width: `${props.percentage}%` }}
        />
    )
}

export default HealthBar;