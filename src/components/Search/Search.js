import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from '../Book/Book';


class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      books:null,
      query: ""
    }
  }

  searchBook = (event) => {
    this.setState({
      query: event.target.value
    })
    if(event.target.value !== null || event.target.value !== ""){
      BooksAPI.search(event.target.value, 10)
      .then(data => {
        console.log(data)
        this.setState({
          books: data
        })
      })
    }
  }

  render(){
    return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/home'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.searchBook} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.books !== null && typeof this.state.books !== "undefined"? 
                this.state.books.map((book, index)=>{
                  return(
                    <li>
                      <Book image={book.imageLinks.thumbnail} title={book.title} author={book.authors}/>
                    </li>
                  )
                })
                :null}
              </ol>
            </div>
        </div>
    )
  }
}

export default Search;