import React from "react";
//this import connects the store to our component (Mage)
import { connect } from "react-redux";
import mageSpriteLeft from "./Assets/mageLeft.gif";
import mageSpriteRight from "./Assets/mageRight.gif";
import mageAttackLeft from "./Assets/mageAttackLeft.gif";
import mageAttackRight from "./Assets/mageAttackRight.gif";
import move from "./move";
import store from "../../../../Config/store"
import player from "../../Player/player";
import Fireball from "../Attacks/Fireball/fireball"
import {spriteSize} from "../../../../Config/constants"

let hasLoaded = 0;

function Mage(props)  {
    console.log(props.pos)
    if((hasLoaded < 2) && props.pos) {
        console.log("test")
        hasLoaded += 1;
        store.dispatch({
            type: "set_Pos",
            payload: {
                position: props.pos
            }
        })
    }
    
    function pickSprite(props) {
        const playerPos = store.getState().player.position
        const magePos = store.getState().mage.position
        if (props.attacking) {
            if (props.direction == "West") {
                return mageAttackLeft
            }
            else if (props.direction == "East") {
                return mageAttackRight
            }
            else if (props.direction == "North"  || props.direction == "South"){
                if (playerPos[0] < magePos[0]) {
                    return mageAttackLeft
                } 
                else {
                    return mageAttackRight
                }
            }
        }
        else {
            if (props.direction == "West") {
                return mageSpriteLeft
            }
            else if (props.direction == "East") {
                return mageSpriteRight
            }
            else if (props.direction == "North"  || props.direction == "South"){
                if (playerPos[0] < magePos[0]) {
                    return mageSpriteLeft
                } 
                else {
                    return mageSpriteRight
                }
            }
        }
    }
    const magePos = store.getState().mage.position
    return (
        //Styling for Mage sprite that cuts the initial sprite from the sprite tile
        <div 
            style={{
                position: "absolute",
                top: props.position[1],
                left: props.position[0] ,
                backgroundImage: `url('${pickSprite(props)}')`,
                width: "40px",
                height: "40px",
            }}
        >
        
        </div>
    )
}

//In order to get redux state we create this function
//Maps the state to the props of our component (Mage)
function mapStateToProps(state) {
    return {
        //by using ... it takes all of the properties of the Mage and spreads them out for us
        ...state.mage,
    }
}
//first set is for mapStateToProps and mapDispatchToProps
//second set is for Mage
export default connect(mapStateToProps)(move(Mage))