let symbols_to_show = []

export function get_progress(letter) {
    if (!letter)
        return 0
    return Number(localStorage.getItem(letter.toUpperCase())) || 0
}

export function set_progress(letter, progress) {
    if (!Number.isFinite(progress))
        return

    progress = Math.min(1, Math.max(0, progress))
    localStorage.setItem(letter.toUpperCase(), progress)
    update_chars()
}

export function show(symbols) {
    symbols_to_show = symbols
    update_chars()
}

function update_chars() {
    let progress_symbols = []

    for (const symbol of symbols_to_show) {
        const alpha = get_progress(symbol) * 0.5 + 0.5

        let span = document.createElement("span")
        span.innerText = symbol
        span.style.color = `rgba(255, 255, 255, ${alpha})`
        progress_symbols.push(span)
    }

    document.getElementById("symbol-progress").replaceChildren(...progress_symbols)
}
