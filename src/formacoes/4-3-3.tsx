import React from "react";
import Jogador from "../Jogador";
import "./4-3-3.css";

interface QuatroTresTresProps {
  handlePlayerSelect: (playerName: string, posicao: string) => void;
  isPlayerSelected: (playerName: string, posicao: string) => boolean;
  selectedPlayersByPosition: { [key: string]: string };
}

const QuatroTresTres: React.FC<QuatroTresTresProps> = ({
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
        { className: "pd", posicao: "atacante" },
        { className: "ata", posicao: "atacante" },
        { className: "pe", posicao: "atacante" },
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

export default QuatroTresTres;