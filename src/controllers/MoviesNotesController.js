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

    async show(request, response){
      const { id } = request.params

      const movieNote = await knex("movies_notes").where({ id }).first()
      const movieTags = await knex("movies_tags").where({ moviesNote_id: id}).orderBy("name")

      return response.json({
        ...movieNote,
        movieTags
      })
    }

    async delete(request, response){
      const { id } = request.params

      await knex("movies_notes").where({ id }).delete()

      return response.json()
    }

    async index(request, response){
      const { user_id } = request.query


      const movies_notes = await knex("movies_notes")
      .where({ user_id })
      .orderBy("title")

      return response.json(movies_notes)
    }
}

module.exports = MoviesNotesController