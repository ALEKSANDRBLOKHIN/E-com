const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const sharpMiddleware = (outputFormat = "webp", quality = 80) => {
  return async (req, res, next) => {
    if (!req.file) return next();

    try {

      const uploadsDir = path.join(__dirname, "..", "uploads");
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

      const tryDelete = (retries = 5, delay = 2000) => {
        fs.rm(inputPath, { force: true }, (err) => {
          if (err) {
            if (retries > 1) {
              console.warn(`Удаление не удалось, попытка ${6 - retries}/5, повтор через ${delay}ms`);
              return setTimeout(() => tryDelete(retries - 1), delay);
            } else {
              console.error("Удаление окончательно не удалось:", err);
            }
          } else {
            console.log("Файл успешно удалён:", inputPath);
          }
        });
      };
      tryDelete();


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
