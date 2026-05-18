const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-ads", async (req, res) => {
try {

```
const { prompt } = req.body;

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature: 0.8,
  max_tokens: 3000,
});

res.json({
  success: true,
  result: response.choices[0].message.content,
});
```

} catch (error) {

```
console.log(error);

res.status(500).json({
  success: false,
  error: "Something went wrong",
});
```

}
});

app.listen(3000, () => {
console.log("Server running on port 3000");
});
