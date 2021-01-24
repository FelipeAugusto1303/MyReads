import React, {Component} from 'react';
import {
     Link
} from 'react-router-dom';
import * as BooksApi from '../../BooksAPI';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
          books: null,
          data: null
        }
        
    }

    async componentDidMount(){
      const book = await BooksApi.getAll();
      this.setState({
        books: book
      })
    }
    
    onHandleChange = (event, book) => {
      console.log(event.target.value);
      BooksApi.update(book, event.target.value)
      .then(data => {
        console.log(data)
        BooksApi.getAll()
        .then(data => {
          this.setState({
            books:data
          })
        })
      })
      .catch(error => console.log(error))
    }

    render(){
        return(
            
            <div className="list-books">
              {console.log(this.state.books)}
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.state.books !== null?
                          this.state.books.filter(book => book.shelf === "currentlyReading")
                          .map((book, index) => {
                            return(
                              <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select defaultValue={typeof book.shelf === "undefined" ? "none" : book.shelf} onChange={(event) => this.onHandleChange(event, book)}>
                                            <option value="currentlyReading" >Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                              </li>
                            )
                          })
                          :<p>Loading ...</p>}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                        {this.state.books !== null?
                          this.state.books.filter(book => book.shelf === "wantToRead")
                          .map((book, index) => {
                            return(
                              <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select defaultValue={typeof book.shelf === "undefined" ? "none" : book.shelf} onChange={(event) => this.onHandleChange(event, book)}>
                                            <option value="currentlyReading" >Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                              </li>
                            )
                          })
                          :<p>Loading ...</p>}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                        {this.state.books !== null?
                          this.state.books.filter(book => book.shelf === "read")
                          .map((book, index) => {
                            return(
                              
                              <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select defaultValue={typeof book.shelf === "undefined" ? "none" : book.shelf} onChange={(event) => this.onHandleChange(event, book)}>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                              </li>
                            )
                          })
                          :<p>Loading ...</p>}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  {/* <a onClick={() => history.push('/search')}>Add a book</a> */}
                  <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
    
}

export default Home;