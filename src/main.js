import * as page from "./page.js"
import * as encode from "./encode.js"
import * as decode from "./decode.js"

window.start_encode = function () {
    page.load(page.encode)
    encode.start()
}

window.start_decode = function () {
    page.load(page.decode)
    decode.start()
}
