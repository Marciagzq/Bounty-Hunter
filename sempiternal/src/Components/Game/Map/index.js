import React from "react";
import { connect } from "react-redux";
import { spriteSize } from "../../../Config/constants"
import Mage from "../Monsters/Mage/mage"
import Mage2 from "../Monsters/Mage2/mage"
import Mage3 from "../Monsters/Mage3/mage"
import Hit from "../Actions/Hit/index"
import store from "../../../Config/store"
import Fireball from "../Monsters/Attacks/Fireball/fireball"
import Fireball2 from "../Monsters/Attacks/Fireball2/fireball"
import Fireball3 from "../Monsters/Attacks/Fireball3/fireball"
import "./styles.css"

function getTileSprite(type) {
    switch (type) {
        case 0:
            return "grass"
        case 5:
            return "rock"
        case 6:
            return "tree"
        case 7:
            return "well"
        case 8:
            return "gold"
        case 9:
            return "fountain"
        case 10:
            return "sword"
        case 11:
            return "treasure"
        case 12:
            return "rock1"
        case 13:
            return "shield"
        case 14:
            return "bridge1"
        case 15:
            return "bridge2"
        case 16:
            return "bridge3"
    }
}

function MapTile(props) {
    return <div
        className={`tile ${getTileSprite(props.tile)}`}
        style={{
            height: spriteSize,
            width: spriteSize
        }}
    />
}

function MapRow(props) {
    return <div className="gameRow"
        style={{
            height: spriteSize
        }}>
        {
            props.tiles.map(tile => <MapTile tile={tile} />)
        }
    </div>
}

function Map(props) {
    const magePos = store.getState().mage.position
    const magePos2 = store.getState().mage2.position
    const magePos3 = store.getState().mage3.position
    const playerPos = store.getState().player.position
    return (
        <div
            style={{
                position: "relative",
                top: props.player.top,
                left: props.player.left,
                width: "1600px",
                height: "800px",
                // border: "4px solid white",
            }}
        >
            {
                props.map.tiles.map(row => <MapRow tiles={row} />)
            }
            {props.mage.isAlive ? <Mage pos={[240, 40]} /> : " "}
            {props.mage2.isAlive ? <Mage2 pos={[120, 600]} /> : " "}
            {props.mage3.isAlive ? <Mage3 pos={[1200, 240]} /> : " "}
            {props.fireball.isLive ? <Fireball fbPos={[magePos[0], magePos[1]]} /> : " "}
            {props.fireball2.isLive ? <Fireball2 fbPos={[magePos2[0], magePos2[1]]} /> : " "}
            {props.fireball3.isLive ? <Fireball3 fbPos={[magePos3[0], magePos3[1]]} /> : " "}
            {props.hit.isLive ? <Hit fbPos={[playerPos[0], playerPos[1]]} /> : " "}
        </div >
    )
}
//connects the state from map to the store
function mapStateToProps(state) {
    return {
        ...state
    }
}

//connect takes two arguments
export default connect(mapStateToProps)(Map);