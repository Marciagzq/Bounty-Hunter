import React from "react";
import store from "../../../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../../../Config/constants";

export default function move(monster) {
  function switchFacing(direction) {

  }

  setInterval(function () {
    const newMageInfo = checkSight()
    console.log('increment timer')
    checkSight();
    store.dispatch({
      type: 'INCREMENT_TIMER'
    })
    store.dispatch({
      type: "move_Mage",
      payload: newMageInfo
      
    })
  }, 500)

  function checkSight() {
    const playerPos = store.getState().player.position
    const magePos = store.getState().mage.position
    const direction = store.getState().mage.direction

    if (playerPos[1] != magePos[1]) {

      if (playerPos[1] > magePos[1]) {
        return {
          position: [magePos[0], magePos[1] + spriteSize],
          direction
        }
      }
      else if (playerPos[1] < magePos[1]) {
        return {
          position: [magePos[0], magePos[1] - spriteSize],
          direction
        }
      }
    }
    else if (playerPos[0] > magePos[0] + (3 * spriteSize)) {
      return {
        position: [magePos[0] + spriteSize, magePos[1]],
        direction: "East"
      }
    }
    else if (playerPos[0] < magePos[0] - (3 * spriteSize)) {
      return {
        position: [magePos[0] - spriteSize, magePos[1]],
        direction: "West"
      }
    } else {
      console.log("attack!!!")
      return {
        position: magePos,
        direction
      }

    }
    
  }

  return monster
}