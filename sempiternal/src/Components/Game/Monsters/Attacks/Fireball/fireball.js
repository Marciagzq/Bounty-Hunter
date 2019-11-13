import React from "react";
import fireball from "./fireBall.gif";

function Fireball(props)  {
    console.log(props.position)
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

//first set is for mapStateToProps and mapDispatchToProps
//second set is for Mage
export default Fireball; 