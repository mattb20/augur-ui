var React = require('react');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var ModalTrigger = ReactBootstrap.ModalTrigger;

var SendGasModal = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('asset')],

  getInitialState: function () {
    return {
      amount: '',
      destination: ''
    };
  },

  getStateFromFlux: function () {
    var flux = this.getFlux();

    return {
      gas: flux.store('asset').getState().gas
    }
  },

  onChangeDestination: function (event) {
    this.setState({destination: event.target.value});
  },

  onChangeAmount: function (event) {
    this.setState({amount: event.target.value});
  },

  onSend: function (event) {
    // TODO: Validate the state, then call a contract to send the
    // transaction requested in the state.
    console.log('Would have sent ' + this.state.amount + ' gas to ' + this.state.destination);
    this.props.onRequestHide();
  },

  render: function () {
    return (
      <Modal {...this.props} id='send-rep-modal' bsSize='small'>
        <div className='modal-body clearfix'>
          <h4>Send gas</h4>
          <form className='form-horizontal' role='form'>
            <div className='form-group'>
              <div className="col-sm-12">
                <input
                  type='text'
                  className='form-control dest-address'
                  placeholder='destination address'
                  onChange={this.onChangeDestination} />
              </div>
              <div className="col-sm-12">
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='amount'
                    onChange={this.onChangeAmount} />
                  <span className="input-group-btn">
                    <Button bsStyle='primary' onClick={this.onSend}>Send</Button>
                  </span>
                </div>
              </div>
            </div>
          </form>
          <p>GAS: <b className='gas-balance'>{this.state.gas}</b></p>
        </div>
      </Modal>
    );
  }
});

var SendGasTrigger = React.createClass({
  mixins: [FluxMixin],

  render: function () {
    return (
      <ModalTrigger modal={<SendGasModal {...this.props} />}>
        <a href='#'>{ this.props.text }</a>
      </ModalTrigger>
    );
  }
});

module.exports = {
  SendGasModal: SendGasModal,
  SendGasTrigger: SendGasTrigger
};
