import React, {Component} from 'react';
import InfoBox from './InfoBox';

class StepLayout extends Component {
  render() {
    const {info, infoBox} = this.props;
    return (
      <div className="step-container pick-schema">
        <div className="row flex-sm-row-reverse">
          <div className="col-md-5">
            <label>STEP {Number(this.props.step)}</label>
            <h2>{this.props.title}</h2>
            {this.props.children}
            {this.props.onNextStepClick && (
              <div className="btn-container">
                <button
                  className="float-right btn btn-primary"
                  onClick={() => this.props.onNextStepClick()}>
                  Next
                </button>
              </div>
            )}
          </div>

          <div className="col-md-5 col-md-offset-2">
            {info && (
              <InfoBox title={info.title}>
                <p>{info.description}</p>
              </InfoBox>
            )}
            {infoBox}
          </div>
        </div>
      </div>
    );
  }
}

export default StepLayout;
