import React, { useState } from "react";
import data from "./jogadores.json";
import "./Jogador.css";

interface Player {
  nome: string;
  card: string;
}

interface JogadorProps {
  posicao: string;
}

interface Positions {
  [key: string]: Player[];
}

export default function Jogador({ posicao }: JogadorProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>({
    nome: "Vazio",
    card: "https://futcardsfifa.com/app/uploads/2024/09/FC25-Gold.png",
  });

  const positions: Positions = data.posicoes;

  function handlePlayerChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const playerName = event.target.value;
    const player = positions[posicao].find(
      (p: Player) => p.nome === playerName
    ) || {
      nome: "Vazio",
      card: "https://futcardsfifa.com/app/uploads/2024/09/FC25-Gold.png",
    };
    setSelectedPlayer(player);
  }

  return (
    <div className="jogador-container">
      <img className="jogador-imagem" src={selectedPlayer.card} />

      <div className="seletor-container">
        <select
          id="player"
          value={selectedPlayer.nome}
          onChange={handlePlayerChange}
        >
          {positions[posicao].map((player: Player) => (
            <option key={player.nome} value={player.nome}>
              {player.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
