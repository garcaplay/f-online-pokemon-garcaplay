import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PokeCard extends Component {
    isPaint(){
        if(this.props.pokemonDetailsOrdered.length === this.props.limit){
            const filteredPokemons = this.props.pokemonDetailsOrdered.filter(pokemon => pokemon.name.toLowerCase().includes(this.props.filterIt.toLowerCase()));
            
                return(
                    filteredPokemons.map((poke, index) => {
                    return(
                        <li className="List__item" key={index}>
                            <Link to={`/detail/${index}`}>
                                <div className="List__item-card">
                                    <div className="Card__header">
                                        <div className="Card__id">
                                            ID/#{poke.id}
                                        </div>
                                        <img src={poke.sprites.front_default} className="Card__img" alt={poke.name}/>
                                    </div>
                                    <div className="Card__body">
                                        <h2 className="Card__title">{poke.name}</h2>
                                        <div className="Card__evolution">
                                                <p>Previous form: {this.isEvolved(poke)}</p> 
                                        </div>
                                        <div className="Card__chips">
                                            <ul className="Card__chips-list">
                                                {poke.types.map((chip, index)=>{
                                                    return(
                                                        <li className="Chips__list-item" key={index}>
                                                            <h3>{chip.type.name}</h3>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )})   
                )
                
        } else {
            return(<div>Loading, please wait...</div>)
        }
    }

    isEvolved(poke){
        const evolutions = this.props.pokemonEvolutions
        for(let i=0; i<evolutions.length; i++){
            let noEvol = evolutions[i].chain.species.name;
            if(noEvol.includes(poke.name)){
                const text = 'no previous form';
                return text                   
            } else{
                for(let j=0; j<evolutions[i].chain.evolves_to.length; j++){
                    let firstEvol = evolutions[i].chain.evolves_to[j].species.name;
                    if(firstEvol.includes(poke.name)){
                        return noEvol;             
                    } else {
                        for(let n=0; n<evolutions[i].chain.evolves_to[j].evolves_to.length; n++){
                            let secondEvol = evolutions[i].chain.evolves_to[j].evolves_to[n].species.name;
                            if(secondEvol.includes(poke.name)){
                                const text = `${noEvol} and ${firstEvol}`
                                return text;            
                            } 
                        }
                    }
                }
            }
        }
    }

    render() {
        return (
            this.isPaint() 
        )
    }
}

export default PokeCard;