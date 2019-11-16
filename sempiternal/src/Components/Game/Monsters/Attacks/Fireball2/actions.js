import store from "../../../../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../../../../Config/constants"

export default function actions(projectile) {

    const path = window.location.href.split("/")
    console.log(path)
    if (path[3] === "game") {
        setInterval(function () {
            const currentCD = store.getState().fireball2.currentCD
            const maxCD = store.getState().fireball2.maxCD
            const locked = store.getState().fireball2.isLive
            const magePos = store.getState().mage2.position
            const newFireballInfo = checkMove();
            hitPlayer();
            checkMove();
            if (locked) {
                store.dispatch({
                    type: "move2",
                    payload: newFireballInfo

                })
                if (currentCD == 0) {
                    console.log("attack!!!")
                    store.dispatch({
                        type: "move2",
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
                        type: "move2",
                        payload: {
                            currentCD: newCD
                        }
                    })
                }
                else if (currentCD == maxCD) {
                    console.log("CD reset")
                    store.dispatch({
                        type: "move2",
                        payload: {
                            currentCD: 0,
                            isLive: false,
                            position: [magePos[0] - spriteSize, magePos[1]],
                        }
                    })
                }
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

    function checkPlayer(newPos) {
        const playerPos = store.getState().player.position
        return (playerPos < newPos || playerPos > newPos) 
    }

    function hitPlayer(){
        const direction = store.getState().fireball2.direction
        const oldPos = store.getState().fireball2.position
        const newPos = getNewPosition(oldPos, direction);
        const hp = store.getState().player.hp
        const att = store.getState().mage2.att
        if (!checkPlayer(newPos) && store.getState().fireball2.isLive) {
            const newHp = hp - att
            store.dispatch({
                type: "move_Player",
                payload: {
                    hp: newHp
                }
            })
            if (hp == 1) {
                alert("You're dead!!! Try Again!!!")
                window.location.reload()
            }
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
        const direction = store.getState().fireball2.direction
        const oldPos = store.getState().fireball2.position
        const fireballPos = store.getState().fireball2.position
        const mageDir = store.getState().mage2.direction
        const newPos = getNewPosition(oldPos, direction);
        const magePos = store.getState().mage2.position

        const isLive = store.getState().fireball2.isLive

        if (!isLive && mageDir == "West") {
            store.dispatch({
                type: "move2",
                payload: {
                    position: [magePos[0] - spriteSize, magePos[1]],
                    direction: "West"
                }

            })
        }
        else if (!isLive && mageDir == "East") {
            store.dispatch({
                type: "move2",
                payload: {
                    position: [magePos[0] + spriteSize, magePos[1]],
                    direction: "East"
                }

            })
        }

        if (direction == "East") {
            if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos) && checkPlayer(newPos)) {
                return {
                    position: [fireballPos[0] + spriteSize, fireballPos[1]]
                }
            }
            else {
                return {
                    position: [magePos[0], magePos[1]],
                    isLive: false
                }
            }
        }
        else if (direction == "West") {
            if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos) && checkPlayer(newPos)) {
                return {
                    position: [fireballPos[0] - spriteSize, fireballPos[1]]
                }
            }
            else {
                return {
                    position: [magePos[0], magePos[1]],
                    isLive: false
                }
            }
        }
    }

    return projectile
}