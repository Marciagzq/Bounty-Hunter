import React from "react";
import store from "../../../../Config/store";
import { connect } from "react-redux";
import "./styles.css";

setInterval(function () {
    const hp = store.getState().player.hp;
    const maxhp = store.getState().player.maxhp;
    const HP = (hp / maxhp);
    const percHP = HP * 100;
    console.log(percHP)
    store.dispatch({
        type: "move_Player",
        payload: {
            percHP: percHP
        }
    })

}, 200)

function HealthBar (props) {
    const percHP = store.getState().player.percHP
    return (
        <div className="healthBar">

            <Filler perc={percHP}/>
        </div>
    )
}

function Num(props) {
    return (
        <div className="hpNum">
            {props.hp}/{props.maxhp}
        </div>
    )
}

function Filler (props) {
    const hp = store.getState().player.hp;
    const maxhp = store.getState().player.maxhp;
    return (
        <div className="filler"
            style={{ width: `${props.perc}%`,
            transition: "width .2s ease-in" }}
        >
            <Num hp={hp} maxhp={maxhp} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        //by using ... it takes all of the properties of the Mage and spreads them out for us
        ...state.player,
    }
}



export default connect(mapStateToProps)(HealthBar);