import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as booksActions from '../actions/books';
import App from '../components/App';
import orderBy from 'lodash/orderBy';

const sortBy = (books, filterBy, searchQuery) => {
  books = books.filter(
    o => 
    o.title.toLowerCase().indexOf(searchQuery.toLowerCase()) ||
    o.author.toLowerCase().indexOf(searchQuery.toLowerCase()),
  );
  switch (filterBy) {
    case 'all':
    case 'price_high':
      return orderBy(books, 'price', 'desc');
    case 'price_low':
      return orderBy(books, 'price', 'asc');
    case 'author':
      return orderBy(books, 'author', 'desc');
    default:
      return books;
  }
}

const mapStateToProps = ({ books, filter }) => ({
  books: books.items || sortBy(books.items, books.filterBy, filter.searchQuery),
  isReady: books.isReady
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(booksActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);