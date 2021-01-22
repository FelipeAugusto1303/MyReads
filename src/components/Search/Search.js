import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';

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
      if(event.target.value !== null || event.target.value !== ""){
        BooksAPI.search(event.target.value, 100)
        .then(data => {
          console.log(data)
          if(typeof data.error === "undefined"){
            this.setState({
              books: data
            })
          }
          else{
            this.setState({
              books:null
            })
          }
        
        })
        .catch(error => console.log(error))
      }
    }
    else{
      this.setState({
        books:null
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
                    
                    <li key={index}>
                      <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(event) => this.onHandleChange(event, book)}>
                                <option selected={typeof book.shelf !== "undefined" && this.state.realShelf === "currentlyReading"? true:false} value="currentlyReading" >Currently Reading</option>
                                <option selected={typeof book.shelf !== "undefined" && this.state.realShelf === "wantToRead"? true:false} value="wantToRead">Want to Read</option>
                                <option selected={typeof book.shelf !== "undefined" && this.state.realShelf === "read"? true:false} value="read">Read</option>
                                <option selected={typeof book.shelf === "undefined" ? true:false} value="none">None</option>
                            </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
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