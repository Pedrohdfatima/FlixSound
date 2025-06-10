import React, { useState } from "react";

const Dashboard = ({ token }) => {
    const [searchKey, setSearchKey] = useState("");
    const [tracks, setTracks] = useState([]);

    // --- FUNÇÃO CORRIGIDA ---
    const searchTracks = async (e) => {
        e.preventDefault();
        
        // URL real da API de busca do Spotify
        const endpoint = 'https://api.spotify.com/v1/search';
        const params = new URLSearchParams({
            q: searchKey,
            type: 'track',
            limit: 10,
        });

        // 1. A chamada fetch que estava faltando foi adicionada.
        //    Ela faz a busca na API usando o seu token de autorização.
        const response = await fetch(`${endpoint}?${params.toString()}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // 2. A resposta da API é transformada em um objeto JSON que podemos usar.
        const data = await response.json();

        // 3. Usamos a variável correta 'data' e a propriedade correta 'items'.
        //    Adicionei uma verificação 'if (data.tracks)' para evitar erros caso a busca não retorne nada.
        if (data.tracks) {
            setTracks(data.tracks.items);
        }
    }
    // --- FIM DA FUNÇÃO CORRIGIDA ---

    return (
        <div>
            <form onSubmit={searchTracks}>
                <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>
            <div>
                {tracks.map((track) => (
                    <div key={track.id}>
                        <img src={track.album.images[0]?.url} alt={track.name} width="64" />
                        <p>{track.name} - {track.artists[0].name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;