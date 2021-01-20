import React, {Component} from 'react';
import {
     Link
} from 'react-router-dom';
import * as BooksApi from '../../BooksAPI';
import Book from '../Book/Book';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
          books: null
        }
        
    }

    componentDidMount(){
      BooksApi.getAll()
        .then(data => {
          this.setState({
            books:data
          })
        })
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
                              <li>
                                <Book image={book.imageLinks.thumbnail} title={book.title} author={book.authors}/>
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
                              <li>
                                <Book image={book.imageLinks.thumbnail} title={book.title} author={book.authors}/>
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
                              <li>
                                <Book image={book.imageLinks.thumbnail} title={book.title} author={book.authors}/>
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