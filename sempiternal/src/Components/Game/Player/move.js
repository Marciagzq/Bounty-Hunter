import React from "react";
import store from "../../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../../Config/constants";

export default function handleMovement(player) {
    let newValues = [store.getState().player.left, store.getState().player.top];

    //gets the new position of the player when a direction is passed in through handlekeydown
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

    //function to display different character
    function getSpriteLocation(direction, walkIndex) {
        switch (direction) {
            case "West":
                return `${spriteSize * walkIndex}px ${spriteSize * 2}px`
            case "East":
                return `${spriteSize * walkIndex}px ${spriteSize * 1}px`
            case "North":
                return `${spriteSize * walkIndex}px ${spriteSize * 3}px`
            case "South":
                return `${spriteSize * walkIndex}px ${spriteSize * 0}px`
        }
    }

    function getWalkIndex() {
        const walkIndex = store.getState().player.walkIndex
        return walkIndex >= 7 ? 0 : walkIndex + 1
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

    //dispatches the getNewPosition function to the store named as move_Player
    function dispatchMove(direction, newPos, newValues) {
        const walkIndex = getWalkIndex()
        const pseudoPosition = store.getState().player.pseudoPosition
        store.dispatch({
            type: "move_Player",
            payload: {
                position: newPos,
                pseudoPosition,
                direction: direction,
                walkIndex,
                spriteLocation: getSpriteLocation(direction, walkIndex),
                top: newValues[1],
                left: newValues[0],
            }
        })
    }

    function attemptMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)

        if (observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
            moveMap(direction)
            dispatchMove(direction, newPos, newValues);
        }
    }

    function moveMap(direction) {
        let top = store.getState().player.top
        let left = store.getState().player.left

        switch (direction) {
            case "South":
                if (top !== (-680)) {
                    const newTop = top - 40
                    return newValues = [left, newTop]
                } 
                else {
                    return newValues = [left, top]
                }
            case "North":
                if (top !== 80) {
                    const newTop = top + 40
                    return newValues = [left, newTop]
                } 
                else {
                    return newValues = [left, top]
                }
            case "West":
                if (left !== 360) {
                    const newLeft = left + 40
                    return newValues = [newLeft, top]
                } 
                else {
                    return newValues = [left, top]
                }
            case "East":
                if (left !== (-1240)) {
                    const newLeft = left - 40
                    return newValues = [newLeft, top]
                } 
                else {
                    return newValues = [left, top]
                }
        }
    }

    function handleKeyDown(e) {
        e.preventDefault();

        //reads movement keys and returns the direction of the movement
        switch (e.keyCode) {
            case 37:
                return attemptMove("West");

            case 38:
                return attemptMove("North");

            case 39:
                return attemptMove("East");

            case 40:
                return attemptMove("South");
            default:
                console.log(e.keyCode)
        }
    }

    const path = window.location.href.split("/")
    console.log(path)
    if (path[3] === "game") {
        window.addEventListener("keydown", (e) => {
            handleKeyDown(e);
        })
    }
    return player
}