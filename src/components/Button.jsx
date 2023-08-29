import React from 'react'

export default function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={`py-2 px-50 rounded-full border-primary bg-blue66 text-lightpink font-semibold text-base ${props.styles}`}
        >
            {props.children}
        </button>
    )
}
