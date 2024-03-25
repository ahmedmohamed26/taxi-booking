import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const searchText = searchParams.get("q");

  const res = await fetch(
    `${
      process.env.MAPBOX_BASEURL
    }suggest?q=${searchText}?language=en&limit=6&country=US&session_token=${JSON.stringify(
      uuidv4().id
    )}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const searchResult = await res.json();
  return NextResponse.json(searchResult);
}

// export async function drawAddress(req: any) {
//   const { searchParams } = new URL(req.url);
//   const searchText = searchParams.get("q");

//   const res = await fetch(
//     `${
//       process.env.MAPBOX_BASEURL
//     }retrieve?q=${searchText}?language=en&limit=6&country=US&session_token=${JSON.stringify(
//       uuidv4().id
//     )}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const searchResult = await res.json();
//   return NextResponse.json(searchResult);
// }
