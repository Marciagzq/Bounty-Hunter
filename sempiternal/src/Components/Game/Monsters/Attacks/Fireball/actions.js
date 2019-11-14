import store from "../../../../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../../../../Config/constants"

export default function actions(projectile) {

    const path = window.location.href.split("/")
    console.log(path)
    if (path[3] === "game") {
        setInterval(function () {
            const dir = store.getState().fireball.direction
            const locked = store.getState().fireball.locked
            const newFireballInfo = checkMove();
            checkMove();
            if (locked) {
                store.dispatch({
                    type: "move",
                    payload: newFireballInfo

                })
            }
        }, 250)
    }
    //gets new position for the mage if he is moving
    function getNewPosition(oldPos, direction) {

        switch (direction) {
            case "West":
                return [oldPos[0] - spriteSize, oldPos[1]]

            case "East":
                return [oldPos[0] + spriteSize, oldPos[1]]
        }
    }

    function observeObstacles(oldPos, newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / spriteSize;
        const x = newPos[0] / spriteSize;
        const nextTile = tiles[y][x]
        return nextTile < 5
      }

    //checks boundaries when the player moves
    function observeBoundaries(oldPos, newPos) {
        return (newPos[0] >= 0 && newPos[0] <= mapWidth - spriteSize)
    }

    //moving function for the mage
    function checkMove() {
        console.log("this is working")
        const oldPos = store.getState().fireball.position
        const playerPos = store.getState().player.position
        const fireballPos = store.getState().fireball.position
        const mageDir = store.getState().mage.direction
        const newPos = getNewPosition(oldPos, mageDir);
        // const direction = store.getState().mage.direction
        if (mageDir == "East") {
            if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
                return {
                    position: [fireballPos[0] + spriteSize, fireballPos[1]]
                }
            }
        }
        else if (mageDir == "West") {
            if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
                return {
                    position: [fireballPos[0] - spriteSize, fireballPos[1]]
                }
            }
        }
    }

    return projectile
}