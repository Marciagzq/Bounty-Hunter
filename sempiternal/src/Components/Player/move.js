import store from "../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../Config/constants";

export default function handleMovement(player) {

    //gets the new position of the player when a direction is passed in through handlekeydown
    function getNewPosition(direction) {
        const oldPos = store.getState().player.position
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
            ? newPos : oldPos
    }

    //dispatches the getNewPosition function to the store named as move_Player
    function dispatchMove(direction) {
        const oldPos = store.getState().player.position
        store.dispatch({
            type: "move_Player",
            payload: {
                position: observeBoundaries(oldPos, getNewPosition(direction))
            }
        })
    }

    function handleKeyDown(e) {
        e.preventDefault();

        //reads movement keys and returns the direction of the movement
        switch (e.keyCode) {
            case 37:
                return dispatchMove("West");

            case 38:
                return dispatchMove("North");

            case 39:
                return dispatchMove("East");

            case 40:
                return dispatchMove("South");
            default:
                console.log(e.keyCode)
        }
    }

    window.addEventListener("keydown", (e) => {
        handleKeyDown(e);
    })

    return player
}