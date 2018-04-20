import React from 'react'

const Comment = ({id, username, body, deleteComment}) => (

    <div className="col-12 w-100 card-body">
        <header className="w-100 pt-3 px-3">
            <div>{id}</div>
            <div className="d-block">{username}</div>
        </header>
        <p className="w-100 pt-3 px-3">{body}</p>
        <button className="btn-danger" onClick={ () => {deleteComment(id)} }>Delete</button>
    </div>
)

export default Comment