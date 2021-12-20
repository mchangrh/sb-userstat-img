const CATEGORIES_ARR = ["sponsor", "intro", "outro", "interaction", "selfpromo", "music_offtopic", "preview", "poi_highlight", "filler"];
const CATEGORY_COLORS_ARR = ["#00d400", "#00ffff", "#0202ed", "#cc00ff", "#ffff00", "#ff9900", "#008fd6", "#ff1684", "#6600ff"];
const axios = require("axios")
const Canvas = require("canvas")
const BASEURL = "https://sponsor.ajay.app/api"

const categories = async (request, reply) => {
  const userID = request.query.userID;
  const res = await axios.get(`${BASEURL}/userStats?publicUserID=${userID}&fetchCategoryStats=true`)
  const categoryData = Object.values(res.data.categoryCount)
  const total = categoryData.reduce((a, b) => a + b, 0)

  /* canvas stuff goes here

  */
  reply.type("image/png").send(canvas.createPNGStream())
}

module.exports = {
  categories
}