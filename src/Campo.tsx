import { useReducer, useEffect, useRef } from "react";
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

interface State {
  formacao: string;
  selectedPlayersByGroup: { [key in GrupoKey]: Set<string> };
  selectedPlayersByPosition: { [key: string]: string };
}

type Action =
  | { type: "SET_FORMACAO"; payload: string }
  | { type: "SELECT_PLAYER"; payload: { playerName: string; posicao: string } }
  | { type: "RESET_PLAYERS" };

const initialState: State = {
  formacao: "4-3-3",
  selectedPlayersByGroup: {
    atacantes: new Set(),
    meias: new Set(),
    zagueiros: new Set(),
  },
  selectedPlayersByPosition: {},
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FORMACAO":
      return { ...state, formacao: action.payload };
    case "SELECT_PLAYER":
      const { playerName, posicao } = action.payload;
      const grupo = Object.keys(grupos).find((grupo) =>
        grupos[grupo as GrupoKey].includes(posicao)
      ) as GrupoKey | undefined;

      if (grupo) {
        const newSelectedPlayersByGroup = { ...state.selectedPlayersByGroup };

        // Remover jogador anterior da posição
        if (state.selectedPlayersByPosition[posicao]) {
          newSelectedPlayersByGroup[grupo].delete(
            state.selectedPlayersByPosition[posicao]
          );
        }

        // Adicionar novo jogador se ele não estiver em outra posição
        if (playerName !== "Vazio") {
          const isAlreadySelected = Object.values(
            state.selectedPlayersByPosition
          ).includes(playerName);

          if (!isAlreadySelected) {
            newSelectedPlayersByGroup[grupo].add(playerName);
            return {
              ...state,
              selectedPlayersByGroup: newSelectedPlayersByGroup,
              selectedPlayersByPosition: {
                ...state.selectedPlayersByPosition,
                [posicao]: playerName,
              },
            };
          }
        } else {
          return {
            ...state,
            selectedPlayersByGroup: newSelectedPlayersByGroup,
            selectedPlayersByPosition: {
              ...state.selectedPlayersByPosition,
              [posicao]: "",
            },
          };
        }
      }
      return state;
    case "RESET_PLAYERS":
      return {
        ...state,
        selectedPlayersByGroup: initialState.selectedPlayersByGroup,
        selectedPlayersByPosition: initialState.selectedPlayersByPosition,
      };
    default:
      return state;
  }
};

export default function Campo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handlePlayerSelect = (playerName: string, posicao: string) => {
    dispatch({ type: "SELECT_PLAYER", payload: { playerName, posicao } });
  };

  const isPlayerSelected = (playerName: string) => {
    return Object.values(state.selectedPlayersByPosition).includes(playerName);
  };

  // Função para renderizar a formação escolhida
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

  // Resetar jogadores quando a formação mudar
  useEffect(() => {
    dispatch({ type: "RESET_PLAYERS" });

    // Focar no select após mudar a formação
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, [state.formacao]);

  return (
    <div className="container">
      <div className="campo">{renderizarFormacao()}</div>

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