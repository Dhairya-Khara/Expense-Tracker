import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const getDate = (unixTimestamp) => {

    const dateObject = new Date(unixTimestamp)
    // const humanDateFormat = dateObject.toLocaleString()

    const month = dateObject.toLocaleString("en-US", { month: "long" })
    const day = dateObject.toLocaleString("en-US", { day: "numeric" })
    const year = dateObject.toLocaleString("en-US", { year: "numeric" })

    return month + " " + day + ", " + year
}

// const ExpenseListItem = (props) => {

//     return (
//         <div>
//             <Link to={`/dashboard/edit`}>
//                 <h3>{props.props.description}</h3>
//             </Link>


//             {/* <p>${(props.props.amount) / 1000} - {props.props.createdAt}</p> */}
//             <p>${(props.props.amount) / 1000} - {getDate(props.props.createdAt)}</p>


//         </div>
//     )
// }

class ExpenseListItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.props.id
        }
    }

    render() {
        return (
            <div>
                <Link to={`/dashboard/edit/id=${this.state.id}`}>
                    <h3>{this.props.props.description}</h3>
                </Link>


                {/* <p>${(props.props.amount) / 1000} - {props.props.createdAt}</p> */}
                <p>${(this.props.props.amount) / 1000} - {getDate(this.props.props.createdAt)}</p>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListItem)

//export default connect(mapStateToProps)(ExpenseListItem);



