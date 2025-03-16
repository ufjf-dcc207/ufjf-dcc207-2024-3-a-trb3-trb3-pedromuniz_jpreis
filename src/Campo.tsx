import { useState } from "react";
import "./Campo.css";
import QuatroTresTres from "./formacoes/4-3-3";
import QuatroQuatroDois from "./formacoes/4-4-2";
import TresCincoDois from "./formacoes/3-5-2";

// Grupos de posições
const grupos = {
  atacantes: ["pe", "ata", "pd"],
  meias: ["vol", "mce", "mcd"],
  zagueiros: ["zage", "zagd"],
};

// Tipo para as chaves de `grupos`
type GrupoKey = keyof typeof grupos;

export default function Campo() {
  const [selectedPlayersByGroup, setSelectedPlayersByGroup] = useState<{
    [key in GrupoKey]: Set<string>;
  }>({
    atacantes: new Set(),
    meias: new Set(),
    zagueiros: new Set(),
  });

  const [selectedPlayersByPosition, setSelectedPlayersByPosition] = useState<{
    [key: string]: string;
  }>({});

  const [formacao, setFormacao] = useState<string>("4-3-3");

  const handlePlayerSelect = (playerName: string, posicao: string) => {
    const grupo = Object.keys(grupos).find((grupo) =>
      grupos[grupo as GrupoKey].includes(posicao)
    ) as GrupoKey | undefined;

    if (grupo) {
      setSelectedPlayersByGroup((prev) => {
        const newSelectedPlayersByGroup = { ...prev };

        if (selectedPlayersByPosition[posicao]) {
          newSelectedPlayersByGroup[grupo].delete(
            selectedPlayersByPosition[posicao]
          );
        }

        if (playerName !== "Vazio") {
          newSelectedPlayersByGroup[grupo].add(playerName);
        }

        return newSelectedPlayersByGroup;
      });
    }

    setSelectedPlayersByPosition((prev) => ({
      ...prev,
      [posicao]: playerName,
    }));
  };

  const isPlayerSelected = (playerName: string, posicao: string) => {
    const grupo = Object.keys(grupos).find((grupo) =>
      grupos[grupo as GrupoKey].includes(posicao)
    ) as GrupoKey | undefined;

    if (grupo) {
      return selectedPlayersByGroup[grupo].has(playerName);
    }

    return false;
  };

  // Função para renderizar a formação escolhida
  const renderizarFormacao = () => {
    switch (formacao) {
      case "4-3-3":
        return (
          <QuatroTresTres
            handlePlayerSelect={handlePlayerSelect}
            isPlayerSelected={isPlayerSelected}
            selectedPlayersByPosition={selectedPlayersByPosition}
          />
        );
      case "3-5-2":
        return (
          <TresCincoDois
            handlePlayerSelect={handlePlayerSelect}
            isPlayerSelected={isPlayerSelected}
            selectedPlayersByPosition={selectedPlayersByPosition}
          />
        );
      case "4-4-2":
      default:
        return (
          <QuatroQuatroDois
            handlePlayerSelect={handlePlayerSelect}
            isPlayerSelected={isPlayerSelected}
            selectedPlayersByPosition={selectedPlayersByPosition}
          />
        );
    }
  };

  return (
    <div className="container">
      <div className="campo">{renderizarFormacao()}</div>

      <div className="selecao-formacao">
        <label htmlFor="formacao-select">Escolha a formação:</label>
        <select
          id="formacao-select"
          value={formacao}
          onChange={(e) => setFormacao(e.target.value)}
        >
          <option value="4-4-2">4-4-2</option>
          <option value="4-3-3">4-3-3</option>
          <option value="3-5-2">3-5-2</option>
        </select>
      </div>
    </div>
  );
}
