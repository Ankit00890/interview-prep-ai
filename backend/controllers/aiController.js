const { GoogleGenAI } = require("@google/genai")
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts")

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// @desc Generate interview question and answer using Gemini
// @route POST/api/generate-questions
// @access Private
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body
        if (!role || !experience || !topicsToFocus || !numberOfQuestions)
            return res.status(400).json({ message: "Missing required fields" })

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        })
        let rawText = response.text
        // Clean it :Remove ```json and ```from beginning and end
        // Clean it: extract JSON part (array or object)
        const jsonStart = rawText.search(/\[|\{/);
        const jsonEnd = rawText.lastIndexOf(rawText[jsonStart] === '[' ? ']' : '}');

        const cleanedText = (jsonStart !== -1 && jsonEnd !== -1)
            ? rawText.substring(jsonStart, jsonEnd + 1)
            : rawText.replace(/^```json\s*/, "").replace(/```\s*$/, "").trim();
        // Now safe to parse
        const data = JSON.parse(cleanedText)
        res.status(200).json(data)
    } catch (error) {
        console.error("Interview Question Generation Error:", error);
        res.status(500).json({
            message: "Failed to generate question",
            error: error.message,
        })
    }
}

// @desc Generate  explains a interview question
// @route POST/api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body
        if (!question) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        const prompt = conceptExplainPrompt(question)
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        })
        let rawText = response.text

        // Clean it :Remove ```json and ```from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") //remove starting ```json
            .replace(/```$/, "") //remove ending
            .trim(); //remove extra spaces

        //Now safe to parse
        const data = JSON.parse(cleanedText)
        res.status(200).json(data)
    } catch (error) {
        console.error("Concept Explanation Error:", error);
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        })
    }
}
module.exports = { generateInterviewQuestions, generateConceptExplanation }