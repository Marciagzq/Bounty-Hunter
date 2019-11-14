import React from "react";
import fireball from "./fireBall.gif";
import { connect } from "react-redux";
import actions from "./actions";
import store from "../../../../../Config/store";

let hasLoaded;

function Fireball(props)  {
    if((!hasLoaded) && props.fbPos) {
        console.log("test")
        hasLoaded = true;
        store.dispatch({
            type: "move",
            payload: {
                position: props.fbPos
            }
        })
    }
    return (
        //Styling for Mage sprite that cuts the initial sprite from the sprite tile
        <div 
            style={{
                position: "absolute",
                top: props.position[1],
                left: props.position[0] ,
                backgroundImage: `url('${fireball}')`,
                width: "40px",
                height: "40px",
            }}
        />
    )
}

//In order to get redux state we create this function
//Maps the state to the props of our component (Mage)
function mapStateToProps(state) {
    return {
        //by using ... it takes all of the properties of the Mage and spreads them out for us
        ...state.fireball,
    }
}

//first set is for mapStateToProps and mapDispatchToProps
//second set is for Mage
export default connect(mapStateToProps)(actions(Fireball)); 