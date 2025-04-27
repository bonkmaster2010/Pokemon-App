async function fetchData() {
    const input = document.getElementById("pokemon-name").value.trim().toLowerCase();
    if (!input) return;
    
    const image = document.getElementById("pokemon-sprite");
    const nameDisplay = document.getElementById("pokemon-name-display");
    const typesContainer = document.getElementById("pokemon-types");
    const loading = document.getElementById("loading");
    const errorMsg = document.getElementById("error-message");
    
    // Show loading, hide previous results and errors
    loading.style.display = "block";
    image.style.display = "none";
    nameDisplay.textContent = "";
    typesContainer.innerHTML = "";
    errorMsg.style.display = "none";
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        
        if (!response.ok) {
            throw new Error("Pokémon not found!");
        }
        
        const data = await response.json();
        
        // Display basic info
        nameDisplay.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        
        // Display sprite
        image.src = data.sprites.other["official-artwork"].front_default || 
                     data.sprites.front_default;
        image.style.display = "block";
        
        // Display types
        typesContainer.innerHTML = data.types.map(type => {
            const typeName = type.type.name;
            const typeColor = getTypeColor(typeName);
            return `<span class="type-badge" style="background-color: ${typeColor}">${typeName}</span>`;
        }).join("");
        
        // Display stats
        document.getElementById("hp-value").textContent = data.stats[0].base_stat;
        document.getElementById("atk-value").textContent = data.stats[1].base_stat;
        document.getElementById("def-value").textContent = data.stats[2].base_stat;
        document.getElementById("speed-value").textContent = data.stats[5].base_stat;
        
        // Display abilities
        const abilities = data.abilities.map(ability => 
            ability.ability.name.replace("-", " ")
        );
        
        document.getElementById("ability-1").textContent = abilities[0] || "None";
        document.getElementById("ability-2").textContent = abilities[1] || "None";
        
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = "block";
    } finally {
        loading.style.display = "none";
    }
}

function getTypeColor(type) {
    const typeColors = {
        normal: "#A8A878",
        fire: "#F08030",
        water: "#6890F0",
        electric: "#F8D030",
        grass: "#78C850",
        ice: "#98D8D8",
        fighting: "#C03028",
        poison: "#A040A0",
        ground: "#E0C068",
        flying: "#A890F0",
        psychic: "#F85888",
        bug: "#A8B820",
        rock: "#B8A038",
        ghost: "#705898",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0",
        fairy: "#EE99AC"
    };
    
    return typeColors[type] || "#68A090";
}

// Allow searching with Enter key
document.getElementById("pokemon-name").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        fetchData();
    }
});