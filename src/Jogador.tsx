import React, { useState } from "react";
import json from "./jogadores.json";
import "./Jogador.css";

interface Player {
  nome: string;
  card: string;
  overall: number | null;
}

interface PlayerProps {
  posicao: string;
  onPlayerSelecionado: (nomePlayer: string) => void;
  isPlayerSelecionado: (nomePlayer: string) => boolean;
  NomePlayerSelecionado: string;
}

interface Positions {
  [chave: string]: Player[]; 
}

export default function Jogador({
  posicao,
  onPlayerSelecionado,
  isPlayerSelecionado,
  NomePlayerSelecionado,
}: PlayerProps) {
  const [PlayerSelecionado, setPlayerSelecionado] = useState<Player>({
    nome: "Vazio", 
    card: "https://futcardsfifa.com/app/uploads/2024/09/FC25-Gold.png", 
    overall: null, 
  });

  const positions: Positions = json.posicoes;

  function handlePlayerChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nomePlayer = event.target.value;

    const player = positions[posicao].find(
      (p: Player) => p.nome === nomePlayer
    ) || {
      nome: "Vazio", 
      card: "https://futcardsfifa.com/app/uploads/2024/09/FC25-Gold.png",
      overall: null, 
    };

    setPlayerSelecionado(player);

    onPlayerSelecionado(nomePlayer);
  }

  const filteredPlayers = positions[posicao].filter(
    (player) =>
      player.nome !== "Vazio" && 
      (!isPlayerSelecionado(player.nome) ||
        player.nome === NomePlayerSelecionado) 
  );

  return (
    <div className="jogador-container">
      <img
        className="jogador-imagem"
        src={PlayerSelecionado.card} 
        alt={PlayerSelecionado.nome} 
      />

      <div className="seletor-container">
        <select
          id="player"
          value={PlayerSelecionado.nome} 
          onChange={handlePlayerChange}
        >
          <option value="Vazio">Vazio</option>

          {filteredPlayers.map((player: Player) => (
            <option key={player.nome} value={player.nome}>
              {player.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
