import "./Campo.css";
import Jogador from "./Jogador";

export default function Campo() {
  return (
    <div className="campo">
      <div className="gol">
        <Jogador posicao="goleiro" />
      </div>
      <div className="ld">
        <Jogador posicao="lateral_dir" />
      </div>
      <div className="zagd">
        <Jogador posicao="zagueiro" />
      </div>
      <div className="zage">
        <Jogador posicao="zagueiro" />
      </div>
      <div className="le">
        <Jogador posicao="lateral_esq" />
      </div>
      <div className="vol">
        <Jogador posicao="meio" />
      </div>
      <div className="mcd">
        <Jogador posicao="meio" />
      </div>
      <div className="mce">
        <Jogador posicao="meio" />
      </div>
      <div className="pd">
        <Jogador posicao="atacante" />
      </div>
      <div className="ata">
        <Jogador posicao="atacante" />
      </div>
      <div className="pe">
        <Jogador posicao="atacante" />
      </div>
    </div>
  );
}

//
