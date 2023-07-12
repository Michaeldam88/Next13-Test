import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    const response = new Response(JSON.stringify(prompts), { status: 200 });
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, max-age=0, must-revalidate"
    );
    return response;
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
