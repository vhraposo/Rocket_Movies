const { Router } = require("express")

const usersRoutes = require("./users.routes")
const moviesNotesRoutes = require("./movies_notes.routes")


const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/moviesNotes", moviesNotesRoutes)


module.exports = routes