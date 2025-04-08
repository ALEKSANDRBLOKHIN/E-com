const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

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

      
      fs.unlink(inputPath, (err) => {
        if (err) console.error("Ошибка удаления оригинала:", err);
        else console.log("Оригинал удалён:", inputPath);
      });

      
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
