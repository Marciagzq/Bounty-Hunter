import React from "react";
import {connect} from "react-redux";
import {spriteSize} from "../../../Config/constants"
import Mage from "../Monsters/Mage/mage"
import "./styles.css"

function getTileSprite(type) {
    switch (type) {
        case 0:
            return "grass"
        case 5:
            return "rock"
        case 6:
            return "tree"
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
    return (
        <div
            style={{
                position: "relative",
                top: props.player.top,
                left: props.player.left,
                width: "1600px",
                height: "800px",
                backgroundColor: "green",
                // border: "4px solid white",
            }}
        >
            {
                props.map.tiles.map(row => <MapRow tiles={row} />)
            }
           {props.mage.isAlive ? <Mage mapPos={0} pos={[240, 40]}/> : " "}
        </div>
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