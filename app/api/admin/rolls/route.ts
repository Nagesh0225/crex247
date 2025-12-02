// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/db";
// import Roll from "@/app/models/Roll";

// export async function GET() {
//   try {
//     await connectDB();
//     const rolls = await Roll.find().sort({ createdAt: -1 });
//     return NextResponse.json(rolls, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const { number, reward, code, instantId } = await req.json();
//     // Save all required fields
//     const roll = await Roll.create({ number, reward, code, instantId });
//     return NextResponse.json({ roll }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Roll from "@/app/models/Roll";

export async function GET() {
  try {
    await connectDB();

    const rolls = await Roll.find().sort({ createdAt: -1 });

    // ✅ ALWAYS SAME FORMAT
    return NextResponse.json(
      { data: rolls },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { number, reward, code, instantId } = await req.json();

    const roll = await Roll.create({
      number,
      reward,
      code,
      instantId,
    });

    return NextResponse.json(
      { roll },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
