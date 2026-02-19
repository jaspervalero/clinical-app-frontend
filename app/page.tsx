"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Patient = {
	_id: string;
	firstName: string;
	lastName: string;
	age: number;
	gender: string;
};

export default function Home() {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPatients = async () => {
			try {
				const response = await fetch("/api/patients");
				if (!response.ok) {
					throw new Error("Unable to fetch patient details.");
				}

				const data = (await response.json()) as { patients: Patient[] };
				setPatients(data.patients);
			} catch {
				setError("Unable to fetch patient details.");
			} finally {
				setLoading(false);
			}
		};

		void fetchPatients();
	}, []);

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
			<h1 className="text-3xl font-semibold">Home</h1>
			<p className="text-zinc-600 dark:text-zinc-400">
				Choose a route to navigate.
			</p>

			<nav className="flex flex-col gap-3">
				<Link href="/" className="underline underline-offset-4">
					Home
				</Link>
				<Link href="/add-patient" className="underline underline-offset-4">
					Add Patient
				</Link>
			</nav>

			<section className="mt-4">
				<h2 className="mb-3 text-2xl font-semibold">Patient Details</h2>
				{loading && <p>Loading patient details...</p>}
				{error && <p>{error}</p>}

				{!loading && !error && (
					<table className="w-full border-collapse border border-zinc-300 text-left text-sm dark:border-zinc-700">
						<thead>
							<tr>
								<th className="border border-zinc-300 px-3 py-2 dark:border-zinc-700">
									First Name
								</th>
								<th className="border border-zinc-300 px-3 py-2 dark:border-zinc-700">
									Last Name
								</th>
								<th className="border border-zinc-300 px-3 py-2 dark:border-zinc-700">
									Age
								</th>
								<th className="border border-zinc-300 px-3 py-2 dark:border-zinc-700">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{patients.map((patient) => (
								<tr key={patient._id}>
									<td className="border border-zinc-300 px-3 py-2 dark:border-zinc-700">
										{patient.firstName}
									</td>
									<td className="border border-zinc-300 px-3 py-2 dark:border-zinc-700">
										{patient.lastName}
									</td>
									<td className="border border-zinc-300 px-3 py-2 dark:border-zinc-700">
										{patient.age}
									</td>
									<td className="border border-zinc-300 px-3 py-2 dark:border-zinc-700">
										<Link
											href={`/add-clinicals/${patient._id}`}
											className="underline underline-offset-4"
										>
											Add Clinical Data
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</section>
		</main>
	);
}
