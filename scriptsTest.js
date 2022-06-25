const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

//return; // NB! return can not be used in browser DOM.

console.log('===============> fetch begin')
fetch('https://ghibliapi.herokuapp.com/films2')
  .then( (response) => {
    console.log('===============> fetch response got')
    //console.log(response.json())
    //return response.json()
    if(response.ok) {
      return response.json()
    }
    throw new Error('Network response was not ok.');
  }, (err) => {
    // Do something for an error here
    console.log('=======================> fetch error in err: ' + err.message)
  })

  /*
  p
  .then((value) => {
    // fulfillment
  }, (reason) => {
    // rejection
  });
  */

 fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    return response.blob();
  }
  throw new Error('Network response was not ok.');
}).then(function(myBlob) { 
  var objectURL = URL.createObjectURL(myBlob); 
  myImage.src = objectURL; 
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ', error.message);
});
