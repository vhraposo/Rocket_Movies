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
      const { title, user_id, tags } = request.query

      let movies_notes

      if (tags) {
        const filterTags = tags.split(',').map(tag => tag.trim())
  
        movies_notes = await knex("movies_tags")
        .select([
          "movies_notes.id",
          "movies_notes.title",
          "movies_notes.user_id"
        ])
          .where("movies_notes.user_id", user_id)
          .whereLike("movies_notes.title", `%${title}%`)
          .whereIn("name", filterTags)
          .innerJoin("movies_notes", "movies_notes.id", "movies_tags.moviesNote_id")
          .orderBy("movies_notes.title")
          
      } else {
        movies_notes = await knex("movies_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
      }
      return response.json(movies_notes)
    }
}

module.exports = MoviesNotesController