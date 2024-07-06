import fs from "fs";
import path from "path";

import dataUriToBuffer from "data-uri-to-buffer";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb", // Adjust if needed
    },
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { baseString, id } = req.body;

    if (!baseString || !id) {
      return res.status(400).json({ error: "Base string or ID is missing" });
    }

    try {
      const buffer = dataUriToBuffer(baseString);
      const imagePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        `${id}.png`,
      );

      // Ensure the directory exists
      fs.mkdirSync(path.dirname(imagePath), { recursive: true });

      fs.writeFileSync(imagePath, buffer);

      return res.status(200).json({
        message: "Image saved successfully",
        imagePath: `/uploads/${id}.png`,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: "Failed to save image" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
