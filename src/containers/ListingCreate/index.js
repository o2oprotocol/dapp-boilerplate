import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from 'react-jsonschema-form';
import alertify from 'alertifyjs';

// import o2oprotocol from 'core/o2oprotocol';
import ListingDetail from 'containers/ListingDetail';
import StaticModal from 'components/StaticModal';
import Section from 'components/Section';
import Header from 'components/Header';
import SectionSeparator from 'components/Section/SectionSeparator';
import StepLayout from './StepLayout';
import InfoBox from './InfoBox';

import './index.css';

let o2oprotocol = {};

class ListingCreate extends Component {

  constructor(props) {
    super(props)

    // This is non-ideal fix until IPFS can correctly return 443 errors Server limit
    // is 2MB, withg 100K safety buffer
    this.MAX_UPLOAD_BYTES = (2e6 - 1e5)

    // Enum of our states
    this.STEP = {
      PICK_SCHEMA: 1,
      DETAILS: 2,
      PREVIEW: 3,
      METAMASK: 4,
      PROCESSING: 5,
      SUCCESS: 6
    }

    this.schemaList = [
      {
        type: 'for-sale',
        name: 'For Sale',
        'img': 'for-sale.jpg'
      }, {
        type: 'housing',
        name: 'Housing',
        'img': 'housing.jpg'
      }, {
        type: 'transportation',
        name: 'Transportation',
        'img': 'transportation.jpg'
      }, {
        type: 'tickets',
        name: 'Tickets',
        'img': 'tickets.jpg'
      }, {
        type: 'services',
        name: 'Services',
        'img': 'services.jpg'
      }, {
        type: 'announcements',
        name: 'Announcements',
        'img': 'announcements.jpg'
      }
    ];

    this.state = {
      step: this.STEP.PICK_SCHEMA,
      selectedSchemaType: this.schemaList[0],
      selectedSchema: null,
      schemaFetched: false,
      formListing: {
        formData: null
      }
    }

    this.handleSchemaSelection = this
      .handleSchemaSelection
      .bind(this);
    this.onDetailsEntered = this
      .onDetailsEntered
      .bind(this);
    this.renderPickSchema = this
      .renderPickSchema
      .bind(this);
    this.renderDetails = this
      .renderDetails
      .bind(this);
    this.renderPreview = this
      .renderPreview
      .bind(this);
  }

  componentDidMount() {
    o2oprotocol = window.o2o;
  }

  handleSchemaSelection() {
    fetch(`/schemas/${this.state.selectedSchemaType}.json`).then((response) => response.json()).then((schemaJson) => {
      this.setState({selectedSchema: schemaJson, schemaFetched: true, step: this.STEP.DETAILS})
      window.scrollTo(0, 0)
    })
  }

  onDetailsEntered(formListing) {
    // Helper function to approximate size of object in bytes
    function roughSizeOfObject(object) {
      var objectList = []
      var stack = [object]
      var bytes = 0
      while (stack.length) {
        var value = stack.pop()
        if (typeof value === 'boolean') {
          bytes += 4
        } else if (typeof value === 'string') {
          bytes += value.length * 2
        } else if (typeof value === 'number') {
          bytes += 8
        } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
          objectList.push(value)
          for (var i in value) {
            if (value.hasOwnProperty(i)) {
              stack.push(value[i])
            }
          }
        }
      }
      return bytes
    }
    if (roughSizeOfObject(formListing.formData) > this.MAX_UPLOAD_BYTES) {
      alertify.warning("Your listing is too large. Consider using fewer or smaller photos.")
    } else {
      this.setState({formListing: formListing, step: this.STEP.PREVIEW})
      window.scrollTo(0, 0)
    }
  }

  async onSubmitListing(formListing, selectedSchemaType) {
    try {
      console.log(formListing)
      this.setState({step: this.STEP.METAMASK})
      const transactionReceipt = await o2oprotocol
        .listings
        .create(formListing.formData, selectedSchemaType)
      this.setState({step: this.STEP.PROCESSING})
      // Submitted to blockchain, now wait for confirmation
      // const blockNumber = await o2oprotocol
      //   .contractService
      //   .waitTransactionFinished(transactionReceipt.tx)
      console.log('>>> transactionReceipt >>> ', transactionReceipt);
      this.setState({step: this.STEP.SUCCESS})
    } catch (error) {
      // TODO: We need a failure step to go to here
      console.error(error)
      alertify.error(error.message)
    }
  }

  renderPickSchema() {
    const info = {
      title: 'Choose a schema for your product or service',
      description: 'Your product or service will use a schema to describe its attributes like name, ' +
          'description, and price. O2OProtocol already has multiple schemas that map to wel' +
          'l-known categories of listings like housing, auto, and services.'
    };
    return (
      <StepLayout
        step={this.state.step}
        title="What type of listing do you want to create?"
        info={info}
        onNextStepClick={this
        .handleSchemaSelection
        .bind(this)}>
        {this
          .schemaList
          .map(schema => (
            <div
              className={this.state.selectedSchemaType === schema.type
              ? 'schema-selection selected'
              : 'schema-selection'}
              key={schema.type}
              onClick={() => this.setState({selectedSchemaType: schema.type})}>
              {schema.name}
            </div>
          ))}
      </StepLayout>
    );
  }

  renderDetails() {
    const DefaultInfoBox = (
      <InfoBox title='How it works'>
        <p>O2OProtocol uses a Mozilla project called</p>
        <a href="http://json-schema.org/">JSONSchema</a>
        to validate your listing according to standard rules. This standardization is
        key to allowing unaffiliated entities to read and write to the same data layer.<br/><br/>Be
          sure to give your listing an appropriate title and description that will inform
          others as to what you’re offering.<br/><br/>
        <a href={`/schemas/${this.state.selectedSchemaType}.json`}>View the
          <code>{this.state.selectedSchema.name}</code>
          schema</a>
      </InfoBox>
    );

    return (
      <StepLayout
        step={this.state.step}
        title="Create your listing"
        infoBox={DefaultInfoBox}>
        <Form
          schema={this.state.selectedSchema}
          onSubmit={this.onDetailsEntered}
          formData={this.state.formListing.formData}
          onError={(errors) => console.log(`react-jsonschema-form errors: ${errors.length}`)}>
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-other"
              onClick={() => this.setState({step: this.STEP.PICK_SCHEMA})}>
              Back
            </button>
            <button type="submit" className="float-right btn btn-primary">Continue</button>
          </div>
        </Form>
      </StepLayout>
    );
  }

  renderPreview() {
    const DefaultInfoBox = (
      <InfoBox title='What happens next?'>
        <p>When you hit submit, a JSON object representing your listing will be
          published to</p>
        <a href="https://ipfs.io">IPFS</a>
        and the content hash will be published to a listing smart contract running on
        the Ethereum network.<br/><br/>Please
          review your listing before submitting. Your listing will appear to others just
          as it looks on the window to the left.
      </InfoBox>
    );
    return (
      <div>
        {this.state.step === this.STEP.METAMASK && (
          <StaticModal show={true}>
            <div className="image-container">
              <img src="/images/spinner-animation.svg" alt=""/>
            </div>
            Confirm transaction<br/>
            Press &ldquo;Submit&rdquo; in MetaMask window
          </StaticModal>
        )}
        {this.state.step === this.STEP.PROCESSING && (
          <StaticModal show={true}>
            <div className="image-container">
              <img src="/images/spinner-animation.svg" alt=""/>
            </div>
            Uploading your listing<br/>
            Please stand by...
          </StaticModal>
        )}
        {this.state.step === this.STEP.SUCCESS && (
          <StaticModal show={true}>
            <div className="image-container">
              <img src="/images/circular-check-button.svg" alt=""/>
            </div>
            Success<br/>
            <Link to="/">See All Listings</Link>
          </StaticModal>
        )}
        <StepLayout
          step={this.state.step}
          title="Preview your listing"
          infoBox={DefaultInfoBox}>
          <div className="preview">
            <ListingDetail listingJson={this.state.formListing.formData}/>
          </div>
          <div className="btn-container">
            <button
              className="btn btn-other float-left"
              onClick={() => this.setState({step: this.STEP.DETAILS})}>
              Back
            </button>
            <button
              className="btn btn-primary float-right"
              onClick={() => this.onSubmitListing(this.state.formListing, this.state.selectedSchemaType)}>
              Done
            </button>
          </div>
        </StepLayout>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header classes={['section-header-small', 'section-30-vh']} bgColor="black">
          <h1>Create Listing</h1>
          <h3 className="subtitle">Step {this.state.step}</h3>
          <SectionSeparator/>
        </Header>
        <Section>
          <div className="container listing-form">
            {this.state.step === this.STEP.PICK_SCHEMA && this.renderPickSchema()}
            {this.state.step === this.STEP.DETAILS && this.renderDetails()}
            {(this.state.step >= this.STEP.PREVIEW) && this.renderPreview()}
          </div>
        </Section>
      </div>
    )
  }
}

export default ListingCreate;
