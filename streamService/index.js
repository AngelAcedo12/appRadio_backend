import { pipeline } from "node:stream";
import { promisify } from "node:util";
import express from "express";

const app = express();
const streamPipeline = promisify(pipeline);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/stream", async (req, res) => {
  const url = req.query.url;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "audio/mpeg",
      },
      // Ignorar verificación de certificado SSL
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Set appropriate headers for streaming
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");

    // Pipe the response stream directly to the client
    await streamPipeline(response.body, res);

    // Handle errors
    response.body.on("error", (error) => {
      console.error("Stream error:", error);
      res.end();
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error streaming audio");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
