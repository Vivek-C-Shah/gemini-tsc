const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function getResponse(msg: string): Promise<string> {
	// The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const chat = model.startChat({
		history: [
			{
				role: "user",
				parts: [{ text: "Hello, I have 2 dogs in my house." }],
			},
			{
				role: "model",
				parts: [{ text: "Great to meet you. What would you like to know?" }],
			},
		],
		generationConfig: {
			maxOutputTokens: 100,
		},
	});

	const result = await chat.sendMessage(msg);
	console.log("!", result)
	const response = await result.response;
	console.log("@",response)
	const text = response.text();
	console.log(text);
	return text;
}