"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Patient = {
	_id: string;
	firstName: string;
	lastName: string;
	age: number;
};

export default function AddClinicalsPage() {
	const params = useParams<{ patientId: string }>();
	const patientId = params.patientId;
	const [patient, setPatient] = useState<Patient | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPatient = async () => {
			try {
				const response = await fetch("/api/patients");
				if (!response.ok) {
					throw new Error("Unable to fetch patient details.");
				}

				const data = (await response.json()) as { patients: Patient[] };
				const selectedPatient = data.patients.find(
					(entry) => entry._id === patientId,
				);

				if (!selectedPatient) {
					setError("Patient not found.");
					return;
				}

				setPatient(selectedPatient);
			} catch {
				setError("Unable to fetch patient details.");
			} finally {
				setLoading(false);
			}
		};

		if (patientId) {
			void fetchPatient();
		}
	}, [patientId]);

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
			<h1 className="text-3xl font-semibold">Add Clinical Data</h1>
			<p className="text-zinc-600 dark:text-zinc-400">Patient ID: {patientId}</p>

			{loading && <p>Loading patient details...</p>}
			{error && <p>{error}</p>}

			{!loading && !error && patient && (
				<div className="flex flex-col gap-2">
					<p>
						<span className="font-medium">First Name:</span> {patient.firstName}
					</p>
					<p>
						<span className="font-medium">Last Name:</span> {patient.lastName}
					</p>
					<p>
						<span className="font-medium">Age:</span> {patient.age}
					</p>
				</div>
			)}

			<Link href="/" className="underline underline-offset-4">
				Back to Home
			</Link>
		</main>
	);
}
