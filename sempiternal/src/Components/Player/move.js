import store from "../../Config/store";
import { spriteSize } from "../../Config/constants";

export default function handleMovement(player) {

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

    function dispatchMove(direction) {
        store.dispatch({
            type: "move_Player",
            payload: {
                position: getNewPosition(direction)
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