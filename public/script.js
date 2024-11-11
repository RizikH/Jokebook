'use strict'

document.addEventListener('DOMContentLoaded', () => {
  search()
//   const form = document.getElementById('jokeForm')
//   form.addEventListener('submit', handleFormSubmission)
})

function search () {
  const searchBar = document.querySelector('.search-bar')
  searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      location.href = `/jokebook?attribute=name&value=${searchBar.value}`
    }
  })
}

// function handleFormSubmission (event) {
//   event.preventDefault()

//   const category = document.getElementById('category').value
//   const setup = document.getElementById('setup').value
//   const delivery = document.getElementById('delivery').value

//   const data = {
//     category: category,
//     setup: setup,
//     delivery: delivery
//   }

//   fetch('http://localhost:3000/jokebook/new', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`)
//       }
//       return response.json()
//     })
//     .then(data => {
//       console.log('Success:', data)
//     })
//     .catch(error => {
//       console.error('Error:', error)
//     })
// }
