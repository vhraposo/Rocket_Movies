const { Router } = require("express")

const usersRoutes = require("./users.routes")
const moviesNotesRoutes = require("./movies_notes.routes")
const tagsRoutes = require("./tags.routes")



const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/moviesNotes", moviesNotesRoutes)
routes.use("/tags", tagsRoutes)



module.exports = routes