// //this method applies filters and expense. Retuns filters expenses

import moment from 'moment'

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate})=>{
    return expenses.filter((expense)=>{
        const createdAtMoment = moment(expense.createdAt)


        const momentStartDate = determineDate(startDate)
        const momentEndDate = determineDate(endDate)

        const startDateMatch = momentStartDate ? momentStartDate.isSameOrBefore(createdAtMoment, 'day'):true
        const endDateMatch = momentEndDate ? momentEndDate.isSameOrAfter(createdAtMoment, 'day'):true


        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        if(sortBy === "date"){
            return a.createdAt < b.createdAt ? 1:-1
        }
        else if(sortBy === "amount"){
            return a.amount < b.amount ? 1:-1
        }
        else{
            return undefined
        }
    })
}

const determineDate = (date) => {
    if (date === null) {
        return null
    }
    if(Number.isNaN(date._i)){
        return null
    }
    if (date._isAMomentObject) {
        return date
    }

    return moment(date)
}

export default getVisibleExpenses