const knex = require("../database/knex")

class TagsControler{
    async index(request, response){
        const { user_id } = request.params

        const tags = await knex("movies_tags")
        .where({ user_id })

        return response.json(tags)
    }
}

module.exports = TagsControler