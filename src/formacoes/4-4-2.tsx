import React from "react";
import Jogador from "../Jogador";
import "./4-4-2.css";

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
        { className: "gol2", posicao: "goleiro" },
        { className: "ld2", posicao: "lateral_dir" },
        { className: "zagd2", posicao: "zagueiro" },
        { className: "zage2", posicao: "zagueiro" },
        { className: "le2", posicao: "lateral_esq" },
        { className: "vole2", posicao: "meio" },
        { className: "vold2", posicao: "meio" },
        { className: "mcd2", posicao: "meio" },
        { className: "mce2", posicao: "meio" },
        { className: "atae2", posicao: "atacante" },
        { className: "atad2", posicao: "atacante" },
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
