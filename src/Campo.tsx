import { useReducer, useEffect, useRef, useState } from "react";
import "./Campo.css";
import QuatroTresTres from "./formacoes/4-3-3";
import QuatroQuatroDois from "./formacoes/4-4-2";
import TresQuatroTres from "./formacoes/3-4-3";
import json from "./jogadores.json"; // Importando o JSON com os jogadores

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

type GrupoKey = keyof typeof grupos;

interface Player {
  nome: string;
  card: string;
  overall: number | null;
}

interface State {
  formacao: string;
  selectedPlayersByPosition: { [key: string]: string };
}

type Action =
  | { type: "SET_FORMACAO"; payload: string }
  | { type: "SELECT_PLAYER"; payload: { playerName: string; posicao: string } }
  | { type: "RESET_PLAYERS" };

const initialState: State = {
  formacao: "4-3-3",
  selectedPlayersByPosition: {},
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FORMACAO":
      return {
        ...state,
        formacao: action.payload,
        selectedPlayersByPosition: {},
      };

    case "SELECT_PLAYER": {
      const { playerName, posicao } = action.payload;
      return {
        ...state,
        selectedPlayersByPosition: {
          ...state.selectedPlayersByPosition,
          [posicao]: playerName === "Vazio" ? "" : playerName,
        },
      };
    }

    case "RESET_PLAYERS":
      return { ...state, selectedPlayersByPosition: {} };

    default:
      return state;
  }
};

export default function Campo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalOverall, setTotalOverall] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Função para calcular o overall total
  const calcularOverall = () => {
    let overallSoma = 0;

    Object.values(state.selectedPlayersByPosition).forEach((playerName) => {
      const playerData = Object.values(json.posicoes)
        .flat()
        .find((player) => player.nome === playerName);

      if (playerData && playerData.overall) {
        overallSoma += playerData.overall;
      }
    });

    setTotalOverall(overallSoma);
  };

  const handlePlayerSelect = (playerName: string, posicao: string) => {
    dispatch({ type: "SELECT_PLAYER", payload: { playerName, posicao } });

    // Verifica se todas as 11 posições estão preenchidas
    const filledPositions =
      Object.values({
        ...state.selectedPlayersByPosition,
        [posicao]: playerName,
      }).filter((name) => name !== "").length === 11;

    setShowButton(filledPositions);
  };

  const isPlayerSelected = (playerName: string) => {
    return Object.values(state.selectedPlayersByPosition).includes(playerName);
  };

  const renderizarFormacao = () => {
    switch (state.formacao) {
      case "4-3-3":
        return (
          <QuatroTresTres
            handlePlayerSelect={handlePlayerSelect}
            isPlayerSelected={isPlayerSelected}
            selectedPlayersByPosition={state.selectedPlayersByPosition}
          />
        );
      case "3-4-3":
        return (
          <TresQuatroTres
            handlePlayerSelect={handlePlayerSelect}
            isPlayerSelected={isPlayerSelected}
            selectedPlayersByPosition={state.selectedPlayersByPosition}
          />
        );
      case "4-4-2":
        return (
          <QuatroQuatroDois
            handlePlayerSelect={handlePlayerSelect}
            isPlayerSelected={isPlayerSelected}
            selectedPlayersByPosition={state.selectedPlayersByPosition}
          />
        );
      default:
        return (
          <QuatroTresTres
            handlePlayerSelect={handlePlayerSelect}
            isPlayerSelected={isPlayerSelected}
            selectedPlayersByPosition={state.selectedPlayersByPosition}
          />
        );
    }
  };

  useEffect(() => {
    dispatch({ type: "RESET_PLAYERS" });

    if (selectRef.current) {
      selectRef.current.focus();
    }

    setShowButton(false); // Esconde o botão ao trocar formação
    setTotalOverall(0); // Reseta o overall ao mudar formação
  }, [state.formacao]);

  return (
    <div className="container">
      <div className="overall-display">
        <h2>Overall Total: {totalOverall}</h2>
        {showButton && (
          <button onClick={calcularOverall}>Calcular Overall</button>
        )}
        {totalOverall > 0 && (
          <h3
            className={
              totalOverall > 900 ? "mensagem-ganhou" : "mensagem-perdeu"
            }
          >
            {totalOverall > 900
              ? "Você Ganhou!! Seu time fez mais que 900 pontos."
              : "Você não atingiu a pontuação necessária. Tente novamente!"}
          </h3>
        )}
      </div>

      <div className="campo">{renderizarFormacao()}</div>

      {/* Seleção de formação */}
      <div className="selecao-formacao">
        <label htmlFor="formacao-select">Escolha a formação:</label>
        <select
          id="formacao-select"
          value={state.formacao}
          onChange={(e) =>
            dispatch({ type: "SET_FORMACAO", payload: e.target.value })
          }
          ref={selectRef}
        >
          <option value="4-3-3">4-3-3</option>
          <option value="4-4-2">4-4-2</option>
          <option value="3-4-3">3-4-3</option>
        </select>
      </div>
    </div>
  );
}
