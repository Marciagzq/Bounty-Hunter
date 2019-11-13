import React from "react";
//this import connects the store to our component (Player)
import { connect } from "react-redux";
import walkSprite from "./player_walk.png"
import handleMovement from "./move";

function Player(props)  {
    return (
        //Styling for player sprite that cuts the initial sprite from the sprite tile
        <div 
            style={{
                position: "absolute",
                top: props.pseudoPosition[1],
                left: props.pseudoPosition[0],
                backgroundImage: `url('${walkSprite}')`,
                backgroundPosition: props.spriteLocation,
                width: "40px",
                height: "40px",
            }}
        />
    )
}

//In order to get redux state we create this function
//Maps the state to the props of our component (Player)
function mapStateToProps(state) {
    return {
        //by using ... it takes all of the properties of the player and spreads them out for us
        ...state.player,
    }
}
//first set is for mapStateToProps
//second set is for Player
export default connect(mapStateToProps)(handleMovement(Player))