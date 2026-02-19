import Link from "next/link";

export default function Home() {
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
				<Link
					href="/add-clinicals/patient-123"
					className="underline underline-offset-4"
				>
					Add Clinicals (patient ID: patient-123)
				</Link>
			</nav>
		</main>
	);
}
