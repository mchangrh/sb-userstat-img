const CATEGORIES_ARR = ["Sponsor", "Intro", "Outro", "Interaction Reminder", "Selfpromo", "Music: Non-Nusic", "Preview", "Highlight", "Filler"];
const CATEGORY_COLORS_ARR = ["#00d400", "#00ffff", "#0202ed", "#cc00ff", "#ffff00", "#ff9900", "#008fd6", "#ff1684", "#6600ff"];
const axios = require("axios")
const Canvas = require("canvas")
const BASEURL = "https://sponsor.ajay.app/api"

const stats = async (request, reply) => {
  const userID = request.query.userID;
  const res = await axios.get(`${BASEURL}/userStats?publicUserID=${userID}&fetchCategoryStats=true`)
  const formatThousand = (num) => {
    const k = num/1000
    const dec = k+"".split('.')[1]?.len
    return dec < 2 ? k : k.toFixed(1)
  }
  const categoryData = Object.values(res.data.categoryCount).map(x => x > 1000 ? formatThousand(x) + "k" : x)
  const canvas = Canvas.createCanvas(360, 210);
  const ctx = canvas.getContext("2d");
  // load icon
  const img = new Canvas.Image();
  img.onload = () => ctx.drawImage(img, 267, 197)
  img.onerror = err => { throw err }
  img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAQFJREFUKFNN0L8rxGEcB/DX89zpIha3mG6xXjL6G0ySIpsY2f2YFcMtIhMrBiab0WSjKGI0uVLKFXHfR8/3bvAsT59Pr+f5fHqHxAjGC6bQxDASOrjvcjPAS+iyhUZkFoMY0Ds/ia/EOV4zPI4soqZWo9Hg+blvy+u74CTDvchSObJe5/GRw0NaLT4+8g6dxHH4ZSWyE6iX8OmJ0VGur5mbU7Tb75H1kJgsWI6sljCDqys2N+l0FBxEjjIcKtgIzIRqtVn+1m6TUh77kLiI7Ia8bWKiYCGy1o8ntz8L9iOngbsS9vF0l7EK27nux/ZW5TLX/2H4YbLCfOy9PcNt6IXvD57QVFrYzmyyAAAAAElFTkSuQmCC'
  // title
  ctx.font = "medium 20px Roboto";
  ctx.fillStyle = "white";
  ctx.fillText(`${res.data.userName}'s SponsorBlock Stats`, 10, 25)
  // category test
  ctx.font = "medium 15px Roboto";
  for (let i = 0; i < categoryData.length; i++) {
    let rectY = 45 + (i * 18);
    // create circles
    ctx.fillStyle = CATEGORY_COLORS_ARR[i];
    ctx.beginPath();
    ctx.arc(20, rectY, 5, 0, Math.PI * 2, true);
    ctx.stroke()
    ctx.fill();
    // create label text
    ctx.fillText(CATEGORIES_ARR[i], 30, rectY+5);
    // set number of submission
    //ctx.fillStyle = "black";
    ctx.fillText(categoryData[i], 200, rectY+5);
  }
  // url
  ctx.fillStyle = "white";
  ctx.font = "medium 10px Roboto";
  ctx.fillText("sponsor.ajay.app", 280, 205);
  // export
  reply.type("image/png").send(canvas.createPNGStream())
}

module.exports = {
  stats
}