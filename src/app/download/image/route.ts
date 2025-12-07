import { NextRequest } from "next/server";

// This API will help up us bypass CORS, this return a blob and we convert it to base64 on Client Component
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageURL = searchParams.get("url") || "";
  const response = await fetch(new URL(imageURL));

  // If the fetch is successful, return the image as a blob else return 500
  if (response.status !== 200) {
    return Response.json(
      {
        message: "Invalid image url.",
      },
      {
        status: 500,
      },
    );
  }

  const blob = await response.blob();

  return new Response(blob, {
    headers: {
      "Content-Type": blob.type,
      Status: response.status.toString(),
    },
  });
}
