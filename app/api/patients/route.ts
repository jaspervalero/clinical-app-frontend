import { NextResponse } from "next/server";
import { BACKEND_API_URL } from "@/lib/backend";

export async function GET() {
	try {
		const response = await fetch(`${BACKEND_API_URL}/api/patients`, {
			cache: "no-store",
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Unable to fetch patients from backend." },
				{ status: response.status },
			);
		}

		const data: unknown = await response.json();
		const patients = Array.isArray(data)
			? data
			: typeof data === "object" &&
				data !== null &&
				"patients" in data &&
				Array.isArray(data.patients)
				? data.patients
				: [];

		return NextResponse.json({ patients });
	} catch {
		return NextResponse.json(
			{ error: "Backend service is unavailable." },
			{ status: 503 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const body: unknown = await request.json();
		const response = await fetch(`${BACKEND_API_URL}/api/patients`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Unable to create patient in backend." },
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
