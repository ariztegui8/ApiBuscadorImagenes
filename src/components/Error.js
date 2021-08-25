import React from 'react'

const Error = ({mensaje}) => {
    return (
        <div>
            <p className="alert alert-danger">{mensaje}</p>
        </div>
    )
}

export default Error
