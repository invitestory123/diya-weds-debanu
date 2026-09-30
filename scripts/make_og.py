import os
from PIL import Image

src_path = r"C:\Users\ADMIN\.gemini\antigravity-ide\brain\59deee20-42c6-4d9b-b3d1-00a20ff26373\og_image_1790728339388.jpg"
dest_dir = r"d:\invite story\works\week 5\diya-weds-debanu\public"

if not os.path.exists(src_path):
    raise FileNotFoundError(f"Source file not found: {src_path}")

img = Image.open(src_path)
print(f"Original size: {img.size}, format: {img.format}")

# Standard Open Graph dimensions (1200 x 630)
og_size = (1200, 630)
img_resized = img.resize(og_size, Image.Resampling.LANCZOS)

# Save lossless PNG with max compression
png_path = os.path.join(dest_dir, "og-image.png")
img_resized.save(png_path, "PNG", optimize=True, compress_level=9)
print(f"Saved lossless PNG to {png_path} ({os.path.getsize(png_path)} bytes)")

# Save lossless WEBP
webp_path = os.path.join(dest_dir, "og-image.webp")
img_resized.save(webp_path, "WEBP", lossless=True, quality=100, method=6)
print(f"Saved lossless WEBP to {webp_path} ({os.path.getsize(webp_path)} bytes)")
