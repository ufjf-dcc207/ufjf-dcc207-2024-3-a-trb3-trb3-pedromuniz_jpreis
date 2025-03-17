import { useState, useEffect } from "react";
import "./Campo.css";
import QuatroTresTres from "./formacoes/4-3-3";
import QuatroQuatroDois from "./formacoes/4-4-2";
import TresQuatroTres from "./formacoes/3-4-3";

// Grupos de posições
const grupos = {
  atacantes: ["pe", "pe3", "ata", "atae2", "atad2", "ata3", "pd", "pd3"],
  meias: [
    "vol",
    "vole2",
    "vold2",
    "vole3",
    "vold3",
    "mce",
    "mcd",
    "mce2",
    "mcd2",
    "mce3",
    "mcd3",
  ],
  zagueiros: ["zage", "zagd", "zage3", "zagc3", "zagd3"],
};

// Tipo para as chaves de `grupos`
type GrupoKey = keyof typeof grupos;

export default function Campo() {
  const [formacao, setFormacao] = useState<string>("4-3-3");
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
    const grupo = Object.keys(grupos).find((grupo) =>
      grupos[grupo as GrupoKey].includes(posicao)
    ) as GrupoKey | undefined;

    if (grupo) {
      setSelectedPlayersByGroup((prev) => {
        const newSelectedPlayersByGroup = { ...prev };

        // Remover jogador anterior da posição
        if (selectedPlayersByPosition[posicao]) {
          newSelectedPlayersByGroup[grupo].delete(
            selectedPlayersByPosition[posicao]
          );
        }

        // Adicionar novo jogador se ele não estiver em outra posição
        if (playerName !== "Vazio") {
          const isAlreadySelected = Object.values(
            selectedPlayersByPosition
          ).includes(playerName);

          if (!isAlreadySelected) {
            newSelectedPlayersByGroup[grupo].add(playerName);
            setSelectedPlayersByPosition((prev) => ({
              ...prev,
              [posicao]: playerName,
            }));
          }
        } else {
          // Se for "Vazio", apenas remove o jogador da posição
          setSelectedPlayersByPosition((prev) => ({
            ...prev,
            [posicao]: "",
          }));
        }

        return newSelectedPlayersByGroup;
      });
    }
  };

  const isPlayerSelected = (playerName: string) => {
    return Object.values(selectedPlayersByPosition).includes(playerName);
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
      case "3-4-3":
        return (
          <TresQuatroTres
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

  // Resetar jogadores quando a formação mudar
  useEffect(() => {
    setSelectedPlayersByGroup({
      atacantes: new Set(),
      meias: new Set(),
      zagueiros: new Set(),
    });
    setSelectedPlayersByPosition({});
  }, [formacao]); // O useEffect roda sempre que `formacao` mudar

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
          <option value="4-3-3">4-3-3</option>
          <option value="4-4-2">4-4-2</option>
          <option value="3-4-3">3-4-3</option>
        </select>
      </div>
    </div>
  );
}
