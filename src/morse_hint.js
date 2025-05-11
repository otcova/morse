import * as morse from "./morse.js"


const dot_delay = 500
const dash_delay = 1000
const start_delay = dash_delay

let current_letter = null
let current_sprite_index = 0

function image_size() {
    if (innerWidth < 900)
        return 100
    return 200
}

addEventListener("resize", () => {
    const img = document.getElementById("morse-hint")

    const size_px = image_size() + "px"
    img.style.width = size_px
    img.style.height = size_px

    if (current_letter) {
        img.style.backgroundImage = `url("assets/images/${current_letter}.${image_size()}.webp")`;
        img.style.backgroundPositionX = -(current_sprite_index * image_size()) + "px";
    }
})

export async function show(letter) {
    const img = document.getElementById("morse-hint")

    if (letter == current_letter && img.style.opacity == "1")
        return

    const symbol = morse.encode(letter);
    if (!symbol)
        return

    current_letter = letter
    current_sprite_index = 0

    img.style.opacity = "1"
    img.style.backgroundImage = `url("assets/images/${letter}.${image_size()}.webp")`;
    img.style.width = image_size() + "px"
    img.style.height = image_size() + "px"
    img.style.backgroundPositionX = "0px";
    img.style.backgroundPositionY = "0px";
    img.style.backgroundSize = `${symbol.length + 1}00% 100%`;

    await new Promise(resolve => setTimeout(resolve, start_delay))

    for (const key of symbol) {
        if (current_letter != letter)
            return

        current_sprite_index += 1
        img.style.backgroundPositionX = -(current_sprite_index * image_size()) + "px";

        if (key == ".")
            await new Promise(resolve => setTimeout(resolve, dot_delay))
        else
            await new Promise(resolve => setTimeout(resolve, dash_delay))
    }
}



export function hide() {
    const img = document.getElementById("morse-hint")
    img.style.opacity = "0"
    current_letter = null
}
