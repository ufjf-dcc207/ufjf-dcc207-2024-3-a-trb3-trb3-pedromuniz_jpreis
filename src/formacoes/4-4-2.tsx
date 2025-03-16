import React from "react";
import Jogador from "../Jogador";

interface QuatroQuatroDois {
  handlePlayerSelect: (playerName: string, posicao: string) => void;
  isPlayerSelected: (playerName: string, posicao: string) => boolean;
  selectedPlayersByPosition: { [key: string]: string };
}

const QuatroQuatroDois: React.FC<QuatroQuatroDois> = ({
  handlePlayerSelect,
  isPlayerSelected,
  selectedPlayersByPosition,
}) => {
  return (
    <div className="campo">
      {[
        { className: "gol", posicao: "goleiro" },
        { className: "ld", posicao: "lateral_dir" },
        { className: "zagd", posicao: "zagueiro" },
        { className: "zage", posicao: "zagueiro" },
        { className: "le", posicao: "lateral_esq" },
        { className: "vol", posicao: "meio" },
        { className: "mcd", posicao: "meio" },
        { className: "mce", posicao: "meio" },
        { className: "mei", posicao: "meio" },
        { className: "atae", posicao: "atacante" },
        { className: "atad", posicao: "atacante" },
      ].map(({ className, posicao }) => (
        <div key={className} className={className}>
          <Jogador
            posicao={posicao}
            onPlayerSelecionado={(playerName) =>
              handlePlayerSelect(playerName, className)
            }
            isPlayerSelecionado={(playerName) =>
              isPlayerSelected(playerName, className)
            }
            NomePlayerSelecionado={selectedPlayersByPosition[className] || ""}
          />
        </div>
      ))}
    </div>
  );
};

export default QuatroQuatroDois;
