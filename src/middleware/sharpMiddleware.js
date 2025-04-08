const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

function deleteWithRetry(filePath, retries = 5, delay = 2000) {
  const tryDelete = (attempt) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        if (attempt < retries) {
          console.warn(`Удаление не удалось, попытка ${attempt + 1}/${retries}, повтор через ${delay}ms`);
          setTimeout(() => tryDelete(attempt + 1), delay);
        } else {
          console.error("Удаление окончательно не удалось:", err);
        }
      } else {
        console.log("Оригинал удалён:", filePath);
      }
    });
  };
  tryDelete(0);
}

const sharpMiddleware = (outputFormat = "webp", quality = 80) => {
  return async (req, res, next) => {
    if (!req.file) return next();

    try {
      const uploadsDir = path.join("uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const inputPath = req.file.path;

      const rawName = path.parse(req.file.originalname).name;
      const safeName = rawName.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
      const outputFilename = `${Date.now()}-${safeName}.${outputFormat}`;
      const outputPath = path.join(uploadsDir, outputFilename);

      await sharp(inputPath)
        .toFormat(outputFormat, { quality })
        .toFile(outputPath);

      deleteWithRetry(inputPath);

      req.file.processedPath = outputPath;
      req.file.mimetype = `image/${outputFormat}`;
      req.file.originalname = outputFilename;

      next();
    } catch (err) {
      console.error("Sharp error:", err);
      res.status(500).json({ error: "Failed to process image" });
    }
  };
};

module.exports = sharpMiddleware;
