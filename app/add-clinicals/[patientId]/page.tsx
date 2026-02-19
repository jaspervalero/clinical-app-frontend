"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

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
	const [componentName, setComponentName] = useState("");
	const [componentValue, setComponentValue] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

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

	const handleSubmitClinicalData = async (
		event: FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		setSubmitError(null);
		setSubmitSuccess(null);
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/clinicals", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					patient: patientId,
					componentName,
					componentValue,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save clinical data.");
			}

			setSubmitSuccess("Clinical data saved successfully.");
			setComponentName("");
			setComponentValue("");
		} catch {
			setSubmitError("Failed to save clinical data.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
			<h1 className="text-3xl font-semibold">Add Clinical Data</h1>
			<p className="text-zinc-600 dark:text-zinc-400">
				Patient ID: {patientId}
			</p>

			{loading && <p>Loading patient details...</p>}
			{error && <p>{error}</p>}

			{!loading && !error && patient && (
				<>
					<div className="flex flex-col gap-2">
						<p>
							<span className="font-medium">First Name:</span>{" "}
							{patient.firstName}
						</p>
						<p>
							<span className="font-medium">Last Name:</span> {patient.lastName}
						</p>
						<p>
							<span className="font-medium">Age:</span> {patient.age}
						</p>
					</div>

					<form
						onSubmit={handleSubmitClinicalData}
						className="mt-4 flex max-w-md flex-col gap-4"
					>
						<label className="flex flex-col gap-2">
							<span>Component Name</span>
							<input
								type="text"
								value={componentName}
								onChange={(event) => setComponentName(event.target.value)}
								required
								className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700"
							/>
						</label>

						<label className="flex flex-col gap-2">
							<span>Component Value</span>
							<input
								type="text"
								value={componentValue}
								onChange={(event) => setComponentValue(event.target.value)}
								required
								className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700"
							/>
						</label>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-fit rounded-md bg-zinc-900 px-4 py-2 text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-black"
						>
							{isSubmitting ? "Saving..." : "Save Clinical Data"}
						</button>
					</form>

					{submitSuccess && (
						<p className="text-green-600 dark:text-green-400">
							{submitSuccess}
						</p>
					)}
					{submitError && (
						<p className="text-red-600 dark:text-red-400">{submitError}</p>
					)}
				</>
			)}

			<Link href="/" className="underline underline-offset-4">
				Back to Home
			</Link>
		</main>
	);
}
