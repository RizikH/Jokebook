'use strict'
const { json } = require('express')
const db = require('./db-conn')
const axios = require('axios')

function getAllCategories () {
  let sql = 'SELECT id, name FROM categories;'
  const data = db.all(sql)
  return data
}

function categoryExists (categoryName) {
  const sql = 'SELECT id FROM categories WHERE name = ?'
  return db.get(sql, categoryName)
}
function getId(name){
  const sql = `select id from categories where name =?;`;
  return db.get(sql, name);
}
function createNewCategory (categoryName) {
  if (categoryExists(categoryName)) {
    return;
  }
  const sql = 'INSERT INTO categories (name) VALUES (?);'
  return db.run(sql, categoryName)
}

function createNewJoke (categoryId, setup, delivery) {
  const sql =
    'INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?);'
  return db.run(sql, categoryId, setup, delivery)
}

function getRandom () {
  let sql = `select *
            from jokes j
            join categories c on j.category_id = c.id
            order by random()
            limit 1;
           `
  return db.all(sql)
}

async function getAllByOneAttribute (attribute, category) {
  const searchTerm = `%${category}%`

  let sql = `
  SELECT *
  FROM jokes j
  JOIN categories c ON c.id = j.category_id
  WHERE c.name LIKE ?;
  `
  let data = db.all(sql, searchTerm)

  if (data.length > 0) {
    return data
  } else {
    data = await fetchExternalJokes(category);
    return data;
  }
}

async function getExternalCategories () {
  const apiUrl = 'https://v2.jokeapi.dev/categories'
  const response = await axios.get(apiUrl)

  // Ensure that categories exist in the expected response structure
  if (response.data && response.data.categories) {
    const data = response.data.categories.map(category => ({ category }))
    return data
  } else {
    throw new Error('Categories not found in response data')
  }
}

async function fetchExternalJokes(value) {
  const apiUrl = `https://v2.jokeapi.dev/joke/${value}?format=json&safe-mode&type=twopart&amount=3`;

  try {
    const response = await axios.get(apiUrl);
    const jokes = response.data.jokes || [];

    if (jokes.length > 0) {
      const categoryInfo = createNewCategory(value);
      const categoryId = categoryInfo.lastInsertRowid;

      jokes.forEach(joke => {
        createNewJoke(categoryId, joke.setup, joke.delivery);
      });

      return jokes;
    } else {
      throw new Error('No appropriate jokes found in the external API');
    }
  } catch (error) {
    console.error('Error fetching or processing jokes:', error);
    return [];
  }
}


module.exports = {
  getAllCategories,
  getAllByOneAttribute,
  createNewCategory,
  createNewJoke,
  getRandom,
  getExternalCategories,
  getId
}