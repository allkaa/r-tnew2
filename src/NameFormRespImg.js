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

      <main>
        <section>
          <h1>My website</h1>
  
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget venenatis ligula. Ut lacinia at dolor vitae pulvinar. Aliquam pretium dignissim eros. Integer faucibus, dui non aliquet bibendum, lectus orci lobortis odio, ornare porttitor est tellus eget velit. Nulla eros elit, malesuada id neque vel, viverra vehicula neque. Nullam auctor turpis non leo iaculis finibus. Quisque blandit arcu venenatis libero tempor, ac pulvinar ligula dapibus.</p>
          {/* NB! images must be in public dir for React */}
          <picture>
            <source media="(max-width: 799px)" srcSet="elva-480w-close-portrait.jpg"></source>
            <source media="(min-width: 800px)" srcSet="elva-800w.jpg"></source>
            <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva"/>
          </picture>
  
          <p>Suspendisse potenti. Ut in luctus eros. Mauris pulvinar vehicula aliquet. Etiam imperdiet eleifend luctus. Duis ut justo nec eros ornare consectetur. Vestibulum convallis condimentum varius. Maecenas rutrum porta varius. Phasellus volutpat sem id sagittis luctus. Morbi vitae quam vitae nisi iaculis dignissim.</p>
  
          <img srcSet="elva-fairy-320w.jpg 320w,
                       elva-fairy-480w.jpg 480w,
                       elva-fairy-800w.jpg 800w"
               sizes="(max-width: 320px) 280px,
                      (max-width: 480px) 440px,
                      800px"
               src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy"/>
  
          <p>Header image originally by <a href="https://www.flickr.com/photos/miwok/17086751527/">Miwok</a>.</p>
        </section>
      </main>
  

    </div> 
    );
  }
}

export default NameForm