import React from "react";
//this import connects the store to our component (Mage)
import { connect } from "react-redux";
import mageSprite from "./mageLeft.gif";
import move from "../move";


function Mage(props)  {
    return (
        //Styling for Mage sprite that cuts the initial sprite from the sprite tile
        <div 
            style={{
                position: "absolute",
                top: props.position[1] + 6,
                left: props.position[0],
                backgroundImage: `url('${mageSprite}')`,
                backgroundPosition: props.spriteLocation,
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
        ...state.mage,
    }
}
//first set is for mapStateToProps and mapDispatchToProps
//second set is for Mage
export default connect(mapStateToProps)(move(Mage))