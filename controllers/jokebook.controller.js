'use strict'
const model = require('../models/jokebook.model')

function getAllCategories (req, res, next) {
  try {
    let categoryList = model.getAllCategories()
    // res.json(categoryList)
    res.render('categories', {
      categoryList: categoryList,
      title: 'All categories',
      page: 'All Categories'
    })
  } catch (err) {
    console.error('Error while getting jokes ', err.message)
    next(err)
  }
}

function getRandom (req, res, next) {
  try {
    let jokeList = model.getRandom()
    res.render('jokes', {
      jokeList: jokeList,
      title: 'Random Joke',
      page: 'Random Joke'
    })
    // res.json(jokeList);
  } catch (err) {
    console.error('Error fetching a random joke', err.message)
    next(err)
  }
}

async function getAllByOneAttribute (req, res, next) {
  const { attribute, value } = req.query

  if (!attribute || !value) {
    return res.status(400).send('Invalid Request')
  }

  try {
    const jokeList = await model.getAllByOneAttribute(attribute, value)

    if (jokeList.length > 0) {
      return res.render('jokes', {
        jokeList,
        title: value,
        page: `Category: ${value}`
      })
    }

    const externalCategories = await model.getExternalCategories()
    res.render('external-categories', {
      externalCategories,
      title: value,
      page: `Category: ${value}`
    })
  } catch (err) {
    console.error('Error while getting jokes:', err.message)
    next(err)
  }
}

function renderNewJokeForm (req, res, next) {
  res.render('new-joke', { page: 'Add New Joke:' })
}
function createNew (req, res, next) {
  const { category, setup, delivery } = req.body

  model.createNewCategory(category);
  model.createNewJoke(model.getId(category).id, setup, delivery);

  let jokes = model.getAllByOneAttribute("name", category);

  return res.render('jokes', {
    jokeList: jokes,
    title: category,
    page: category
  })
}

module.exports = {
  getAllCategories,
  getAllByOneAttribute,
  getRandom,
  createNew,
  renderNewJokeForm
}
