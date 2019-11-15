import React from "react";
import hitGif from "./hitGif.gif";
import { connect } from "react-redux";
import blegh from "./blegh"
//import actions from "./actions";
import store from "../../../../Config/store";

function Hit(props)  {
//     setInterval(function() {
//         if(props.fbPos && !props.isLive) {
//         console.log("test")
//         store.dispatch({
//             type: "move",
//             payload: {
//                 position: props.fbPos
//             }
//         })
//     }
// }, 1000)
    return (
        //Styling for Mage sprite that cuts the initial sprite from the sprite tile
        <div 
            style={{
                position: "absolute",
                top: props.position[1],
                left: props.position[0] ,
                backgroundImage: `url('${hitGif}')`,
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
        ...state.hit,
    }
}

//first set is for mapStateToProps and mapDispatchToProps
//second set is for Mage
export default connect(mapStateToProps)(blegh(Hit)); 