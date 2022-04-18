import axios from "axios";
import React,{Component} from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";


class DeliverySlip extends Component{
    constructor(props){
        super(props);
        this.state={
            deliveryslipdata:[],
            Loading:false
        }
    }
    componentDidMount(){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/getDeliverySlips')
        .then((response)=>{
            const res=response.data.delivery_slips
            console.log("data res ",res)
            this.setState({
                deliveryslipdata:res,
                Loading:false
            })
        })
    }
    render(){
        if(this.state.Loading){
            return(
                <div><h2>Loading ...</h2></div>
            );
        }
        return(
            <div className="container"><div className="row"><div className="col-12 col-lg-10">{this.state.deliveryslipdata.map((delivery)=>
                <Card className="mt-3">
                    <CardHeader>
                        <div className="container">
                        <div className="row text-left">
                            <div className="col-6"><strong>Name:</strong>   {delivery.full_name}</div>
                            <div className="col-6"><strong>Pincode:</strong>   {delivery.pincode}</div>
                            <div className="col-12"><strong>Address:</strong>   {delivery.address}</div>
                            <div className="col-6"><strong>Mobile: </strong>  {delivery.mobile_no}</div>
                            <div className="col-6"><strong>Date:</strong>   {delivery.joining_date}</div>
                            <div className="col-6"><strong>Landmark:</strong>   {delivery.landmark}</div>
                            <div className="col-6"><strong>Beat:</strong>   {delivery.beat_days}</div>
                        </div>
                        </div>
                    </CardHeader>
                    <CardBody className="table-pymt">
                        <h5 className="text-left">Delivery</h5>
                        <Table bordered striped>
                            <thead className="deliveryslip-fnt">
                                <tr>
                                    <th>No:</th>
                                    <th>Book ID</th>
                                    <th>Book name</th>
                                </tr>
                            </thead>
                            <tbody className="deliveryslip-fnt">
                            {delivery.books_need_to_deliver.map((deliver,index)=>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{deliver.book_id}</td>
                                    <td>{deliver.book_name}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        <div className="mt-1 text-left"><h5>Pickup</h5></div>
                        <Table bordered striped>
                            <thead className="deliveryslip-fnt">
                                <tr>
                                    <th>No:</th>
                                    <th>Book ID</th>
                                    <th>Book name</th>
                                </tr>
                            </thead>
                            <tbody className="deliveryslip-fnt">
                            {delivery.books_need_to_be_picked.map((deliver,index)=>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{deliver.book_id}</td>
                                    <td>{deliver.book_name}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            )}
            </div>
            </div>
            </div>
        );
    }
}
  
export default DeliverySlip;