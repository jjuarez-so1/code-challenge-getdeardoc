import "./pokedex.scss"

import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import React from "react";
import { useEffect, useState } from "react";
import { TYPES } from "../../inversify/types";
import { LikingService, PokemonRepository } from "../../repositories/interfaces";
import { myContainer } from "../../inversify/inversify.config";
import PokemonDTO from "../../dtos/PokemonDTO";

const Pokedex = () => {
    const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState("name");
    const [isEmpty, setIsEmpty] = useState(false);
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    const pokemonRepository = myContainer.get<PokemonRepository>(TYPES.PokemonRepository);
    const likingService = myContainer.get<LikingService>(TYPES.LikingService);

    useEffect(() => {
        pokemonRepository.getRandomPokemons()
          .then((pokemons) => {
            setPokemons(pokemons);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching random Pokemons:', error);
            setIsLoading(false);
          });
      }, []);

    useEffect(() => {
        const closeSuggestions = (e: any) => {
            if (
                isSuggestionsOpen &&
                e.target.id !== "message" &&
                e.target.closest(".input-text-container") === null
            ) {
                setIsSuggestionsOpen(false);
            }
        };

        const handleKeyPress = (e: any) => {
            if (e.key === "Escape" && isSuggestionsOpen) {
                setIsSuggestionsOpen(false);
            }
        };

        document.addEventListener("click", closeSuggestions);
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("click", closeSuggestions);
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [isSuggestionsOpen]);

    const handleFavoriteClick = async (id: number) => {
        try {
          await likingService.toggleFavoriteStatus(id);
      
          const updatedPokemons = [...pokemons];
          const index = updatedPokemons.findIndex((pokemon) => pokemon.id === id);
          updatedPokemons[index].favorite = !updatedPokemons[index].favorite;
          setPokemons(updatedPokemons);
      
          console.log(`Pokemon ${id} favorite status updated.`);
        } catch (error) {
          console.error('Failed to update favorite status for pokemon:', error);
          alert('Failed to update favorite status.');
        }
      };

    const handleInputChange = (e: any) => {
        const text = e.target.value;
        setSearchText(text);

        const criteriaInput = document.getElementById("search-criteria") as HTMLInputElement | null;

        if (criteriaInput !== null) {
            const criteria = criteriaInput.value;
            setSearchCriteria(criteria);
            fetchSuggestionsFromServer(text, criteria);
            setIsSuggestionsOpen(suggestions.length > 0);
        }

    };

    const fetchSuggestionsFromServer = (text: any, criteria: any) => {
        fetch(`http://localhost:5004/api/v1/suggestions?query=${text}&criteria=${criteria}`)
            .then((response) => response.json())
            .then((data) => {
                setSuggestions(data);
            })
            .catch((error) => {
                console.error("Error fetching suggestions: ", error);
            });
    };

    const handleSuggestionClick = (suggestion: any) => {
        setSearchText(suggestion);
        setSuggestions([]);
    }

    const handleSearch = () => {
        const criteriaInput = document.getElementById("search-criteria") as HTMLInputElement | null;;
        if (criteriaInput !== null) {
            const criteria = criteriaInput.value;

            let baseUrl = "http://localhost:5004/api/v1/search";

            let queryParams = "";
            if (criteria === "NAME") {
                queryParams = `name=${searchText}`;
            } else if (criteria === "TYPE") {
                queryParams = `type=${searchText}`;
            }

            const url = `${baseUrl}?${queryParams}`;
            fetch(url, {
                method: 'GET',
              })
                .then((response) => response.json())
                .then((data) => {
                    setPokemons(data.pokemons);
                    setIsEmpty(data.pokemons.length === 0);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log('Error fetching pokemon data:', error);
                    setIsLoading(false);
                });
        }

    };

    return (
        <div className="pokedexContainer">
            <div className="searchFormContainer">
                <h1>Poke search</h1>
                <form className="poke-search-form" onSubmit={(e) => { e.preventDefault(); }}>
                    <div className="row align-items-end">
                        <div className="col-md-2">
                            <label htmlFor="search-criteria" className="labelForm">Search by:</label>
                            <select id="search-criteria" className="form-select">
                                <option value="NAME">NAME</option>
                                <option value="TYPE">TYPE</option>
                            </select>
                        </div>
                        <div className="col-md-8">
                            <div className="input-text-container">
                                <input
                                    type="text"
                                    id="message"
                                    placeholder="Search..."
                                    value={searchText}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <ul style={{ display: isSuggestionsOpen ? "block" : "none" }}>
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-dark" onClick={handleSearch}>
                                SEARCH
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="pokemonItemsContainer">
    {isEmpty ? (
        <p>Such empty</p>
    ) : (
        pokemons.length > 0 ? (
            pokemons.map((pokemon) => (
                <div key={pokemon.id} className="pokemonItem">
                    {isLoggedIn ? (
                        <div className="favoriteIcon" onClick={() => handleFavoriteClick(pokemon.id)}>
                            {pokemon.favorite ? (
                                <StarOutlinedIcon className="likedPokemonIcon icon" />
                            ) : (
                                <StarBorderPurple500OutlinedIcon className="icon" />
                            )}
                        </div>
                    ) : (
                        <div className="favoriteIcon"></div>
                    )}
                    <div className="imageContainer">
                        <img src={pokemon.imgUrl} alt={pokemon.name} />
                    </div>
                    <p className="pokemonId">#{String(pokemon.id).padStart(3, '0')}</p>
                    <p className="pokemonName">{pokemon.name}</p>
                    <p className="pokemonDescription">
                        {pokemon.description.length > 75
                            ? pokemon.description.substring(0, 75) + "..."
                            : pokemon.description}
                    </p>
                </div>
            ))
        ) : (
            <p>No Pokemons to display</p>
        )
    )}
</div>
        </div>
    )
}

export default Pokedex
