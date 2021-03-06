var React = require('react');
var Comments = require('./../comment/comments.admin.js');
var Orders = require('./../order/orders.admin.js');
var bookActions = require('../../../flux/actions/book.actions');
var bookStore = require('../../../flux/stores/book.store');


var BookAdmin = React.createClass({
  propTypes: {
    bookId: React.PropTypes.string
  },

  getInitialState() {
    return {
      ordersIsVisible: true
    };
  },

  componentDidMount() {
    bookStore.listen(this._onChange);
    bookActions.fetchBook(this.props.bookId, true);
  },

  componentWillUnmount() {
    bookStore.unlisten(this._onChange);
  },

  _onChange(state) {
    this.setState(state);
  },

  _showOrders() {
    this.setState({
      ordersIsVisible: true
    });
  },

  _showComments(){
    this.setState({
      ordersIsVisible: false
    });
  },

  _renderBody() {
    if (this.state.ordersIsVisible) {
      return <Orders>{this.state.book.orders}</Orders>;
    }
    return <Comments>{this.state.book.comments}</Comments>;
  },

  render() {
    var { book, ordersIsVisible } = this.state;

    if(!book) {
      return <div className="loader" />;
    }

    return (
      <div className='book-details'>
        <h3>{book.title} <small>by</small> {book.author} <small>written in</small> {book.year}</h3>
        <h5>{book.available}/{book.count} available</h5>
        <ul className="nav nav-tabs">
          <li className={ordersIsVisible ? 'active' : ''}>
            <a className="empty-link" onClick={this._showOrders}>Orders</a>
          </li>
          <li className={ordersIsVisible ? '' : 'active'}>
            <a className="empty-link" onClick={this._showComments}>Comments</a>
          </li>
        </ul>
        {this._renderBody()}
      </div>
    );
  }
});

module.exports = BookAdmin;