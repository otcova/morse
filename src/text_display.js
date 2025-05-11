const TRANSITION_DURATION = 310
const SPACE = "0.5em"
const NEW_PHRASE = "80px"
const COLORS = [
    "#ef4136",
    "#f7941e",
    "#662d91",
    "#00a651",
]

let phrases_count = 0

let current_text = ""
let phrases = []

export function get_text() {
    return current_text
}

export function push_text(text) {
    if (text.length == 0)
        return

    current_text += text.replaceAll(" ", "")

    const color = COLORS[phrases_count % COLORS.length]
    phrases_count += 1

    const container = document.getElementById("encode-word-scroll")

    const previous_phrase = phrases[phrases.length - 1]
    const previous_char = previous_phrase?.chars[previous_phrase?.chars.length - 1]
    if (previous_char)
        previous_char.style.paddingRight = NEW_PHRASE

    let elements = []

    const phrase_container = document.createElement("div")
    phrase_container.classList.add("phrase")
    phrase_container.style.setProperty('--background', color);

    for (const char of text) {
        if (char == " " && container.lastElementChild)
            container.lastElementChild.style.paddingRight = SPACE

        const char_div = document.createElement("div")
        char_div.innerText = char
        char_div.style.backgroundRepeat
        char_div.classList.add("char")

        phrase_container.appendChild(char_div)
        elements.push(char_div)
    }

    container.appendChild(phrase_container)
    phrases.push({ container: phrase_container, chars: elements, color })
}

export async function pop_char() {
    if (phrases.length == 0)
        return

    const element = phrases[0].chars.shift()
    let previous_phrase = null

    if (phrases[0].chars.length == 0) {
        previous_phrase = phrases.shift()?.container

        if (phrases[0]) {
            // const container = document.getElementById("encode-content")
            // container.style.backgroundColor = phrases[0].color;
            phrases[0].container.classList.add("first")
        }
    }

    current_text = current_text.substring(1)

    element.style.width = element.getBoundingClientRect().width + "px"
    await new Promise(resolve => requestAnimationFrame(resolve))
    await new Promise(resolve => setTimeout(resolve, 1))
    element.style.width = "0px"
    element.style.paddingRight = "0px"
    element.style.transform = "translateY(-80px)"
    previous_phrase?.classList.add("remove");

    await new Promise(resolve => setTimeout(resolve, TRANSITION_DURATION))

    element.remove()
    previous_phrase?.remove()
}
