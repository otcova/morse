import * as morse from "./morse.js"
import * as text_database from "./text_database.js"
import * as text_display from "./text_display.js"
import * as keyboard from "./keyboard.js"
import * as morse_hint from "./morse_hint.js"
import * as progress_bar from "./progress_bar.js"

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
let chars_to_study = letters

const MIN_CHARS = 30

const WRONG_STEP = -0.5
const GOOD_STEP = 0.2

export function start() {
    keyboard.clear()
    progress_bar.show(chars_to_study)
    morse_hint.hide()

    text_display.push_text(text_database.words.get_random())
    text_display.push_text(text_database.words.get_random())
    text_display.push_text(text_database.words.get_random())
    text_display.push_text(text_database.words.get_random())
    text_display.push_text(text_database.words.get_random())
}

keyboard.on_typed_char(char => {
    const typed = morse.decode(char).toUpperCase()
    const expected = text_display.get_text()[0].toUpperCase()

    if (!expected)
        return

    if (expected != typed) {
        progress_bar.set_progress(expected, progress_bar.get_progress(expected) + WRONG_STEP)
        morse_hint.show(expected[0])
        return
    }

    progress_bar.set_progress(typed, progress_bar.get_progress(typed) + GOOD_STEP)
    text_display.pop_char()
    morse_hint.hide()

    if (text_display.get_text().length < MIN_CHARS)
        text_display.push_text(text_database.words.get_random())
})
