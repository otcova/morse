
export const home = "home-page"
export const encode = "encode-page"
export const decode = "decode-page"
const pages = [home, encode, decode]

export function load(page_to_load) {
    if (page_to_load == encode) {
        document.body.style.background = "#ddd"
    } else {
        document.body.style.background = "#ef4136"
    }

    for (const page of pages) {
        if (page == page_to_load) {
            document.getElementById(page).style.display = ""
        } else {
            document.getElementById(page).style.display = "none"
        }
    }
}

