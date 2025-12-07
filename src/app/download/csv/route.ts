import { auth } from "@/app/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const currentDate = new Date();
  const searchParams = request.nextUrl.searchParams;
  const fileNamePrefix = searchParams.get("fileNamePrefix");
  const endpoint = searchParams.get("endpoint"); //start with "/" and no trailing slash

  const fileName = `${fileNamePrefix}_${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}_${currentDate.getHours()}${currentDate.getMinutes()}`;
  const query = "?" + searchParams.toString();

  const session = await auth();

  const fileBlob = await fetch(
    new URL(`${process.env.API_BASE_PATH_ADMIN}${endpoint}${query}`),
    {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken || ""}`,
      },
    },
  ).then((res) => res.blob());

  const headers = new Headers();

  headers.append(
    "Content-Disposition",
    `attachment; filename="${fileName}.csv"`,
  );
  headers.append("Content-Type", "text/csv");

  return new Response(fileBlob, {
    headers,
  });
}
