import React from 'react'

export default function Follows({followers}) {
    return (
        <div>
            <div className="d-flex flex-row justify-content-center align-items-center">
                <p className="follows-title mr-2"><i className="fas fa-user"></i> {followers}</p>
                </div>
        </div>
    )
}
