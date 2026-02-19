import { NextResponse } from "next/server";
import { BACKEND_API_URL } from "@/lib/backend";

export async function POST(request: Request) {
	try {
		const body: unknown = await request.json();
		const response = await fetch(`${BACKEND_API_URL}/api/clinicals`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Unable to save clinical data in backend." },
				{ status: response.status },
			);
		}

		const responseBody: unknown = await response.json().catch(() => null);
		return NextResponse.json(responseBody, { status: response.status });
	} catch {
		return NextResponse.json(
			{ error: "Backend service is unavailable." },
			{ status: 503 },
		);
	}
}
