import React from "react";
import store from "../../../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../../../Config/constants";

export default function move(monster) {

  setInterval(function () {
    const dir = store.getState().mage.direction
    console.log(dir)
    // const newMageInfo = checkMove();
    const newMageInfo = checkMove(dir)
    console.log('increment timer')
    checkMove(dir);
    // checkMove();
    store.dispatch({
      type: 'INCREMENT_TIMER'
    })
    store.dispatch({
      type: "move_Mage",
      payload: newMageInfo

    })
  }, 500)

  function getNewPosition(oldPos, direction) {

    switch (direction) {
      case "West":
        return [oldPos[0] - spriteSize, oldPos[1]]

      case "East":
        return [oldPos[0] + spriteSize, oldPos[1]]

      case "North":
        return [oldPos[0], oldPos[1] - spriteSize]
      case "South":
        return [oldPos[0], oldPos[1] + spriteSize]
    }
  }

  //checks boundaries when the player moves
  function observeBoundaries(oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= mapWidth - spriteSize) &&
      (newPos[1] >= 0 && newPos[1] <= mapHeight - spriteSize)
  }

  //checks if the tile the player is moving is an obstacle
  function observeObstacles(oldPos, newPos) {
    const tiles = store.getState().map.tiles
    const y = newPos[1] / spriteSize;
    const x = newPos[0] / spriteSize;
    const nextTile = tiles[y][x]
    return nextTile < 5
  }

  // function attemptMove(direction) {
  //   const oldPos = store.getState().mage.position
  //   const newPos = getNewPosition(oldPos, direction)
  //   // console.log(oldPos)
  //   // console.log(newPos)
  //   // console.log(observeBoundaries(oldPos, newPos))
  //   // console.log(observeObstacles(oldPos, newPos))


  // }

  function checkMove(direction) {
    console.log("this is working")
    const oldPos = store.getState().mage.position
    const newPos = getNewPosition(oldPos, direction)
    const playerPos = store.getState().player.position
    const magePos = store.getState().mage.position
    // const direction = store.getState().mage.direction
    const currentCD = store.getState().mage.currentCD
    const maxCD = store.getState().mage.maxCD
    const attacking = store.getState().mage.attacking

    if (playerPos[1] != magePos[1]) {
      console.log("hey")
      if (playerPos[1] > magePos[1]) {
        console.log("below")
        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
          console.log("below2")
          return {
            position: [magePos[0], magePos[1] + spriteSize],
            direction: "South"
          }
        }
        else {
          return {
            direction: "South"
          }
        }
      }
      else if (playerPos[1] < magePos[1]) {
        console.log("above")
        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
          console.log("above2")
          return {
            position: [magePos[0], magePos[1] - spriteSize],
            direction: "North"
          }
        }
        else {
          return {
            direction: "North"
          }
        }
      }
    }
    else if (playerPos[0] > magePos[0] + (3 * spriteSize)) {
      if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
        return {
          position: [magePos[0] + spriteSize, magePos[1]],
          direction: "East"
        }
      }
    }
    else if (playerPos[0] < magePos[0] - (3 * spriteSize)) {
      if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
        return {
          position: [magePos[0] - spriteSize, magePos[1]],
          direction: "West"
        }
      }
    }
    else if (playerPos[0] < magePos[0] + (3 * spriteSize) && playerPos[0] > magePos[0]) {
      if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
        return {
          position: [magePos[0] - spriteSize, magePos[1]],
          direction: "East"
        }
      }
    }
    else if (playerPos[0] > magePos[0] - (3 * spriteSize) && playerPos[0] < magePos[0]) {
      if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
        return {
          position: [magePos[0] + spriteSize, magePos[1]],
          direction: "West"
        }
      }
    }
    else if (playerPos[0] == magePos[0] && playerPos[1] == magePos[1]) {
      const playerDir = store.getState().player.direction

      if (playerDir == "East") {
        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
          return {
            position: [magePos[0] + (2 * spriteSize), magePos[1]],
            direction: "West"
          }
        }
      }
      else if (playerDir == "West") {
        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
          return {
            position: [magePos[0] - (2 * spriteSize), magePos[1]],
            direction: "East"
          }
        }
      }
      else if (playerDir == "South") {
        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
          return {
            position: [magePos[0], magePos[1] + (2 * spriteSize)],
            direction//: "South"
          }
        }
      }
      else if (playerDir == "North") {
        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
          return {
            position: [magePos[0], magePos[1] - (2 * spriteSize)],
            direction//: "North"
          }
        }
      }

    }
    else {
      if (currentCD == 0) {
        console.log("attack!!!")
        return {
          position: magePos,
          direction,
          currentCD: 1,
          attacking: true,
        }
      }
      else if (currentCD !== 0 && currentCD !== maxCD) {
        console.log("Attack is on cd")
        const newCD = currentCD + 1;
        return {
          position: magePos,
          direction,
          currentCD: newCD,
          attacking: false,
        }
      }
      else if (currentCD == maxCD) {
        console.log("CD reset")
        return {
          position: magePos,
          direction,
          currentCD: 0,
        }
      }



    }

  }

  return monster
}