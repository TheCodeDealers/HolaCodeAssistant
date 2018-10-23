import React, { Component } from "react";
import {Container} from "mdbreact";


const BookMarkList = props => (


        <div>
          {
            <center><ul>
              {props.bookmarks.map((bookmark, i) => (
                <li className='bookmarkList'>{bookmark.bookmark}</li>
              ))}
            </ul></center>
        }
      </div>

)

export default BookMarkList;
