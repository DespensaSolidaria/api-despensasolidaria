import fs from "fs";

function deleteFile(filename: string): void {
  if (fs.existsSync(filename)) fs.unlinkSync(filename);
}

export { deleteFile };
