import { useState } from "react";
import "./Campo.css";
import Jogador from "./Jogador";

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
          newSelectedPlayersByGroup[grupo].delete(selectedPlayersByPosition[posicao]);
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
    <div className="campo">
      <div className="gol">
        <Jogador
          posicao="goleiro"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "goleiro")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "goleiro")}
          NomePlayerSelecionado={selectedPlayersByPosition["goleiro"]}
        />
      </div>
      <div className="ld">
        <Jogador
          posicao="lateral_dir"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "lateral_dir")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "lateral_dir")}
          NomePlayerSelecionado={selectedPlayersByPosition["lateral_dir"]}
        />
      </div>
      <div className="zagd">
        <Jogador
          posicao="zagueiro"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "zagd")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "zagd")}
          NomePlayerSelecionado={selectedPlayersByPosition["zagd"]}
        />
      </div>
      <div className="zage">
        <Jogador
          posicao="zagueiro"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "zage")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "zage")}
          NomePlayerSelecionado={selectedPlayersByPosition["zage"]}
        />
      </div>
      <div className="le">
        <Jogador
          posicao="lateral_esq"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "lateral_esq")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "lateral_esq")}
          NomePlayerSelecionado={selectedPlayersByPosition["lateral_esq"]}
        />
      </div>
      <div className="vol">
        <Jogador
          posicao="meio"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "vol")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "vol")}
          NomePlayerSelecionado={selectedPlayersByPosition["vol"]}
        />
      </div>
      <div className="mcd">
        <Jogador
          posicao="meio"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "mcd")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "mcd")}
          NomePlayerSelecionado={selectedPlayersByPosition["mcd"]}
        />
      </div>
      <div className="mce">
        <Jogador
          posicao="meio"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "mce")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "mce")}
          NomePlayerSelecionado={selectedPlayersByPosition["mce"]}
        />
      </div>
      <div className="pd">
        <Jogador
          posicao="atacante"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "pd")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "pd")}
          NomePlayerSelecionado={selectedPlayersByPosition["pd"]}
        />
      </div>
      <div className="ata">
        <Jogador
          posicao="atacante"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "ata")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "ata")}
          NomePlayerSelecionado={selectedPlayersByPosition["ata"]}
        />
      </div>
      <div className="pe">
        <Jogador
          posicao="atacante"
          onPlayerSelecionado={(playerName) => handlePlayerSelect(playerName, "pe")}
          isPlayerSelecionado={(playerName) => isPlayerSelected(playerName, "pe")}
          NomePlayerSelecionado={selectedPlayersByPosition["pe"]}
        />
      </div>
    </div>
  );
}