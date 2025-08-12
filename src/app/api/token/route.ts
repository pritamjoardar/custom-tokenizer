import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    function encode(arr: string[]): number[][] {
      return arr.map(str =>
        str.split("").map(char => char.charCodeAt(0))
      );
    }

    function decode(arr: number[][]): string {
      return arr
        .map(codes => codes.map(code => String.fromCharCode(code)).join(""))
        .join(" ");
    }

    const { text }: { text: string } = await req.json();

    const token: string[] = text.split(" ");
    const encoded: number[][] = encode(token);
    const decoded: string = decode(encoded);

    return NextResponse.json(
      { message: "Text received", token, encoded, decoded },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
