import React from "react";
import World from "../World/index"

function Viewport() {
    return (<div
        style={{
            position: "relative",
            width: "800px",
            height: "400px",
            margin: "20px auto",
            overflow: "hidden",
            backgroundColor: "black"
        }}
    >
        <World />
    </div>
    )
}

export default Viewport