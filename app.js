const API = "channels.json";

let all = [];

const list = document.getElementById("list");
const video = document.getElementById("video");
const now = document.getElementById("now");

// LOAD CHANNELS
fetch(API)
.then(res => res.json())
.then(data => {
  all = data;
  render();
});

// RENDER CHANNELS
function render(){
  list.innerHTML = "";

  all.forEach(ch => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${ch.logo}">
      <h4>${ch.name}</h4>
    `;

    div.onclick = () => play(ch);
    list.appendChild(div);
  });
}

// PLAY STREAM
function play(ch){
  now.innerText = "Now Playing: " + ch.name;

  const url = ch.stream_url;

  if(Hls.isSupported()){
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
  } else {
    video.src = url;
  }

  video.play();
}
