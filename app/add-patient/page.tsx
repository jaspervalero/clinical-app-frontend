"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

export default function AddPatientPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setSuccess(null);
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/patients", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName,
					lastName,
					age: Number(age),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create patient.");
			}

			setSuccess("Patient created successfully.");
			setFirstName("");
			setLastName("");
			setAge("");
		} catch {
			setError("Failed to create patient.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
			<h1 className="text-3xl font-semibold">Add Patient</h1>

			<form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
				<label className="flex flex-col gap-2">
					<span>First Name</span>
					<input
						type="text"
						value={firstName}
						onChange={(event) => setFirstName(event.target.value)}
						required
						className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700"
					/>
				</label>

				<label className="flex flex-col gap-2">
					<span>Last Name</span>
					<input
						type="text"
						value={lastName}
						onChange={(event) => setLastName(event.target.value)}
						required
						className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700"
					/>
				</label>

				<label className="flex flex-col gap-2">
					<span>Age</span>
					<input
						type="number"
						min={0}
						value={age}
						onChange={(event) => setAge(event.target.value)}
						required
						className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700"
					/>
				</label>

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-fit rounded-md bg-zinc-900 px-4 py-2 text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-black"
				>
					{isSubmitting ? "Creating..." : "Create Patient"}
				</button>
			</form>

			{success && <p className="text-green-600 dark:text-green-400">{success}</p>}
			{error && <p className="text-red-600 dark:text-red-400">{error}</p>}

			<Link href="/" className="underline underline-offset-4">
				Back to Home
			</Link>
		</main>
	);
}
