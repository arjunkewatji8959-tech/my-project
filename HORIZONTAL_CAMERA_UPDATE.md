# Horizontal Camera Update

All camera capture areas were updated to use a landscape 16:9 frame.

- Attendance camera: 16:9 horizontal preview and capture.
- Fine photo camera: 16:9 horizontal capture.
- Point update camera: 16:9 horizontal capture.
- Camera requests prefer 1280x720 / 16:9 where the device supports it.
- If a mobile browser provides a portrait video stream, capture rotates it into a horizontal frame before saving.
- Preview uses `object-fit: cover` so the camera frame stays clean and wide on desktop and mobile.
