import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { messages } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!configuration) {
			return new NextResponse("OpenAI API Key not configured", { status: 500 });
		}

		if (!messages) {
			return new NextResponse("Missing messages", { status: 400 });
		}

		const response = await openAi.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages,
		});

		return NextResponse.json(response.data.choices[0].message, { status: 200 });
	} catch (error) {
		console.log("[CONVERSATION_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
