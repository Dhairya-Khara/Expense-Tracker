import React from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'

//component handling all the filters that can be applied to expenses
class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    //method that handles the calendar widget
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate))
        this.props.dispatch(setEndDate(endDate))
    }
    //method that handles if user is selected on calender widget or not
    onFocusChange = (calendarFocused) => {
        this.setState(() => {
            return {
                calendarFocused
            }
        })
    }
    render() {
        return (
            <div className="content-container">
                {/* input dealing with text filter */}
                <div className = "input-group">
                    <div className = "input-group__item">
                        <input placeholder = "Search expenses" className = "text-input" type="text" value={this.props.filters.text} onChange={(e) => {
                            this.props.dispatch(setTextFilter(e.target.value))

                        }}>

                        </input>
                    </div>
                    <div className = "input-group__item">
                        {/* input dealing with date filter */}
                        <select className = "select" onChange={(e) => {
                            if (e.target.value === "date") {
                                this.props.dispatch(sortByDate())
                            }
                            else if (e.target.value === "amount") {
                                this.props.dispatch(sortByAmount())
                            }
                        }}>
                            {/* user may choose to filter between DATE or AMOUNT */}
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className = "input-group__item">
                        {/* values required to use calendar widget */}
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                </div>




            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return ({
        filters: state.filters
    })
}


export default connect(mapStateToProps)(ExpenseListFilters)