import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEraser} from '@fortawesome/free-solid-svg-icons'

function DetailVegEntry(props) {
    function changeTitle(event) {
        props.nutritionTitleChanged(event.target.value)
    }

    function changeValue(event) {
        props.nutritionValueChanged(event.target.value)
    }

    if (props.from === "nutrition") {
        return (
            <table>
                <tbody>
                    <th>{props.editable ?
                        <input className="entry-title" type="text" value={props.title} onChange={changeTitle}/> :
                        <input className="entry-title" readOnly={true} value={props.title}/>}
                    </th>
                    <td>{props.editable ?
                        <input className="entry-value" type="text" onChange={changeValue} value={props.value}/> :
                        <input className="entry-value" readOnly={true} value={props.value}/>}
                        <FontAwesomeIcon className="eraser-icon" style={{display: props.editable ? "inline" : "none"}}
                                         icon={faEraser} onClick={props.onDelete}/>
                    </td>
                </tbody>
            </table>
        )
    } else {
        return (
            <div>
                <th>{props.title}</th>
                <td>{props.value}</td>
            </div>
        )
    }
}

export default DetailVegEntry