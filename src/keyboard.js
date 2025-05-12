const touch_color = "#0003"
const char_timeout_secs = 0.2


let on_typed_char_action = () => { }
let char_timeout_id = 0;
let char = ""

function set_char(c) {
    if (c == char)
        return

    char = c

    let morse_symbols = []
    for (const key of char) {
        let span = document.createElement("span")
        span.className = key == '.' ? "dot" : "dash"
        morse_symbols.push(span)
    }

    document.getElementById("morse-row").replaceChildren(...morse_symbols)
}

class KeyListener {
    constructor(key) {
        this.key = key
        this.touch_count = 0
    }

    touchstart(e) {
        e.preventDefault()
        navigator.vibrate(7)
        this.touch_count += 1
        e.target.style.background = touch_color
        this.press()
    }

    touchend(e) {
        e.preventDefault()
        this.touch_count -= 1
        if (this.touch_count <= 0)
            e.target.style.background = ""
    }

    touchcancel(e) {
        e.preventDefault()
        this.touchend(e)
    }

    mousedown(e) {
        e.target.style.background = touch_color
        this.press()
    }

    mouseup(e) {
        e.target.style.background = ""
    }

    press() {
        set_char(char + this.key)

        clearTimeout(char_timeout_id)
        char_timeout_id = setTimeout(() => {
            on_typed_char_action(char)
            set_char("")
        }, char_timeout_secs * 1000)
    }
}

window.keyboard_dot_listener = new KeyListener(".")
window.keyboard_dash_listener = new KeyListener("-")


document.addEventListener("keydown", event => {
    if (event.repeat)
        return;
    const key = event.key.toLowerCase()

    if (".·o*".includes(key))
        window.keyboard_dot_listener.press()
    else if ("-_|\\/".includes(key))
        window.keyboard_dash_listener.press()
})

export function on_typed_char(action) {
    on_typed_char_action = action
}

export function clear() {
    clearTimeout(char_timeout_id)
    set_char("")
}

