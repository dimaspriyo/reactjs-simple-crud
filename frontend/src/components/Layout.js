import React, { Component } from 'react'
import '../../assets/bootstrap/bootstrap.min.css'


export default class Layout extends Component {

    render() {
        return (
            <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        {this.props.left}
                    </div>
                    <div className="col-md-6">
                    {this.props.right}
                    </div>
                </div>
            </div>
            </>
        )
    }
}

// const Layout = (value) => WrappedComponent => {
//     return class WrappedComponent extends Component{
//         render(){
//             return(
//                 <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-6">
//                         {this.props.left}
//                     </div>
//                     <div className="col-md-6">
//                     {this.props.right}
//                     </div>
//                 </div>
//             </div>
//             )
//         }
//     }
// }


// export default Layout;