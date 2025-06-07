"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Trophy, 
  Users,
  Percent,
  Calendar,
  Activity,
  Award,
  Zap,
  Timer,
  RefreshCw
} from "lucide-react";

interface TeamStats {
  name: string;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  win_percentage: number;
  form: string[];
  home_advantage: number;
  away_performance: number;
}

interface PredictionStatsProps {
  homeTeam: string;
  awayTeam: string;
  predictionResult?: string;
  confidence?: number;
}

export default function PredictionStats({ 
  homeTeam, 
  awayTeam, 
  predictionResult, 
  confidence 
}: PredictionStatsProps) {
  const [homeStats, setHomeStats] = useState<TeamStats | null>(null);
  const [awayStats, setAwayStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [headToHead, setHeadToHead] = useState<any>(null);

  // Mock data generator for demonstration
  const generateMockStats = (teamName: string): TeamStats => {
    const wins = Math.floor(Math.random() * 15) + 5;
    const draws = Math.floor(Math.random() * 8) + 2;
    const losses = Math.floor(Math.random() * 10) + 3;
    const totalGames = wins + draws + losses;
    
    return {
      name: teamName,
      wins,
      draws,
      losses,
      goals_for: Math.floor(Math.random() * 30) + 20,
      goals_against: Math.floor(Math.random() * 25) + 15,
      win_percentage: Math.round((wins / totalGames) * 100),
      form: generateForm(),
      home_advantage: Math.floor(Math.random() * 40) + 60,
      away_performance: Math.floor(Math.random() * 35) + 45
    };
  };

  const generateForm = (): string[] => {
    const results = ['V', 'E', 'D'];
    return Array.from({ length: 5 }, () => results[Math.floor(Math.random() * results.length)]);
  };

  const generateHeadToHead = () => {
    const homeWins = Math.floor(Math.random() * 8) + 2;
    const awayWins = Math.floor(Math.random() * 6) + 1;
    const draws = Math.floor(Math.random() * 4) + 1;
    
    return {
      total_games: homeWins + awayWins + draws,
      home_wins: homeWins,
      away_wins: awayWins,
      draws,
      last_meetings: [
        { date: "2024-08-15", result: "2-1", winner: homeTeam },
        { date: "2024-03-22", result: "0-0", winner: "Empate" },
        { date: "2023-11-10", result: "1-3", winner: awayTeam },
        { date: "2023-07-05", result: "2-0", winner: homeTeam },
        { date: "2023-04-18", result: "1-1", winner: "Empate" }
      ]
    };
  };

  const loadStats = async () => {
    if (!homeTeam.trim() || !awayTeam.trim()) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setHomeStats(generateMockStats(homeTeam));
      setAwayStats(generateMockStats(awayTeam));
      setHeadToHead(generateHeadToHead());
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (homeTeam && awayTeam) {
      loadStats();
    }
  }, [homeTeam, awayTeam]);

  const getFormIcon = (result: string) => {
    switch (result) {
      case 'V': return <div className="w-3 h-3 bg-green-500 rounded-full" title="Vitória" />;
      case 'E': return <div className="w-3 h-3 bg-yellow-500 rounded-full" title="Empate" />;
      case 'D': return <div className="w-3 h-3 bg-red-500 rounded-full" title="Derrota" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600 bg-green-50";
    if (percentage >= 50) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  if (!homeTeam || !awayTeam) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-gray-600 flex items-center justify-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Estatísticas Detalhadas
          </CardTitle>
          <CardDescription>
            Selecione os times para visualizar as estatísticas
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin" />
            Carregando Estatísticas...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Comparison */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center border-b bg-gradient-to-r from-green-500/10 to-blue-500/10">
          <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Comparação de Desempenho
          </CardTitle>
          <CardDescription>
            Estatísticas detalhadas dos times na temporada atual
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Home Team Stats */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  {homeTeam}
                </h3>
                <p className="text-sm text-gray-600">(Casa)</p>
              </div>
              
              {homeStats && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-green-600" />
                      Vitórias
                    </span>
                    <span className="font-semibold text-green-600">{homeStats.wins}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-yellow-600" />
                      Empates
                    </span>
                    <span className="font-semibold text-yellow-600">{homeStats.draws}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      Derrotas
                    </span>
                    <span className="font-semibold text-red-600">{homeStats.losses}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      Gols Pró/Contra
                    </span>
                    <span className="font-semibold text-blue-600">
                      {homeStats.goals_for}/{homeStats.goals_against}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-purple-600" />
                      % Vitórias
                    </span>
                    <span className={`font-semibold px-2 py-1 rounded ${getPerformanceColor(homeStats.win_percentage)}`}>
                      {homeStats.win_percentage}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Away Team Stats */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  {awayTeam}
                </h3>
                <p className="text-sm text-gray-600">(Visitante)</p>
              </div>
              
              {awayStats && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-green-600" />
                      Vitórias
                    </span>
                    <span className="font-semibold text-green-600">{awayStats.wins}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-yellow-600" />
                      Empates
                    </span>
                    <span className="font-semibold text-yellow-600">{awayStats.draws}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      Derrotas
                    </span>
                    <span className="font-semibold text-red-600">{awayStats.losses}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      Gols Pró/Contra
                    </span>
                    <span className="font-semibold text-blue-600">
                      {awayStats.goals_for}/{awayStats.goals_against}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-purple-600" />
                      % Vitórias
                    </span>
                    <span className={`font-semibold px-2 py-1 rounded ${getPerformanceColor(awayStats.win_percentage)}`}>
                      {awayStats.win_percentage}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              Últimos 5 Jogos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {homeTeam}
                </h4>
                <div className="flex gap-2">
                  {homeStats?.form.map((result, index) => (
                    <div key={index} className="flex items-center">
                      {getFormIcon(result)}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {awayTeam}
                </h4>
                <div className="flex gap-2">
                  {awayStats?.form.map((result, index) => (
                    <div key={index} className="flex items-center">
                      {getFormIcon(result)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Head to Head */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Histórico de Confrontos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {headToHead && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{headToHead.home_wins}</div>
                    <div className="text-xs text-gray-600">{homeTeam}</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">{headToHead.draws}</div>
                    <div className="text-xs text-gray-600">Empates</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{headToHead.away_wins}</div>
                    <div className="text-xs text-gray-600">{awayTeam}</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Últimos Encontros:</h5>
                  <div className="space-y-2">
                    {headToHead.last_meetings.slice(0, 3).map((meeting: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">{meeting.date}</span>
                        <span className="font-medium">{meeting.result}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          meeting.winner === homeTeam ? 'bg-green-100 text-green-700' :
                          meeting.winner === awayTeam ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {meeting.winner}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      {predictionResult && (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Indicadores de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {homeStats?.home_advantage}%
                </div>
                <div className="text-sm text-gray-600">Vantagem em Casa</div>
                <div className="text-xs text-green-600 mt-1">{homeTeam}</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {awayStats?.away_performance}%
                </div>
                <div className="text-sm text-gray-600">Performance Fora</div>
                <div className="text-xs text-blue-600 mt-1">{awayTeam}</div>
              </div>
              
              {confidence && (
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {confidence.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Confiança IA</div>
                  <div className="text-xs text-purple-600 mt-1">Predição</div>
                </div>
              )}
              
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {headToHead?.total_games || 0}
                </div>
                <div className="text-sm text-gray-600">Confrontos</div>
                <div className="text-xs text-orange-600 mt-1">Histórico</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <Button
          onClick={loadStats}
          variant="outline"
          className="flex items-center gap-2"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar Estatísticas
        </Button>
      </div>
    </div>
  );
}