var React = require('react');
var actions = require('../../flux/actions/mainActions');
var store = require('../../flux/stores/mainStore');

var Page = React.createClass({
  getInitialState() {
    return store.getState();
  },

  componentWillMount() {
    store.listen(this.onChange);
  },

  componentWillUnmount() {
    store.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  setNewValue(evt) {
    actions.setValue(evt.target.value);
  },

  render: function () {
    return (
      <div>
        <label>{this.state.value}</label>
        <input value={this.state.value} onChange={this.setNewValue} />
        <button className="btn" onClick={actions.resetValue}>RESET</button>
      </div>
    );
  }
});

module.exports = Page;