import { NextResponse } from "next/server";
import ImageKit from "imagekit";

// Avoid build-time evaluation: don't pre-render this route.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Lazy init so the SDK isn't constructed at module load / build time.
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
    });

    const authenticationParameters = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
