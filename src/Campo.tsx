import './Campo.css'
import Card from './Card'
import posicoes from './jogadores.json'

export default function Campo() {
    return (
        <div className='campo'>

            <div className='gol'><Card card={posicoes.posicoes.goleiro[1].card} /></div>
            <div className='ld'><Card card={posicoes.posicoes.lateral_dir[1].card} /></div>
            <div className='zagd'><Card card={posicoes.posicoes.zagueiro[1].card} /></div>
            <div className='zage'><Card card={posicoes.posicoes.zagueiro[2].card} /></div>
            <div className='le'><Card card={posicoes.posicoes.lateral_esq[2].card} /></div>
            <div className='vol'><Card card={posicoes.posicoes.meio[2].card} /></div>
            <div className='mcd'><Card card={posicoes.posicoes.meio[3].card} /></div>
            <div className='mce'><Card card={posicoes.posicoes.meio[5].card} /></div>
            <div className='pd'><Card card={posicoes.posicoes.atacante[2].card} /></div>
            <div className='ata'><Card card={posicoes.posicoes.atacante[3].card} /></div>
            <div className='pe'><Card card={posicoes.posicoes.atacante[5].card} /></div>
        </div>
    )
}