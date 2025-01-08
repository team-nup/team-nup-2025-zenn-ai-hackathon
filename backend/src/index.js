import express from 'express';
import cors from 'cors';
import { VertexAI } from '@google-cloud/vertexai';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const vertexAI = new VertexAI({  });

  try {
    const model = vertexAI.getGenerativeModel({ model: 'gemini xx' });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: req.body.prompt }] }]
    });
    res.json({ response: result.response.text() });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(8080);
