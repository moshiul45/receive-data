const path = require("path");
const fs = require('fs');
exports.saveBase64File = (base64Data) => {
    const { fileName, fileData } = base64Data;

    // Decode the Base64 data
    const fileBuffer = Buffer.from(fileData, 'base64');

    // Set the target directory and file path
    const targetDir = path.join(__dirname, 'public', 'uploads');
    const targetPath = path.join(targetDir, fileName);

    // Ensure the uploads directory exists
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Write the decoded data to a file
    fs.writeFileSync(targetPath, fileBuffer);
    console.log(`File saved to ${targetPath}`);
}