import React from 'react'
import { connect } from 'react-redux'


const AccountInfo = (props) => {
    return (
        <div>
        {console.log(props.auth)}
            {props.auth? <p>You are authenticated</p>: <p>Please Login In</p>}
         
        </div>
    )

}

const mapStateToProps = (state) => {
    console.log(state   )
    return {
        auth: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(AccountInfo)