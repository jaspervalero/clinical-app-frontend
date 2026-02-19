import Link from "next/link";

export default function AddPatientPage() {
	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
			<h1 className="text-3xl font-semibold">Add Patient</h1>
			<p className="text-zinc-600 dark:text-zinc-400">
				This is the Add Patient page.
			</p>
			<Link href="/" className="underline underline-offset-4">
				Back to Home
			</Link>
		</main>
	);
}
