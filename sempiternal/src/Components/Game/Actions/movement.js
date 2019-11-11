import { spriteSize, mapWidth, mapHeight } from "../../../Config/constants";
import store from "../../../Config/store";

//gets the new position of the obj
export function getNewPosition(oldPos, direction) {
        
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

//checks boundaries when the object moves
export function observeBoundaries(newPos) {
    return (newPos[0] >= 0 && newPos[0] <= mapWidth - spriteSize) &&
        (newPos[1] >= 0 && newPos[1] <= mapHeight - spriteSize)
}

//checks if the tile the object is moving is an obstacle
export function observeObstacles(newPos) {
    const tiles = store.getState().map.tiles
    const y = newPos[1] / spriteSize;
    const x = newPos[0] / spriteSize;
    const nextTile = tiles[y][x]
    return nextTile < 5
}

//gets new position for the mage if he is dashing
export function getNewPositionDash(oldPos, direction) {

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