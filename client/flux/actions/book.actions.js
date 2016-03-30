var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');
var userStore = require('../stores/user.store');
var { hashHistory } = require('react-router');

class BookActions {
  fetchBook(bookId) {
    return dispatch => {
      dispatch();

      var request = agent
        .get(`api/book/${bookId}`);

      if (userStore.isAdmin()) {
        request = agent
          .get(`api/book/admin/${bookId}`)
          .set('Authorization', 'Bearer ' + cookie.load('token'));
      } else {
        request = agent
          .get(`api/book/${bookId}`);
      }

      request.end((err, res) => {
        if (err) {
          error(err);
        } else {
          this.receiveBook(res.body);
        }
      });
    }
  }

  decrementAvailable() {
    return dispatch => {
      dispatch();
    }
  }

  receiveBook(book) {
    return book;
  }

  orderIsMade(order) {
    return order;
  }

  makeOrder(bookId) {
    return dispatch => {
      dispatch();

      agent
        .post('/api/order')
        .send({id: bookId})
        .set('Authorization', 'Bearer ' + cookie.load('token'))
        .end((err, res) => {
          if (err) {
            return error(err);
          } else {
            this.orderIsMade(res.body);
          }
        });
    }
  }

  createBook(book) {
    return dispatch => {
      dispatch();

      agent
        .post('/api/book')
        .send(book)
        .end((err, res) => {
          if (err) {
            error(err);
          } else {
            hashHistory.push('/books');
          }
        });
    }
  }

  createComment(comment) {
    return dispatch => {
      dispatch();

      agent
        .post('/api/comment')
        .send(comment)
        .set('Authorization', 'Bearer ' + cookie.load('token'))
        .end((err, res) => {
          if (err) {
            error(err);
          }
        })
    }
  }

  removeBook(bookId) {
    return dispatch => {
      dispatch();

      agent
        .delete(`/api/book/${bookId}`)
        .set('Authorization', 'Bearer ' + cookie.load('token'))
        .end((err, res) => {
          if (err) {
            error(err);
          } else {
            hashHistory.push('/books');
          }
        });
    }
  }
}

module.exports = alt.createActions(BookActions);