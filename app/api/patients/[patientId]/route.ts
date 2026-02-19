import { NextResponse } from "next/server";
import { BACKEND_API_URL } from "@/lib/backend";

type DeletePatientRouteContext = {
	params: Promise<{ patientId: string }>;
};

export async function DELETE(
	_request: Request,
	{ params }: DeletePatientRouteContext,
) {
	try {
		const { patientId } = await params;
		const response = await fetch(
			`${BACKEND_API_URL}/api/patients/${patientId}`,
			{
				method: "DELETE",
			},
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Unable to delete patient from backend." },
				{ status: response.status },
			);
		}

		return new NextResponse(null, { status: 204 });
	} catch {
		return NextResponse.json(
			{ error: "Backend service is unavailable." },
			{ status: 503 },
		);
	}
}
