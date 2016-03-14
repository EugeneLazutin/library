var React = require('react');
var Nav = require('./components/nav');
var Links = require('./components/links');

const ACTIVE = { color: 'red' }

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Nav>
          <Links/>
        </Nav>

        {this.props.children}
      </div>
    );
  }
});

module.exports = App;