import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

//get human date to render for each individaul expense
const getDate = (unixTimestamp) => {

    const dateObject = new Date(unixTimestamp)


    const month = dateObject.toLocaleString("en-US", { month: "long" })
    const day = dateObject.toLocaleString("en-US", { day: "numeric" })
    const year = dateObject.toLocaleString("en-US", { year: "numeric" })

    return month + " " + day + ", " + year
}

//Each individual expense is rendered using this component
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
                {/* the text of each expense is a link which redirects user to edit that expense */}
                <Link className = "list-item" to={`/dashboard/edit/id=${this.state.id}`}>
                    <div>
                        <h3 className = "list-item__title">{this.props.props.description}</h3>
                        <span className = "list-item__sub-title">{getDate(this.props.props.createdAt)}</span>
                    </div>
                    <h3 className = "list-item__data">${(this.props.props.amount) / 1000}</h3>
                </Link>




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




