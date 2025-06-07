"use client";

import { useState } from "react";

export default function PredictPage() {
	const [homeTeam, setHomeTeam] = useState("");
	const [awayTeam, setAwayTeam] = useState("");
	const [result, setResult] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handlePredict = async () => {
		setLoading(true);
		setResult(null);

		try {
			const response = await fetch("http://127.0.0.1:8000/api/predict", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ home_team: homeTeam, away_team: awayTeam }),
			});

			const data = await response.json();

			if (response.ok) {
				setResult(data.result);
			} else {
				setResult(`Erro: ${data.detail}`);
			}
		} catch (error) {
			setResult("Erro ao conectar com o backend.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 max-w-lg mx-auto">
			<h1 className="text-2xl font-bold mb-4">Prever resultado</h1>

			<input
				type="text"
				placeholder="Time da casa"
				className="border p-2 w-full mb-3"
				value={homeTeam}
				onChange={(e) => setHomeTeam(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Time visitante"
				className="border p-2 w-full mb-3"
				value={awayTeam}
				onChange={(e) => setAwayTeam(e.target.value)}
			/>

			<button
				onClick={handlePredict}
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				disabled={loading}
			>
				{loading ? "Calculando..." : "Prever resultado"}
			</button>

			{result && (
				<div className="mt-4 text-lg">
					Resultado previsto: <strong>{result}</strong>
				</div>
			)}
		</div>
	);
}
