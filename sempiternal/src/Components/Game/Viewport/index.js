import React from "react";
import World from "../World/index"
import "./viewport.css"
var bg=require("../../../Tiles/grass.png")



function Viewport() {
    return (
    <div 
        style={{
            position: "relative",
            width: "800px",
            height: "400px",
            margin: "20px auto",
            overflow: "hidden",
            backgroundImage: "url("+bg+")"
        }}
    >
        <World />
    </div>
    )
}

export default Viewport