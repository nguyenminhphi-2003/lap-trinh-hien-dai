import { Router } from "express";
import multer from "multer";
import { google } from "googleapis";
import fs from "fs";

const credentials = JSON.parse(fs.readFileSync('./src/upload-file/credentialGGDRIVE.json', 'utf-8'));

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const router = Router();

const uploadDrive = multer({ dest: 'uploads/' });

router.post('/uploadDrive', uploadDrive.single('file'), async (req, res) => {
    const { file } = req;
    const drive = google.drive({ version: 'v3', auth });
    const folderId = '1bf0iLUEi1d9mfqQICQblqs7Sbo12nPuk';  // Thay bằng ID thư mục Google Drive của bạn

    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                mimeType: file.mimetype,
                parents: [folderId],
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream(file.path),
            },
        });

        // Xóa file tạm sau khi tải lên
        fs.unlinkSync(file.path);

        res.status(200).json({ message: "File uploaded successfully", fileId: response.data.id });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/upload-file/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const uploadLocal = multer({ storage: storage })

router.post('/uploadLocal', uploadLocal.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "File upload failed" });
    }
    res.json({
        message: "File uploaded successfully",
    });
})

export default router;