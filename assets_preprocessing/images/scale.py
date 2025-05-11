import os
from PIL import Image

input_dir = "letters"
output_dir = "../../assets/images"
quality = 95
output_sizes = [500, 400, 300, 200, 100]

morse_map = {
    "A": 2,
    "B": 4,
    "C": 4,
    "D": 3,
    "E": 1,
    "F": 4,
    "G": 3,
    "H": 4,
    "I": 2,
    "J": 4,
    "K": 3,
    "L": 4,
    "M": 2,
    "N": 2,
    "O": 3,
    "P": 4,
    "Q": 4,
    "R": 3,
    "S": 3,
    "T": 1,
    "U": 3,
    "V": 4,
    "W": 3,
    "X": 4,
    "Y": 4,
    "Z": 4,
    "0": 5,
    "1": 5,
    "2": 5,
    "3": 5,
    "4": 5,
    "5": 5,
    "6": 5,
    "7": 5,
    "8": 5,
    "9": 5,
    ".": 6,
    ",": 6,
    "?": 6,
    "'": 6,
    "!": 6,
    "/": 5,
    "(": 5,
    ")": 5,
    "&": 5,
    ":": 6,
    ";": 6,
    "=": 5,
    "+": 5,
    "-": 6,
    "_": 6,
    '"': 6,
    "$": 7,
    "@": 6,
}

# Scan directory for PNG files
for filename in os.listdir(input_dir):
    input_path = os.path.join(input_dir, filename)

    # Generate output filename
    base_name = os.path.splitext(filename)[0]

    # +1 to acount the empty sprite
    morse_len = morse_map[base_name] + 1

    try:
        # Open the image
        with Image.open(input_path) as img:
            img = img.crop((0, 0, img.height * morse_len, img.height))

            for new_size_h in output_sizes:
                new_size = (new_size_h * morse_len, new_size_h)

                # Resize the image
                resized_img = img.resize(new_size, Image.Resampling.LANCZOS)

                # Save as WebP
                output_filename = f"{base_name}.{new_size_h}.webp"
                output_path = os.path.join(output_dir, output_filename)
                resized_img.save(output_path, "webp", quality=quality)

        print(f"Processed: {filename}")

    except Exception as e:
        print(f"Error processing {filename}: {str(e)}")
