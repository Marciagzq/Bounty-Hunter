import React from "react";
import store from "../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../Config/constants";

export default function handleMovement(monster) {
   function switchFacing(direction) {

   }

   setInterval( function() {
    console.log('increment timer')
    store.dispatch({
      type : 'INCREMENT_TIMER'
    })
 }, 1000 )

   function dispatchMove(direction, newPos) {
    store.dispatch({
        type: "move_Player",
        payload: {
            position: newPos,
            direction: direction
        }
    })
}
}