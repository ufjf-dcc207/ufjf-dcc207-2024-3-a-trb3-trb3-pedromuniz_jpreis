import React from "react";
import Jogador from "../Jogador";
import "./3-4-3.css";

interface TresQuatroTresProps {
  handlePlayerSelect: (playerName: string, posicao: string) => void;
  isPlayerSelected: (playerName: string, posicao: string) => boolean;
  selectedPlayersByPosition: { [key: string]: string };
}

const TresQuatroTres: React.FC<TresQuatroTresProps> = ({
  handlePlayerSelect,
  isPlayerSelected,
  selectedPlayersByPosition,
}) => {
  return (
    <div className="campo">
      {[
        { className: "gol3", posicao: "goleiro" },
        { className: "zage3", posicao: "zagueiro" },
        { className: "zagc3", posicao: "zagueiro" },
        { className: "zagd3", posicao: "zagueiro" },
        { className: "vole3", posicao: "meio" },
        { className: "vold3", posicao: "meio" },
        { className: "mce3", posicao: "meio" },
        { className: "mcd3", posicao: "meio" },
        { className: "pe3", posicao: "atacante" },
        { className: "ata3", posicao: "atacante" },
        { className: "pd3", posicao: "atacante" },
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

export default TresQuatroTres;
