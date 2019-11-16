import store from "../../../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../../../Config/constants";
import Fireball from "../Attacks/Fireball/fireball";
import React from "react";

export default function move(monster) {

  

  const path = window.location.href.split("/")
  console.log(path)
  if (path[3] === "game") {
    let interval = setInterval(function () {
      const currentCD = store.getState().mage.currentCD
      const dir = store.getState().mage.direction
      const locked = store.getState().mage.locked
      const hp = store.getState().mage.hp
      console.log("locked is " + locked)
      console.log(dir)
      const newMageInfo = checkMove(dir)
      console.log('increment timer')
      console.log(checkMove(dir))
      // checkAttack();
      checkSight()
      store.dispatch({
        type: 'INCREMENT_TIMER'
      })
      if (locked) {
        store.dispatch({
          type: "move_Mage",
          payload: newMageInfo

        })
      }
      if (store.getState().mage.attacking) {
        store.dispatch({
          type: "move",
          payload: {
            isLive: true
          }
        })
      }
      if (hp == 0) {
        store.dispatch({
          type: "move",
          payload: {
            position: [10000000, 10000000]
          }
        })
        store.dispatch({
          type: "move_Mage",
          payload: {
            position: [10000000, 100000000]
          }
        })
        clearInterval(interval)
      }
    }, 400)
  }
  //gets new position for the mage if he is moving
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

  //gets new position for the mage if he is dashing
  function getNewPositionDash(oldPos, direction) {

    switch (direction) {
      case "West":
        return [oldPos[0] - (2 * spriteSize), oldPos[1]]

      case "East":
        return [oldPos[0] + (2 * spriteSize), oldPos[1]]

      case "North":
        return [oldPos[0], oldPos[1] - (2 * spriteSize)]
      case "South":
        return [oldPos[0], oldPos[1] + (2 * spriteSize)]
    }
  }

  //checks boundaries when the player moves
  function observeBoundaries(oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= mapWidth - spriteSize) &&
      (newPos[1] >= 0 && newPos[1] <= mapHeight - spriteSize)
  }

  //checks if player is in sight
  function checkSight() {
    const playerPos = store.getState().player.position
    const magePos = store.getState().mage.position
    if ((
      (playerPos[0] < magePos[0] + (4 * spriteSize) && playerPos[0] > magePos[0])
      &&
      (
        (playerPos[1] < magePos[1] + (4 * spriteSize) && playerPos[1] > magePos[1])
        ||
        (playerPos[1] > magePos[1] - (4 * spriteSize) && playerPos[1] < magePos[1])
      )
    )
      ||
      (
        (playerPos[0] > magePos[0] - (4 * spriteSize) && playerPos[0] < magePos[0])
        &&
        (
          (playerPos[1] < magePos[1] + (4 * spriteSize) && playerPos[1] > magePos[1])
          ||
          (playerPos[1] > magePos[1] - (4 * spriteSize) && playerPos[1] < magePos[1])
        )
      )
      ||
      ((playerPos[0] < magePos[0] + (4 * spriteSize) && playerPos[0] > magePos[0]) && (playerPos[1] == magePos[1]))
      ||
      ((playerPos[0] > magePos[0] - (4 * spriteSize) && playerPos[0] < magePos[0]) && (playerPos[1] == magePos[1]))
      ||
      ((playerPos[1] < magePos[1] + (4 * spriteSize) && playerPos[1] > magePos[1]) && (playerPos[0] == magePos[0]))
      ||
      ((playerPos[1] > magePos[1] - (4 * spriteSize) && playerPos[1] < magePos[1]) && (playerPos[0] == magePos[0]))
    ) {
      store.dispatch({
        type: "move_Mage",
        payload: {
          locked: true
        }

      })
    }
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

  //moving function for the mage
  function checkMove(direction) {
    console.log("this is working")
    const oldPos = store.getState().mage.position
    const playerPos = store.getState().player.position
    const magePos = store.getState().mage.position
    // const direction = store.getState().mage.direction
    const currentCD = store.getState().mage.currentCD
    const maxCD = store.getState().mage.maxCD

    //checks  if player y pos is equal to mage y pos
    if (playerPos[1] != magePos[1]) {
      console.log("hey")
      //moves mage down if player is below
      if (playerPos[1] > magePos[1]) {
        console.log("below")
        const newPos = getNewPosition(oldPos, "South");
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
        const newPos = getNewPosition(oldPos, "North");
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
      const newPos = getNewPosition(oldPos, "East");
      if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
        return {
          position: [magePos[0] + spriteSize, magePos[1]],
          direction: "East"
        }
      }
    }
    else if (playerPos[0] < magePos[0] - (3 * spriteSize)) {
      const newPos = getNewPosition(oldPos, "West");
      if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
        return {
          position: [magePos[0] - spriteSize, magePos[1]],
          direction: "West"
        }
      }
    }
    else if (playerPos[0] < magePos[0] + (3 * spriteSize) && playerPos[0] > magePos[0]) {
      const newPos = getNewPosition(oldPos, "West");
      if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
        return {
          position: [magePos[0] - spriteSize, magePos[1]],
          direction: "East"
        }
      }
    }
    else if (playerPos[0] > magePos[0] - (3 * spriteSize) && playerPos[0] < magePos[0]) {
      const newPos = getNewPosition(oldPos, "East");
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
        const newPos = getNewPositionDash(oldPos, "East");
        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
          return {
            position: [magePos[0] + (2 * spriteSize), magePos[1]],
            direction: "West"
          }
        }
      }
      else if (playerDir == "West") {
        const newPos = getNewPositionDash(oldPos, "West");
        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
          return {
            position: [magePos[0] - (2 * spriteSize), magePos[1]],
            direction: "East"
          }
        }
      }
      else if (playerDir == "South") {
        const newPos = getNewPositionDash(oldPos, "South");
        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
          return {
            position: [magePos[0], magePos[1] + (2 * spriteSize)],
            direction//: "South"
          }
        }
      }
      else if (playerDir == "North") {
        const newPos = getNewPositionDash(oldPos, "North");
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
        return (
          {
          position: magePos,
          direction,
          currentCD: 1,
          attacking: true,
        }
        )
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