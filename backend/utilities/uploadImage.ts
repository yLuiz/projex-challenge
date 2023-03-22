import multer from "multer";
import path from 'node:path';

const imageRegex = /\.(jpg|png|jfif)$/

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";
        if(req.baseUrl.includes("property")) {
            folder = "properties";
        } else if(req.baseUrl.includes("something")) {
            folder = "something";
        }

        cb(null, `uploads/${folder}`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(imageRegex)) {
        return cb(new Error('Por favor, envie apenas arquivos de png, jfif ou jpg!'));
        }

        cb(null, true);
    }
})

export default imageUpload;
