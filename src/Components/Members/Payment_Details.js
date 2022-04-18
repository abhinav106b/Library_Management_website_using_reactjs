import axios from "axios";
import React,{Component} from "react";
import {Table} from 'reactstrap'
import {Puff} from 'react-loader-spinner';



class Payment_details extends Component{
    constructor(props){
        super(props);
        this.state={
            paymentdata:[],
            v:<span className="fa fa-thumbs-up">Verified</span>,
            un:<span className="fa fa-thumbs-down">Unverified</span>,
            Loading:false
        }
    }
    componentDidMount(){
        this.setState({
            Loading:true
        })
        axios.get('http://15.207.107.128:6200/Admin/ShowAllPayment')
        .then((response)=>{
            this.setState({
                paymentdata:response.data.payment_history,
                Loading:false
            })
        })
        .catch((error)=>alert(error));
    }
    render(){    
        const status=(data,id,trans_id)=>{
            const updatestatus=(s,id,trans_id)=>{
                if(s==="Verified"){
                    axios.post('http://15.207.107.128:6200/Admin/UpdatePaymentStatus',{user_id:id,transaction_id:trans_id,payment_status:"UNVERIFIED"})
                    .catch((error)=>
                        alert(error)
                    );
                }
                else{
                    axios.post('http://15.207.107.128:6200/Admin/UpdatePaymentStatus',{user_id:id,transaction_id:trans_id,payment_status:"VERIFIED"})
                    .catch((error)=>alert(error));
                }
            }
            if(data==="VERIFIED"){
                return(
                    <button onClick={()=>{updatestatus("Verified",id,trans_id)}} className="btn btn-sm btn-success">{this.state.v}</button>
                );
            }
            else{
                return(
                    <button onClick={()=>{updatestatus("Unverified",id,trans_id)}} className="btn btn-sm btn-danger">{this.state.un}</button>
                );
            }
        }
        return(
            <div className="container under-const">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <h3 className="text-left fnt-hd-pymt">Payment Sumaries</h3>
                    </div>
                    <div className="col-12 col-sm-1">
                        <Puff
                            type="Puff"
                            color="#2B7A78"
                            height={70}
                            width={70}
                            visible={this.state.Loading}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <div className="row pymt-box">
                        <div className="col-1">Filters: </div>  
                        <div className="col-11 col-lg-6">
                            <button className="btn btn-pymt btn-success btn-sm">Verified</button>
                            <button className="btn btn-pymt btn-success btn-sm">Unverified</button>
                            <button className="btn btn-pymt btn-success btn-sm">Cash</button>
                            <button className="btn btn-pymt btn-success btn-sm">Pg</button>
                            <button className="btn btn-pymt btn-light btn-sm">Cancelled</button>
                        </div>  
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-9 table-pymt">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Member</th>
                                    <th>Ref#</th>
                                    <th>Mode</th>
                                    <th>Due</th>
                                    <th>Actual</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.paymentdata.map((user,index)=>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{user.payment_date}</td>
                                        <td>{user.user_name}</td>
                                        <td>{user.transaction_id}</td>
                                        <td>{}</td>
                                        <td>{user.amount_paid}</td>
                                        <td>{user.amount_paid}</td>
                                        <td>{status(user.payment_status,user.user_id,user.transaction_id)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

  
export default Payment_details;