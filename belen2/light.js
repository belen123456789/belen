document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle");
    const bg = document.getElementById("bg");

    const soundOn = document.getElementById("soundOn");
    const soundOff = document.getElementById("soundOff");

    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            // Change background to ON
            bg.src = "img/on.jpg";

            // Play ON sound
            soundOff.pause();
            soundOff.currentTime = 0;
            soundOn.play();
        } else {
            // Change background to OFF
            bg.src = "img/off.jpg";

            // Play OFF sound
            soundOn.pause();
            soundOn.currentTime = 0;
            soundOff.play();
        }
    });
});
