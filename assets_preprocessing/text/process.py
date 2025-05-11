import re


class Writer:
    def __init__(self, folder_name):
        self.lines_per_page = 1000
        self.pages_count = 0
        self.page_len = 0
        self.folder_name = folder_name
        self.file = open(f"{folder_name}/0.txt", "w")
        self.total_line_count = 0

    def write(self, line):
        self.page_len += 1
        self.total_line_count += 1

        self.file.write(line)
        if self.page_len < self.lines_per_page:
            self.file.write("\n")
        else:
            self.file.close()
            self.page_len = 0

            self.pages_count += 1
            self.file = open(f"{self.folder_name}/{self.pages_count}.txt", "w")

    def close(self):
        self.file.close()
        self.page_len = 0
        self.file = None


min_word_len = 3
max_word_len = 14
max_phrase_len = 30
word_pattern = f"(?<![a-zA-Z])[a-zA-Z]{{{min_word_len},{max_word_len}}}(?![a-zA-Z])"

words = set()
simple_phrases = Writer("../../assets/text/simple_phrases")
symbol_phrases = Writer("../../assets/text/symbol_phrases")


def process_line(phrase):
    global words
    global simple_phrases
    global symbol_phrases

    phrase = phrase.strip().removesuffix(".")
    phrase = phrase.removesuffix('"').removeprefix('"').strip()

    for phrase_word in re.findall(word_pattern, phrase):
        words.add(phrase_word.capitalize())

    if len(phrase) > max_phrase_len:
        return

    if re.fullmatch(r"^[A-Za-z ]+$", phrase):
        simple_phrases.write(phrase)
    else:
        symbol_phrases.write(phrase)


with open("en.txt", "r") as file:
    for line in file:
        process_line(line)

simple_phrases.close()
symbol_phrases.close()

print("--- Done ---")
print(f"words: {len(words)}")
print(f"simple phrases: {simple_phrases.total_line_count} bytes")
print(f"normal phrases: {symbol_phrases.total_line_count} bytes")


words_file = Writer("../../assets/text/words")
for item in words:
    words_file.write(item)
words_file.close()
