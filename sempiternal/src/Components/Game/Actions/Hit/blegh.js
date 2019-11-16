import store from "../../../../Config/store";
import { spriteSize } from "../../../../Config/constants"

export default function actions(projectile) {
    const path = window.location.href.split("/")

    function dispatchActions() {
        const playerPos = store.getState().player.position
        const direction = store.getState().player.direction
        const newPos = checkDir(playerPos, direction)
        checkMon();
        checkMon2();
        checkMon3();
        if (store.getState().player.killCount == 3) {
            alert("You successfully killed all the targets!!!")
            window.location.reload();
        }
        store.dispatch({
            type: "hit",
            payload: {
                position: newPos,
                isLive: true
            }
        })

    }

    function getPos() {
        const pos = store.getState().player.position
        switch (store.getState().player.direction) {
            case "North":
                return [pos[0], pos[1] - spriteSize]
            case "South":
                return [pos[0], pos[1] + spriteSize]
            case "West":
                return [pos[0] - spriteSize, pos[1]]
            case "East":
                return [pos[0] + spriteSize, pos[1]]
        }
    }

    function checkMon() {
        const mPos = store.getState().mage.position
        const hPos = getPos();
        const ad = store.getState().player.ad
        const hp = store.getState().mage.hp
        const newHp = hp - ad;
        const live = store.getState().mage.isAlive
        console.log("mage hp: " + newHp)
        console.log("OG mage hp: " + hp)
        console.log("player ad: " + ad)
        console.log("mage pos: " + mPos)
        console.log("hit pos: " + hPos)
        if (mPos[0] == hPos[0] && mPos[1] == hPos[1]) {
            store.dispatch({
                type: "move_Mage",
                payload: {
                    hp: newHp
                }
            })
        }
        if (hp == 0 && live) {
            store.dispatch({
                type: "move_Mage",
                payload: {
                    isAlive: false
                }
            })
            store.dispatch({
                type: "move",
                payload: {
                    isLive: false
                }
            })
            const kc = store.getState().player.killCount
            const newKc = kc + 1
            store.dispatch({
                type: "move_Player",
                payload: {
                    killCount: newKc
                }
            })


        }
    }

    function checkMon2() {
        const mPos = store.getState().mage2.position
        const hPos = getPos();
        const ad = store.getState().player.ad
        const hp = store.getState().mage2.hp
        const newHp = hp - ad;
        const live = store.getState().mage2.isAlive
        console.log("mage hp: " + newHp)
        console.log("OG mage hp: " + hp)
        console.log("player ad: " + ad)
        console.log("mage pos: " + mPos)
        console.log("hit pos: " + hPos)
        if (mPos[0] == hPos[0] && mPos[1] == hPos[1]) {
            store.dispatch({
                type: "move_Mage2",
                payload: {
                    hp: newHp
                }
            })
        }
        if (hp == 0 && live) {
            alert("Mage is dead!");
            store.dispatch({
                type: "move_Mage2",
                payload: {
                    isAlive: false
                }
            })
            store.dispatch({
                type: "move2",
                payload: {
                    isLive: false
                }
            })
            const kc = store.getState().player.killCount
            const newKc = kc + 1
            store.dispatch({
                type: "move_Player",
                payload: {
                    killCount: newKc
                }
            })
        }


    }

    function checkMon3() {
        const mPos = store.getState().mage3.position
        const hPos = getPos();
        const ad = store.getState().player.ad
        const hp = store.getState().mage3.hp
        const newHp = hp - ad;
        const live = store.getState().mage3.isAlive
        console.log("mage hp: " + newHp)
        console.log("OG mage hp: " + hp)
        console.log("player ad: " + ad)
        console.log("mage pos: " + mPos)
        console.log("hit pos: " + hPos)
        if (mPos[0] == hPos[0] && mPos[1] == hPos[1]) {
            store.dispatch({
                type: "move_Mage3",
                payload: {
                    hp: newHp
                }
            })
        }
        if (hp == 0 && live) {
            alert("Mage is dead!");
            store.dispatch({
                type: "move_Mage3",
                payload: {
                    isAlive: false
                }
            })
            store.dispatch({
                type: "move3",
                payload: {
                    isLive: false
                }
            })
            const kc = store.getState().player.killCount;
            const newKc = kc + 1;
            store.dispatch({
                type: "move_Player",
                payload: {
                    killCount: newKc
                }
            })
        }


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