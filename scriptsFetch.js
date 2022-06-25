const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

//return; // NB! return can not be used in browser DOM.

let crucialNetErr = true
console.log('===============> fetch begin')
  //fetch('https://ghibliapi.herokuapp.com/films')
  //fetch('https://ghibliapi.herokuapp.com/films2')
  //fetch('http://10.8.194.3:13000/')
fetch('https://ghibliapi.herokuapp.com/films')
.then(response => {
  crucialNetErr = false
    console.log('===============> fetch response got response.ok as ' + response.ok)
    //return response.json()
    if(response.ok) {
      //console.log(response.text())
      return response.json()
    }
    /*
      response.status 404
      response.statusText: "Not Found"
    */
   throw new Error(`${response.status} - ${response.statusText}`) // will be catche by final .catch().
   //throw new Error('Network response was not ok.') // will be catche by final .catch().
  })
.then(data => {
    console.log('===============> render fetched JSON in data object')
    // Work with JSON data here
    //console.log(data)
    data.forEach(movie => {
      // Create a div with a card class
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      // Create an h1 and set the text content to the film's title
      const h1 = document.createElement('h1')
      h1.textContent = movie.title

      // Create a p and set the text content to the film's description
      const p = document.createElement('p')
      movie.description = movie.description.substring(0, 300) // Limit to 300 chars
      p.textContent = `${movie.description}...` // End with an ellipses

      // Append the cards to the container element
      container.appendChild(card)

      // Each card will contain an h1 and a p
      card.appendChild(h1)
      card.appendChild(p)
    })
})
.catch(err => { // catch network error and artificially thrown Error in very first then().
    // Do something for crucial or non-crucial error e.g. 404 here
    const errorMessage = document.createElement('p')
    if (crucialNetErr) {
      console.log('=======================> fetch Crucial error: ' + err.message)
      //const errorMessage = document.createElement('marquee') // obsolate.
      //let errMsg = "Gah, it's not working!"
      //errorMessage.textContent = "Gah, it's not working!"
      errorMessage.textContent = 'Network response NOT got: ' + err.message
    }
    else {
      console.log('=======================> fetch Non-crucial error: ' + err.message)
      //const errorMessage = document.createElement('marquee') // obsolate.
      //let errMsg = "Gah, it's not working!"
      //errorMessage.textContent = "Gah, it's not working!"
      errorMessage.textContent = 'Network response: ' + err.message
    }
    app.appendChild(errorMessage)
  })
/* NB! The fetch() promise will reject with a TypeError only when a crucial network error is encountered or 
    CORS is misconfigured on the server side, although this usually means permission issues or similar.
*/