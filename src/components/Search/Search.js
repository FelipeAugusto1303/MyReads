import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from "../Book/Book";

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      books:null,
      query: "",
    }
  }

  searchBook = (event) => {
    this.setState({
      query: event.target.value
    })
    if(event.target.value !== ""){
        BooksAPI.search(event.target.value, 100)
        .then(data => {
          console.log(data)
          if(typeof data !== "undefined"){
            if(typeof data.error === "undefined"){
              this.setState({
                books: data
              })
            }
            else{
              this.setState({
                books: null
              })
            }
          }
        })
        .catch(error => console.log(error))
    }
    else{
      this.setState({
        books: null
      })
    }
  }

  onHandleChange = (event, book) => {
    console.log(event.target.value);
    BooksAPI.update(book, event.target.value)
    .then(data => {
      console.log(data)
      
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
        <div className="search-books">
          {console.log(this.state.realShelf)}
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
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
                this.state.books.filter(book => typeof book.imageLinks !== "undefined").map((book, index)=>{
                  
                  return(
                    
                    <li key={book.id}>
                      <Book bookId={book.id}/>
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