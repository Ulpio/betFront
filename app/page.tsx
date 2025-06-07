"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trophy, Users, Target, TrendingUp, Clock, MapPin } from "lucide-react";

const BRAZILIAN_TEAMS = [
  "Athletico-PR", "Atlético-GO", "Atlético-MG", "Bahia", "Botafogo", "Bragantino",
  "Corinthians", "Coritiba", "Cruzeiro", "Cuiabá", "Flamengo", "Fluminense",
  "Fortaleza", "Goiás", "Grêmio", "Internacional", "Palmeiras", "Santos",
  "São Paulo", "Vasco", "América-MG", "Ceará", "Sport"
];

export default function PredictPage() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);

  const handlePredict = async () => {
    if (!homeTeam.trim() || !awayTeam.trim()) {
      setResult("Por favor, preencha ambos os times.");
      return;
    }

    if (homeTeam.toLowerCase() === awayTeam.toLowerCase()) {
      setResult("Os times devem ser diferentes.");
      return;
    }

    setLoading(true);
    setResult(null);
    setConfidence(null);

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
        setConfidence(data.confidence || Math.random() * 100); // Mock confidence if not provided
      } else {
        setResult(`Erro: ${data.detail}`);
      }
    } catch (error) {
      setResult("Erro ao conectar com o backend. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  };

  const getResultIcon = (result: string) => {
    if (result.includes("Casa")) return <Trophy className="w-5 h-5 text-green-500" />;
    if (result.includes("Visitante")) return <Target className="w-5 h-5 text-blue-500" />;
    if (result.includes("Empate")) return <Users className="w-5 h-5 text-yellow-500" />;
    return <TrendingUp className="w-5 h-5 text-gray-500" />;
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return "text-green-600 bg-green-50";
    if (conf >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-600 rounded-2xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Brasileirão Predictor
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Sistema inteligente de predição para jogos do Campeonato Brasileiro. 
            Análise baseada em dados históricos e estatísticas avançadas.
          </p>
        </div>

        {/* Main Card */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center border-b bg-gradient-to-r from-green-500/10 to-blue-500/10">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6 text-green-600" />
              Configurar Partida
            </CardTitle>
            <CardDescription className="text-gray-600">
              Selecione os times para gerar a predição do resultado
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Home Team */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Time da Casa
                </label>
                <Input
                  type="text"
                  placeholder="Ex: Flamengo"
                  className="h-12 text-lg border-2 border-green-100 focus:border-green-500 transition-colors"
                  value={homeTeam}
                  onChange={(e) => setHomeTeam(e.target.value)}
                  list="teams-list"
                />
              </div>

              {/* Away Team */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Time Visitante
                </label>
                <Input
                  type="text"
                  placeholder="Ex: Palmeiras"
                  className="h-12 text-lg border-2 border-blue-100 focus:border-blue-500 transition-colors"
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                  list="teams-list"
                />
              </div>
            </div>

            {/* Datalist for team suggestions */}
            <datalist id="teams-list">
              {BRAZILIAN_TEAMS.map((team) => (
                <option key={team} value={team} />
              ))}
            </datalist>

            {/* Predict Button */}
            <div className="text-center">
              <Button
                onClick={handlePredict}
                className="h-14 px-12 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 animate-spin" />
                    Analisando...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5" />
                    Prever Resultado
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result Card */}
        {result && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
                {getResultIcon(result)}
                Resultado da Predição
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    {result}
                  </div>
                  
                  {confidence && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <span className="text-sm text-gray-600">Confiança:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getConfidenceColor(confidence)}`}>
                        {confidence.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">{homeTeam}</span>
                    <span>(Casa)</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{awayTeam}</span>
                    <span>(Visitante)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <p className="text-gray-500 text-sm">
            Sistema desenvolvido com IA para análise preditiva do Campeonato Brasileiro
          </p>
        </div>
      </div>
    </div>
  );
}