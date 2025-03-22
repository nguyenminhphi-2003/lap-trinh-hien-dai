import express from "express";
import multer from "multer";
import { google } from "googleapis";
import fs from "fs";

// Đọc và parse file JSON
const credentials = JSON.parse(fs.readFileSync('./credentialGGDRIVE.json', 'utf-8'));

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const app = express();
const PORT = 3000;

const uploadDrive = multer({ dest: 'uploads/' });

app.post('/uploadDrive', uploadDrive.single('file'), async (req, res) => {
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
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const uploadLocal = multer({ storage: storage })

app.post('/uploadLocal', uploadLocal.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "File upload failed" });
    }
    res.json({
        message: "File uploaded successfully",
    });
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});