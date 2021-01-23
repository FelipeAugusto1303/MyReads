import React, {Component} from 'react';
import * as BooksApi from '../../BooksAPI';

class Book extends Component {
    constructor(props){
        super(props)
        this.state = {
            book: null
        }
    }

    componentDidMount(){
        BooksApi.get(this.props.bookId)
        .then(data => {
            console.log(data)
            this.setState({
                book: data
            })
        })
        .catch(error => console.log(error))
    }

    onHandleChange = (event, book) => {
        console.log(event.target.value);
        BooksApi.update(book, event.target.value)
        .then(data => {
          console.log(data)  
        })
        .catch(error => console.log(error))
      }
    
    render(){
        return(
            <div>
            {this.state.book !== null ?
            <div className="book">
                
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.state.book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(event) => this.onHandleChange(event, this.state.book)}>
                        <option selected={typeof this.state.book.shelf !== "undefined" && this.state.book.shelf === "currentlyReading"? true:false} value="currentlyReading" >Currently Reading</option>
                        <option selected={typeof this.state.book.shelf !== "undefined" && this.state.book.shelf === "wantToRead"? true:false} value="wantToRead">Want to Read</option>
                        <option selected={typeof this.state.book.shelf !== "undefined" && this.state.book.shelf === "read"? true:false} value="read">Read</option>
                        <option selected={typeof this.state.book.shelf === "undefined"? true:false} value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.state.book.title}</div>
                <div className="book-authors">{this.state.book.authors}</div>
                
            </div>
            :
            <div></div>}
            </div>
        )
    }
}

export default Book;