
const REFETCH_EVERY_N_ITEMS = 50

class Fetcher {
    constructor(name, pages_count) {
        this.name = name
        this.pages_count = pages_count

        // In case of a very bad connection where a page is not able to load in time,
        // we provide a small list of simple text.
        this.page = "SOS\nZebra\nRaze\nAbracadabra"
        this.#fetch_new_page()
    }

    get_random() {
        // Choose a random item (disctinct from previous)
        let item = this.previous_item
        while (item == this.previous_item)
            item = this.#random_item()

        this.previous_item = item
        return item
    }

    #random_item() {
        let start_index = Math.trunc(Math.random() * this.page.length)

        while (this.page[start_index - 1] != "\n" && start_index != 0) {
            start_index += 1
            if (this.page.length <= start_index)
                start_index = 0
        }

        let end_index = start_index
        while (this.page[end_index] != "\n" && end_index < this.page.length) {
            end_index += 1
        }

        if (end_index - start_index <= 0)
            return this.#random_item()
        return this.page.substring(start_index, end_index)
    }

    async #fetch_new_page() {
        this.refetch_cooldown = REFETCH_EVERY_N_ITEMS

        // Choose a random page numer (disctinct from previous)
        let page_num = this.page_num
        while (page_num == this.page_num)
            page_num = Math.trunc(Math.random() * this.pages_count)
        this.page_num = page_num

        let url = `assets/text/${this.name}/${page_num}.txt`
        let options = { priority: "low" }
        let response = await fetch(url, options)

        let page = await response.text()
        if (page.length > 10)
            this.page = page
    }
}

export const words = new Fetcher("words", 69)
export const simple_phrases = new Fetcher("simple_phrases", 423)
export const symbol_phrases = new Fetcher("symbol_phrases", 320)




