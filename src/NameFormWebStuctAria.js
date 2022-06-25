// NB! Capitalize custom components name to differentiate them from regular HTML elements).
import React, { Component } from 'react'
import logo from './logoFancyLetter.png'; // Tell Webpack this JS file will use this image placed in src dir.

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

  {/*<!-- Here is our main header that is used accross all the pages of our website -->*/}
   <header>
    <img id="logoimg" src={logo} alt="logo"/> {/* src="logo.png"  logo.png img_5terre.jpg are in public dir */}
    <h1>Header text and logo</h1>
    {/*<!-- Even is it's not mandatory, it's common practice to put the main navigation menu within the main header -->*/}
    <nav role="navigation">
      <ul>
        <li><a href="#f1">Home</a></li>
        <li><a href="#f2">Our team</a></li>
        <li><a href="#f3">Projects</a></li>
        <li><a href="#f4">Contact</a></li>
      </ul>
      {/*<!-- A Search form is another commmong non-linear way to navigate through a website. -->*/}
      {/*</nav><!-- creates GET requst e.g. for search "nemo" as file:///home/akaarna/react-tutorial/indexTest.html?q=nemo -->*/}
      <form role="search">
        <input type="search" name="q" placeholder="Search query" aria-label="Search through site content"/>
        <input type="submit" value="Go!"/>
      </form>
    </nav>
  </header>

  {/*<!-- Here is our page's main content -->*/}
  <main>

    {/*<!-- It contains an article -->*/}
    <article>{/*  role="article" is default for article */}
      <h2>Article heading</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus. Set sit amet ipsum mauris. Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.</p>

      <h3>subsection</h3>
      <p>Donec ut librero sed accu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.</p>
      <p>Pelientesque auctor nisi id magna consequat sagittis. Curabitur dapibus, enim sit amet elit pharetra tincidunt feugiat nist imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros.</p>

      <h3>Another subsection</h3>
      <p>Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum soclis natoque penatibus et manis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.</p>
      <p>Vivamus fermentum semper porta. Nunc diam velit, adipscing ut tristique vitae sagittis vel odio. Maecenas convallis ullamcorper ultricied. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, is fringille sem nunc vet mi.</p>
    </article>
    
    <div className="asides">
    {/*<!-- the aside content can also be nested within the main content -->*/}
    <aside role="note" id="aside1">
      <h2>Float img in aside</h2>
      <img id="asideimg" src="img_5terre.jpg" alt="logo"/> {/*  logo.png img_5terre.jpg */}
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus. Set sit amet ipsum mauris. </p>
    </aside>
    
    {/*<!-- the aside content can also be nested within the main content -->*/}
    <aside id="aside2"> {/* role="complementary" is default for aside */}
      <h2>Related links</h2>
      <ul>
        <li><a href="#11">Oh I do like to be beside the seaside</a></li>
        <li><a href="#12">Oh I do like to be beside the sea</a></li>
        <li><a href="#13">Although in the North of England</a></li>
        <li><a href="#14">It never stops raining</a></li>
        <li><a href="#15">Oh well...</a></li>
      </ul>
    </aside>
    </div>


  </main>

  {/*<!-- And here is our main footer that is used across all the pages of our website -->*/}
  <footer>
    <p>©Copyright 2050 by nobody. All rights reversed.</p>
  </footer>

    </div> 
    );
  }
}

export default NameForm