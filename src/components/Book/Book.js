import React from 'react';
import BooksApi from '../../BooksAPI';

const Book = ({image, title, author, shelf, book}) => {
    
    const onHandleChange = (event, book) => {
        console.log(event.target.value);
        BooksApi.update(book, event.target.value)
        .then(data => {
          console.log(data)  
        })
        .catch(error => console.log(error))
      }

    return(
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
            <div className="book-shelf-changer">
                <select onChange={(event) => onHandleChange(event, book)}>
                    <option selected={shelf === "currentlyReading"? true:false} value="currentlyReading" >Currently Reading</option>
                    <option selected={shelf === "wantToRead"? true:false} value="wantToRead">Want to Read</option>
                    <option selected={shelf === "read"? true:false} value="read">Read</option>
                    <option selected={shelf === "none"? true:false} value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{author}</div>
        </div>
    )
}

export default Book;