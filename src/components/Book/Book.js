import React, {Component} from 'react';
import * as BooksApi from '../../BooksAPI';

class Book extends Component {
    _isMounted = false;
    constructor(props){
        super(props)
        this.state = {
            book: null
        }
    }

    async componentDidMount(){
        this._isMounted = true;
        const book = await BooksApi.get(this.props.bookId)
        if(this._isMounted){
            this.setState({
                book: book
            })
        }
        
    }

    componentWillUnmount(){
        this._isMounted = false;
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
                    <select defaultValue={typeof this.state.book.shelf === "undefined" ? "none" : this.state.book.shelf} onChange={(event) => this.onHandleChange(event, this.state.book)}>
                        <option value="currentlyReading" >Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
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