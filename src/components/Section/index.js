import React, {Component} from 'react';

class Section extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="title-area">
              <h2>Our Services</h2>
              <div className="separator separator-danger">✻</div>
              <p className="description">We promise you a new look and more importantly, a new
                attitude. We build that by getting to know you, your needs and creating the best
                looking clothes.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="info-icon">
                <div className="icon text-danger">
                  <i className="pe-7s-graph1"/>
                </div>
                <h3>Sales</h3>
                <p className="description">We make our design perfect for you. Our adjustment
                  turn our clothes into your clothes.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-icon">
                <div className="icon text-danger">
                  <i className="pe-7s-note2"/>
                </div>
                <h3>Content</h3>
                <p className="description">We create a persona regarding the multiple wardrobe
                  accessories that we provide..</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-icon">
                <div className="icon text-danger">
                  <i className="pe-7s-music"/>
                </div>
                <h3>Music</h3>
                <p className="description">We like to present the world with our work, so we
                  make sure we spread the word regarding our clothes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
