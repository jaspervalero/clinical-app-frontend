import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = await fetch("http://localhost:8000/api/patients", {
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
