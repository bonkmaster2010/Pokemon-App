

async function fetchdata(){
    const input = document.getElementById("pokemon-name").value.toLocaleLowerCase();
    const image = document.getElementById("pokemon-sprite");
    const name = document.getElementById("namesmth")

    // Stats //
    let hp = document.getElementById("hpvalue");
    let atk = document.getElementById("atkvalue");
    let def = document.getElementById("defvalue");
    
    // Abillities //
    let power1 = document.getElementById("power1");
    let power2 = document.getElementById("power2");

   let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
   let data = await res.json();
  // Main //
   name.innerText = data.name.toUpperCase();
   image.style.display = "block";
   image.src = data.sprites.front_default;
   
   // Stats //
   hp.innerText = data.stats[0].base_stat;
   atk.innerText = data.stats[1].base_stat;
   def.innerText = data.stats[2].base_stat;

   // Powers //
   power1.innerText = data.abilities[0].ability.name;
   power2.innerText = data.abilities[1].ability.name;

}