const knex = require('../database/knex')

class MoviesNotesController{
    async create(request, response){
        const { title, description, tags, rating } = request.body
        const { user_id } = request.params

        const [moviesNote_id] = await  knex("movies_notes").insert({
            title,
            description,
            rating,
            user_id
        })

      const tagInsert = tags.map(name => {
        return {
            moviesNote_id,
            name,
            user_id
        }
      })
      await knex('movies_tags').insert(tagInsert)

      return response.json()

    }
}

module.exports = MoviesNotesController