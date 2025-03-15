import React, { useState } from "react";
import json from "./jogadores.json";
import "./Jogador.css";

// Interface que define a estrutura de um jogador
interface Player {
  nome: string; // Nome do jogador
  card: string; // URL da imagem do card do jogador
}

// Interface que define as propriedades do componente Jogador
interface PlayerProps {
  posicao: string; // Posição do jogador (ex: "goleiro", "atacante")
  onPlayerSelecionado: (nomePlayer: string) => void; // Função chamada quando um jogador é selecionado
  isPlayerSelecionado: (nomePlayer: string) => boolean; // Função que verifica se um jogador já foi selecionado
  NomePlayerSelecionado: string; // Nome do jogador atualmente selecionado nesta posição
}

// Interface que define a estrutura das posições, onde cada chave é uma posição e o valor é uma lista de jogadores
interface Positions {
  [chave: string]: Player[]; // Ex: { "goleiro": [{ nome: "Jogador1", card: "url1" }, ...] }
}

// Componente Jogador
export default function Jogador({
  posicao,
  onPlayerSelecionado,
  isPlayerSelecionado,
  NomePlayerSelecionado,
}: PlayerProps) {

  // Estado que armazena o jogador selecionado atualmente
  const [PlayerSelecionado, setPlayerSelecionado] = useState<Player>({
    nome: "Vazio", // Valor inicial: "Vazio"
    card: "https://futcardsfifa.com/app/uploads/2024/09/FC25-Gold.png", // Imagem padrão para "Vazio"
  });

  // Extrai as posições e jogadores do arquivo JSON importado
  const positions: Positions = json.posicoes;

  // Função chamada quando o valor do seletor é alterado
  function handlePlayerChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nomePlayer = event.target.value; // Nome do jogador selecionado no seletor

    // Encontra o jogador selecionado na lista de jogadores da posição atual
    const player = positions[posicao].find(
      (p: Player) => p.nome === nomePlayer
    ) || {
      nome: "Vazio", // Se não encontrar, usa o valor padrão "Vazio"
      card: "https://futcardsfifa.com/app/uploads/2024/09/FC25-Gold.png", // Imagem padrão para "Vazio"
    };

    // Atualiza o estado do jogador selecionado
    setPlayerSelecionado(player);

    // Chama a função onPlayerSelecionado para notificar o componente pai sobre a seleção
    onPlayerSelecionado(nomePlayer);
  }

  // Filtra os jogadores para remover duplicatas de "Vazio" e jogadores já selecionados em outras posições
  const filteredPlayers = positions[posicao].filter(
    (player) =>
      player.nome !== "Vazio" && // Remove a opção "Vazio" da lista de jogadores
      (!isPlayerSelecionado(player.nome) || player.nome === NomePlayerSelecionado) // Mantém o jogador selecionado nesta posição
  );


  return (
    <div className="jogador-container">
      {/* Exibe a imagem do card do jogador selecionado */}
      <img
        className="jogador-imagem"
        src={PlayerSelecionado.card} // URL da imagem do card
        alt={PlayerSelecionado.nome} // Texto alternativo com o nome do jogador
      />

      {/* Container do seletor de jogadores */}
      <div className="seletor-container">
        <select
          id="player"
          value={PlayerSelecionado.nome} // Valor selecionado no seletor
          onChange={handlePlayerChange} // Função chamada ao mudar a seleção
        >
          {/* Opção "Vazio" manual */}
          <option value="Vazio">Vazio</option>

          {/* Lista de jogadores filtrada */}
          {filteredPlayers.map((player: Player) => (
            <option key={player.nome} value={player.nome}>
              {player.nome} {/* Exibe o nome do jogador como opção */}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}