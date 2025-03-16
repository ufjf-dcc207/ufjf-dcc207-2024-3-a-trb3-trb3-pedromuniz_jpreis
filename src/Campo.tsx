import { useState } from "react";
import "./Campo.css";
import QuatroTresTres from "./formacoes/4-3-3";
import QuatroQuatroDois from "./formacoes/4-4-2";

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

  const handlePlayerSelect = (playerName: string, posicao: string) => {
    // Encontra o grupo da posição atual
    const grupo = Object.keys(grupos).find((grupo) =>
      grupos[grupo as GrupoKey].includes(posicao)
    ) as GrupoKey | undefined;

    if (grupo) {
      setSelectedPlayersByGroup((prev) => {
        const newSelectedPlayersByGroup = { ...prev };

        // Remove o jogador anteriormente selecionado nesta posição
        if (selectedPlayersByPosition[posicao]) {
          newSelectedPlayersByGroup[grupo].delete(
            selectedPlayersByPosition[posicao]
          );
        }

        // Adiciona o novo jogador selecionado
        if (playerName !== "Vazio") {
          newSelectedPlayersByGroup[grupo].add(playerName);
        }

        return newSelectedPlayersByGroup;
      });
    }

    // Atualiza o jogador selecionado nesta posição
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

  return (
    <div>
      <div className="campo">
        <QuatroQuatroDois
          handlePlayerSelect={handlePlayerSelect}
          isPlayerSelected={isPlayerSelected}
          selectedPlayersByPosition={selectedPlayersByPosition}
        />
      </div>
      <select className="slct_form">
        <option value="433">4-3-3</option>
        <option value="442">4-4-2</option>
        <option value="451">4-5-1</option>
      </select>
    </div>
  );
}
