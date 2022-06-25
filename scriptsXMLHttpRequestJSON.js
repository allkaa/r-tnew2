const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

//return; // NB! return can not be used in browser DOM.

///*
var request = new XMLHttpRequest()
console.log('===============> request.readyState: ' + request.readyState)

request.onreadystatechange = () => {
  console.log('===============> request.readyState: ' + request.readyState)
}
console.log('===============> request.open begin')
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true) // true is for asyn open mode, false for syn but depricated.
console.log('===============> request.open done')
console.log('===============> request.send() begin')
request.send() // if syn open case, takes long time up to onreadystatechange = 4.
console.log('===============> request.send() done')
//*/

/* Syn open/send case (depricated):
console.log('===============> Syn Begin of this.responseText <=================')
//console.log(request.responseText)
console.log('===============> Syn End of this.responseText <=================')
// Begin accessing JSON data here
var dataSyn = JSON.parse(request.response)

console.log('=======================> Syn request.status: ' + request.status)
if (request.status >= 200 && request.status < 400) {
  dataSyn.forEach(movie => {
    console.log(movie.title)
  })
} else {
  console.log('=======================> Syn request.status: ' + request.status)
}
console.log('===============> Syn request finished')
*/

// NB! request.onload works only with asyn requsest open mode.
request.onload = function() {
  console.log('===============> request.onload event activated')
  console.log('===============> Begin of this.responseText <=================')
  //console.log(this.responseText)
  console.log('===============> End of this.responseText <=================')
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  console.log('=======================> request.onload event this.status: ' + this.status)
  if (this.status >= 200 && this.status < 400) {
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
  } else {
    console.log('=======================> request.onload event error in this.status: ' + this.status)
    const errorMessage = document.createElement('marquee')
    //let errMsg = "Gah, it's not working!"
    errorMessage.textContent = "Gah, it's not working!"
    app.appendChild(errorMessage)
  }
  console.log('===============> request.onload event finished')
}