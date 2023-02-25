export interface IPokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: any[];
    forms: any[];
    game_indices: any[];
    held_items: any[];
    location_area_encounters: string;
    moves: any[];
    species: object;
    sprites: object;
    stats: any[];
    types: any[];
}

export interface IPokemonArray {
    count: number;
    next: string;
    previous: string;
    results: IPokemon[];
}

