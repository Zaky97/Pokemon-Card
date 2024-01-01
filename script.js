const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  ghost: "rgba(54, 56, 64, .5)",
  grass: "#a0dd44",
  ground: "#dbbd4b",
  ice: "#9cdff3",
  normal: "#a8a878",
  poison: "#ae64c5",
  psychic: "#eb4074",
  rock: "#d8d8d8",
  steel: "#757575",
  water: "#6ecada",
};
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
  let id = Math.floor(Math.random() * 150) + 1;
  const finalUrl = url + id;
  fetch(finalUrl)
    .then((res) => res.json())
    .then((data) => {
      generatecard(data);
    });
};

let generatecard = (data) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSPeed = data.stats[5].base_stat;

  const themeColor = typeColor[data.types[0].type.name];

  card.innerHTML = `
       <p class="hp">
          <span>HP</span>
        ${hp}
        </p>
        <img src="${imgSrc}" alt="${pokeName}" />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
    
        </div>
        <div class="stats">
          <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${statSPeed}</h3>
            <p>Speed</p>
          </div>
        </div>
      </div>
  `;
  appendTypes(data.types);
  styleCard(themeColor);
};

let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};

let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, white 36%)`;
  card.querySelectorAll(`.types span`).forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};
btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
