# Travel Teaser Background Video

## Required Files

Place the following video files in this directory:

- `travel-teaser.webm` - VP9/AV1 encoded video (preferred, smaller file size)
- `travel-teaser.mp4` - H.264 encoded video (fallback for Safari)
- `travel-teaser.jpg` - Poster image (shown while video loads)

## Video Specifications

- **Duration**: 6-10 seconds
- **File Size**: 1-3MB (maximum 5MB)
- **Audio**: Muted (no sound)
- **Loop**: Seamless loop for continuous playback
- **Format**: 
  - WebM (VP9/AV1) for modern browsers
  - MP4 (H.264) for Safari and older browsers

## Content Suggestions

- Scenic travel footage (mountains, beaches, cities)
- Slow, smooth camera movements
- High contrast for text readability
- Avoid fast movements or busy scenes

## Encoding Commands

### FFmpeg Example:
```bash
# Create WebM version
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf "scale=1920:1080" travel-teaser.webm

# Create MP4 version
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -vf "scale=1920:1080" travel-teaser.mp4

# Extract poster frame
ffmpeg -i input.mp4 -vframes 1 -q:v 2 travel-teaser.jpg
``` 