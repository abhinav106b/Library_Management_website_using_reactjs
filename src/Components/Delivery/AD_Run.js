import axios from "axios";
import React,{useEffect,useState,Component} from "react";
import {Card,CardBody,CardHeader,Button,Table} from 'reactstrap'
import Userdisplay from "../Members/UserDisplay";
import {Puff} from 'react-loader-spinner';


class Pickuptable extends Component{
    constructor(props){
        super(props);
        this.state={
            pickup:"Pickup"
        }
        this.Onclickpickup=this.Onclickpickup.bind(this);
    }
    Onclickpickup(){
        if(this.state.pickup ==="Pickup"){
            this.setState({
                pickup:<span className="fa fa-thumbs-up">Done</span>
            });
        }
        const ChangeStatusToReturned= async()=>{
            const res=await axios.put('http://15.207.107.128:6200/Admin/ChangeStatusToReturned',{user_id:this.props.Data.user_id}).catch((error)=> alert(error));
            console.log(res);
        }
        ChangeStatusToReturned();
    }
    render(){
        return(
            <tr>
                <td>{this.props.pickup.book_id}</td>
                <td>{this.props.pickup.book_name}</td>
                <td>{this.props.pickup.delivery_TS}</td>
                <td><Button onClick={this.Onclickpickup} className="bg-primary">{this.state.pickup}</Button></td>
            </tr>
        );
    }
}

class Fetch_AdRun extends Component{
    constructor(props){
        super(props);   
        this.state={
            Fault:"hello",
            flag:0
        }
        this.OnclickDelivery=this.OnclickDelivery.bind(this);

    }
    OnclickDelivery(){
        this.props.Data.books_need_to_deliver.map((delivery)=>
            axios.put('15.207.107.128:6200/Admin/ChangeStatusToAdRun',{user_id:this.props.Data.user_id,book_id:delivery.book_id})
            .then((res)=>{if(res.data.Result==="error" && this.state.flag===0){alert("error");this.setState({flag:1})}})
            .catch((error)=>{if(this.state.flag===0){alert("Error");this.setState({flag:1})}})
        );
    }
    render(){
        return(
            <div key={this.props.Data.user_id} className="mb-3">
            <Card>
                <CardHeader className="bg-adrun-crd text-white text-left">
                    <div className="row">
                        <div className="col-1">
                            {this.props.cnt+1}
                        </div>
                        <div className="col-12 col-sm-3 text-left">
                            {this.props.Data.full_name}
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="row">
                        <div className="col-2">
                            <h3 className="mb-4 text-left">Delivery</h3>
                        </div>
                        <div className="col-2">
                            <Button onClick={this.OnclickDelivery} className="bg-success" >Deliver</Button>
                        </div>
                    </div>
                    
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Book ID</th>
                                <th>Book Name</th>
                                <th>Delivery_TS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.Data.books_need_to_deliver.map((delivery)=>
                                <tr>
                                    <td>{delivery.book_id}</td>
                                    <td>{delivery.book_name}</td>
                                    <td>{delivery.delivery_TS}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <hr style={{
                        backgroundColor: "grey",
                        height: 2
                        }}></hr>
                    <div className="row">
                        <div className="col-2">
                            <h3 className="mb-4 mt-2 text-left">Pickup</h3>
                        </div>
                    </div>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Book ID</th>
                                <th>Book Name</th>
                                <th>Delivery_TS</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.Data.books_need_to_be_picked.map((pickup)=>
                                <Pickuptable pickup={pickup} />
                            )}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            </div>
        );
    }
}

function Ad_run(){
    const [ad_data,setad_data]=useState([]);
    const [CurrentPage,setCurrentPage]=useState(1);
    const [Loading,setLoading]=useState(false)
    useEffect(()=>{
        setLoading(true);
        const fetch_adrun=async()=>{
            const res= await axios.post('http://15.207.107.128:6200/Admin/afterDeliveryBooks').catch((error)=> alert(error));
            setad_data(res.data.after_delivery);
            setLoading(false);
        }
        fetch_adrun();
    },[]);
    const fetch_addata=(item,index)=>{
        return(
            <div key={item.user_id} className="mb-3">
            <Card>
                <CardHeader className="bg-adrun-crd text-white text-left">
                    <div className="row">
                        <div className="col-1">
                            {index+1}
                        </div>
                        <div className="col-12 col-sm-4 text-left">
                            Id: {item.book_order_id}
                        </div>
                        <div className="col-12 col-sm-3 text-left">
                            {item.full_name}
                        </div>
                        <div className="col-6 col-sm-2 text-right">
                            <Button className="bg-success" >Delivery</Button>
                        </div>
                        <div className="col-6 col-sm-2 text-right">
                            <Button className="bg-primary">Pickup</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <dl className="row text-left">
                        <dt className="col-3">Book name: </dt>
                        <dd className="col-9"> {item.book_name}</dd>
                        <dt className="col-3">Delivery Date: </dt>
                        <dd className="col-9"> {item.delivery_date}</dd>
                        <dt className="col-3">Pickup Date: </dt>
                        <dd className="col-9"> {item.pickup_date}</dd>
                        <dt className="col-3">Mobile no:</dt>
                        <dd className="col-9">{item.mobile_no}</dd>
                        <dt className="col-3">Address</dt>
                        <dd className="col-9">{item.landmark}{item.address}</dd>
                        <dt className="col-3">Pincode</dt>
                        <dd className="col-9">{item.pincode}</dd>
                    </dl>
                </CardBody>
            </Card>
            </div>
        );
    }
    const OnPageChange=(event)=>{
        setCurrentPage(event.selected+1);
    }
    const page=()=>{
        return(
            <div>
                <Userdisplay totalpost={ad_data.length} paginate={OnPageChange} />
            </div>
        );
    }
    const IndexOfLastUser = ((CurrentPage) * 30);
    const IndexOfFirstUser = IndexOfLastUser - 30;
    const CurrentUser = ad_data.slice(IndexOfFirstUser,IndexOfLastUser);
    return(
        <div className="container under-const">
            <div className="row">
                <div className="col-5 lrd-icon">
                <Puff
                    type="Puff"
                    color="#2B7A78"
                    height={70}
                    width={70}
                    visible={Loading}
                />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-9">
                    {
                        CurrentUser.map((data,index)=>
                            <Fetch_AdRun Data={data} cnt={index} />
                        )
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-9 ml-5">
                    {page()}
                </div>
            </div>
        </div>
    );
}
  
export default Ad_run;