const API = "channels.json";

let all = [];
let show = [];

const list = document.getElementById("list");
const video = document.getElementById("video");
const now = document.getElementById("now");

// LOAD CHANNELS
fetch(API)
.then(res => res.json())
.then(data => {
  all = data;
  show = data;
  render();
});

// RENDER CHANNELS
function render(){
  list.innerHTML = "";

  show.forEach(ch => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${ch.logo}">
      <h4>${ch.name}</h4>
      <small>${ch.category}</small>
    `;

    div.onclick = () => play(ch);
    list.appendChild(div);
  });
}

// PLAY VIDEO
function play(ch){
  now.innerText = "Now Playing: " + ch.name;

  const url = ch.stream_url; // IMPORTANT FIX

  if(Hls.isSupported()){
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
  } else {
    video.src = url;
  }

  video.play();
}

// SEARCH
document.getElementById("search").addEventListener("input", e=>{
  let v = e.target.value.toLowerCase();

  show = all.filter(c =>
    c.name.toLowerCase().includes(v)
  );

  render();
});

// FILTER
function filter(cat){
  show = (cat === "All")
    ? all
    : all.filter(c => c.category === cat);

  render();
}
