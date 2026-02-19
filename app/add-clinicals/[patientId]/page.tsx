import Link from "next/link";

type AddClinicalsPageProps = {
	params: Promise<{ patientId: string }>;
};

export default async function AddClinicalsPage({
	params,
}: AddClinicalsPageProps) {
	const { patientId } = await params;

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
			<h1 className="text-3xl font-semibold">Add Clinicals</h1>
			<p className="text-zinc-600 dark:text-zinc-400">
				Managing clinical records for patient ID:
			</p>
			<p className="text-xl font-medium">{patientId}</p>
			<Link href="/" className="underline underline-offset-4">
				Back to Home
			</Link>
		</main>
	);
}
