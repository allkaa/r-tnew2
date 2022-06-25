// NB! Capitalize custom components name to differentiate them from regular HTML elements).
import React, { Component } from 'react'

// Custom Controlled Component:
class NameForm extends Component {
  constructor(props) {
    console.log('========> NameForm constructor <==========')
    super(props);
    this.state = {
      name:
        'Alex Raven',
      essay:
        '',
      fruit:
        ['Coconut','Lime']
    }; // very initial value.
    console.log(this.state.name);
    console.log(this.state.essay);
    console.log(this.state.fruit);
  }

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    console.log('========> NameForm componentDidMount <==========')
    console.log(this.state.name);
    this.setState({name: this.state.name.toUpperCase()})
    console.log(this.state.name);
    console.log(this.state.essay);
    console.log(this.state.fruit);
  }

  render() {
    return (
    <div>

      <header>
        <h1>Birdwatching</h1>
        <input type="search" id="site-search" name="q" aria-label="Search through site content"/>
        <button>Search</button>
        <img src="dove.png" alt="a simple dove logo"/>
      </header>

      <nav>
        <ul>
          <li><span>Home</span></li>
          <li><a href="#1">Get started</a></li>
          <li><a href="#2">Photos</a></li>
          <li><a href="#3">Gear</a></li>
          <li><a href="#4">Forum</a></li>
        </ul>
      </nav>

      <main>

      <section>
        <h2>Welcome</h2>
        <article>
          <p>Welcome to our fake birdwatching site. If this were a real site, it would be the ideal place to come to learn more about birdwatching, whether you are a beginner looking to learn how to get into birding, or an expert wanting to share ideas, tips, and photos with other like-minded people.</p>
        </article>
        <br/>
        <article>
          <p>So don't waste time! Get what you need, then turn off that computer and get out into the great outdoors!</p>
        </article>
      </section>

      <aside>
        <h2>Favourite photos</h2>
        <a href="favorite-1.jpg"><img src="favorite-1_th.jpg" alt="Small black bird, black claws, long black slender beak"/></a>
        <a href="favorite-2.jpg"><img src="favorite-2_th.jpg" alt="Top half of a pretty bird with bright blue plumage on neck, light colored beak, blue headdress"/></a>
        <a href="favorite-3.jpg"><img src="favorite-3_th.jpg" alt="Top half of a large bird with white plumage, very long curved narrow light colored break"/></a>
        <a href="favorite-4.jpg"><img src="favorite-4_th.jpg" alt="Large bird, mostly white plumage with black plumage on back and rear, long straight white beak"/></a>
      </aside>

      </main>

      <footer>
        <p>This fake website example is CC0 — any part of this code may be reused in any way you wish. Original example written by Chris Mills, 2016.</p>
        <p><a href="http://game-icons.net/lorc/originals/dove.html">Dove icon</a> by Lorc.</p>
      </footer>

    </div> 
    );
  }
}

export default NameForm