"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = getResponse;
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
function getResponse(msg) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const result = yield chat.sendMessage(msg);
        console.log("!", result);
        const response = yield result.response;
        console.log("@", response);
        const text = response.text();
        console.log(text);
        return text;
    });
}
//# sourceMappingURL=genResponse.js.map