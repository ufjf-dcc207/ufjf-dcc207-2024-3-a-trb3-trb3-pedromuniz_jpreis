import posicoes from './jogadores.json'
import './Card.css'

export type Cards = {
    card: string;
};

export default function Card({
    card = posicoes.posicoes.goleiro[0].card,
}:Cards){
    return (
        <div className='card'>
            <img src={card} />
        </div>
    )
}