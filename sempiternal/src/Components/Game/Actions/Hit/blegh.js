import store from "../../../../Config/store";
import { spriteSize } from "../../../../Config/constants"

export default function actions(projectile) {
    const path = window.location.href.split("/")

    function dispatchActions() {
        const playerPos = store.getState().player.position
        const direction = store.getState().player.direction
        const newPos = checkDir(playerPos, direction)
        store.dispatch({
            type: "hit",
            payload: {
                position: newPos,
                isLive: true
            }
        })
    }
    function checkDir(pos, direction) {
        switch (direction) {
            case "North":
                return [pos[0], pos[1] - spriteSize]

            case "South":
                return [pos[0], pos[1] + spriteSize]

            case "East":
                return [pos[0] + spriteSize, pos[1]]

            case "West":
                return [pos[0] - spriteSize, pos[1]]
        }
    }

    setInterval(function () {
        const currentCD = store.getState().hit.currentCD
        const maxCD = store.getState().hit.maxCD
        const playerPos = store.getState().player.position
        const locked = store.getState().hit
        if (locked) {
            if (currentCD == 0) {
                console.log("attack!!!")
                store.dispatch({
                    type: "hit",
                    payload: {
                        currentCD: 1,
                    }
                })
            }
            else if (currentCD !== 0 && currentCD !== maxCD) {
                console.log("Attack is on cd")
                const newCD = currentCD + 1;
                store.dispatch({
                    type: "hit",
                    payload: {
                        currentCD: newCD
                    }
                })
            }
            else if (currentCD == maxCD) {
                console.log("CD reset")
                store.dispatch({
                    type: "hit",
                    payload: {
                        currentCD: 0,
                        isLive: false,
                        position: [playerPos[0], playerPos[1]],
                    }
                })
            }
        }
    }, 500)


    function handleSpaceBar(e) {
        e.preventDefault();

        //reads movement keys and returns the direction of the movement
        if (e.keyCode === 32) {
            dispatchActions()
        }
    }

    if (path[3] === "game") {
        window.addEventListener("keydown", (e) => {

            handleSpaceBar(e);
        })
    }



    return projectile
}