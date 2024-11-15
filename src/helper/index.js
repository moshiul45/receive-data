const path = require("path");
const fs = require('fs');
exports.saveBase64File = (base64Data, serverIP) => {
    const { fileName, fileData } = base64Data;

    // Decode the Base64 data
    const fileBuffer = Buffer.from(fileData, 'base64');

    // Set the target directory and file path
    const targetDir = path.resolve(process.cwd(), 'public', 'uploads');
    serverIP = serverIP.replace(/:/g, '-')
    const targetPath = path.join(targetDir, `${serverIP}_${Date.now()}${fileName}`);

    // Ensure the uploads directory exists
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Write the decoded data to a file
    fs.writeFileSync(targetPath, fileBuffer);
    console.log(`File saved to ${targetPath}`);
}