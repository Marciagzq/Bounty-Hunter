import React from "react";
import "./style.css";

function SplashScreenFunction() {
    var preload = document.getElementById("preload");
    var loading = 0;
    var id = setInterval(frame, 100);

    function frame() {
        if(loading > 5.5) {
            console.log(loading)
            clearInterval(id);
            window.location = "/landing";
        }else {
            loading = loading + (0.1);
            console.log(loading)
            if(loading == 4) {
                // preload.style.animation = "fadeout is ease"
            }
        }
    }
}; 

function SplashScreen () {
    SplashScreenFunction();
    return (
        <div className="welcome">
        <span id="splash-overlay" class="splash"></span>
        <span id="welcome" class="z-depth-4"></span>
    
        <header>
                <h1>Code forever, Play forever</h1>
        </header>
        </div>
    )
}

export default SplashScreen;