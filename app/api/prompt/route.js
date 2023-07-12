import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    const response = new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=1",
        "CDN-Cache-Control": "public, s-maxage=60",
        "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
      },
    });

    return response;
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
