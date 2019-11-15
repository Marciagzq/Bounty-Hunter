import store from "../../../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../../../Config/constants"


export default function actions(projectile) {

    const path = window.location.href.split("/")

    function handleAttack() {
        const currentCD = store.getState().hit.currentCD
        const maxCD = store.getState().hit.maxCD
        const locked = store.getState().hit.isLive
        const playerPos = store.getState().player.position
        const newhitInfo = checkMove();
        hitMonster();
        checkMove();
        if (locked) {
            store.dispatch({
                type: "move_Hit",
                payload: newhitInfo

            })
            if (currentCD == 0) {
                console.log("attack!!!")
                store.dispatch({
                    type: "move_Hit",
                    payload: {
                        currentCD: 1,
                        isLive: true,
                    }
                })
            }
            else if (currentCD !== 0 && currentCD !== maxCD) {
                console.log("Attack is on cd")
                const newCD = currentCD + 1;
                store.dispatch({
                    type: "move_Hit",
                    payload: {
                        currentCD: newCD
                    }
                })
            }
            else if (currentCD == maxCD) {
                console.log("CD reset")
                store.dispatch({
                    type: "move_Hit",
                    payload: {
                        currentCD: 0,
                        isLive: false,
                        position: [playerPos[0] - spriteSize, playerPos[1]],
                    }
                })
            }
        }
    }

    //gets new position for the mage if he is moving
    function getNewPosition(playerPos, direction) {

        switch (direction) {
            case "West":
                return [playerPos[0] - spriteSize, playerPos[1]]

            case "East":
                return [playerPos[0] + spriteSize, playerPos[1]]

            case "North":
                return [playerPos[0], playerPos[1] - spriteSize]

            case "South":
                return [playerPos[0], playerPos[1] + spriteSize]
        }
    }

    function hitMonster() {
        const direction = store.getState().player.direction
        const playerPos = store.getState().player.position
        const newPos = getNewPosition(playerPos, direction);
        const hp = store.getState().mage.hp
        const att = store.getState().player.ad
        if (!checkMonster(newPos)) {
            const newHp = hp - att
            store.dispatch({
                type: "move_Mage",
                payload: {
                    hp: newHp
                }
            })
        }
    }

    function checkMonster(newPos) {
        const magePos = store.getState().mage.position
        return (magePos == newPos)
    }

    //moving function for the mage
    function checkMove() {
        console.log("this is working")
        const direction = store.getState().player.direction
        const playerPos = store.getState().player.position
        const newPos = getNewPosition(playerPos, direction);
        const isLive = store.getState().hit.isLive

        // if (!isLive && playerDir == "West") {
        //     store.dispatch({
        //         type: "move_Hit",
        //         payload: {
        //             position: [playerPos[0] - spriteSize, playerPos[1]],
        //             direction: "West"
        //         }

        //     })
        // }
        // else if (!isLive && playerDir == "East") {
        //     store.dispatch({
        //         type: "move_Hit",
        //         payload: {
        //             position: [playerPos[0] + spriteSize, playerPos[1]],
        //             direction: "East"
        //         }

        //     })
        // }
        // else if (!isLive && playerDir == "North") {
        //     store.dispatch({
        //         type: "move_Hit",
        //         payload: {
        //             position: [playerPos[0], playerPos[1] - spriteSize]
        //         }
        //     })
        // }
        // else if (!isLive && playerDir == "South") {
        //     store.dispatch({
        //         type: "move_Hit",
        //         payload: {
        //             position: [playerPos[0], playerPos[1] + spriteSize]
        //         }
        //     })
        // }

        if (direction == "East") {
            if (checkMonster(newPos)) {
                return {
                    position: [playerPos[0] + spriteSize, playerPos[1]],
                    isLive: true
                }
            }
            else {
                return {
                    position: [playerPos[0] + spriteSize, playerPos[1]],
                    isLive: false
                }
            }
        }
        else if (direction == "West") {
            if (checkMonster(newPos)) {
                return {
                    position: [playerPos[0] - spriteSize, playerPos[1]],
                    isLive: true
                }
            }
            else {
                return {
                    position: [playerPos[0] - spriteSize, playerPos[1]],
                    isLive: false
                }
            }
        }
        else if (direction == "North") {
            if (checkMonster(newPos)) {
                return {
                    position: [playerPos[0], playerPos[1] - spriteSize],
                    isLive: true
                }
            }
            else {
                return {
                    position: [playerPos[0], playerPos[1] - spriteSize],
                    isLive: false
                }
            }
        }
        else if (direction == "South") {
            if (checkMonster(newPos)) {
                return {
                    position: [playerPos[0], playerPos[1] + spriteSize],
                    isLive: true
                }
            }
            else {
                return {
                    position: [playerPos[0], playerPos[1] + spriteSize],
                    isLive: false
                }
            }
        }
    }

    function handleSpaceBar(e) {
        e.preventDefault();
        
        //reads movement keys and returns the direction of the movement
        if (e.keyCode === 32) {
            return handleAttack()
        }
    }

    if (path[3] === "game") {
        window.addEventListener("keydown", (e) => {
            
            handleSpaceBar(e);
        })
    }

    return projectile
}