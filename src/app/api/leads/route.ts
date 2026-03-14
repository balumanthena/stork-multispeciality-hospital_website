import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log("New Lead:", data);
        return NextResponse.json({ success: true, message: "Lead received" });
    } catch (e) {
        return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
    }
}
