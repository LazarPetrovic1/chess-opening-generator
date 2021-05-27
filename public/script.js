const generator = document.querySelector("button")
const nameTag = document.querySelector("#name")
const movesTag = document.querySelector("#moves")

function spawnBoard(config) {
  const board = Chessboard("board", config)
}

function setText(name, moves) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name, moves })
    }, 500);
  });
}

async function getOpening() {
  nameTag.textContent = "Loading..."
  movesTag.textContent = "Loading..."
  const opening = await fetch(`http://localhost:3000/openings`);
  const data = await opening.json()
  const { eco, fen, moves, name } = await data
  const config = {
    position: fen,
    pieceTheme: `/pieces/{piece}.png`
  }
  await spawnBoard(config)
  setText(name, moves).then(val => {
    nameTag.textContent = val.name;
    movesTag.textContent = val.moves
  }).catch(e => console.warn(e.message))
}

generator.addEventListener("click", getOpening)

spawnBoard(null)
