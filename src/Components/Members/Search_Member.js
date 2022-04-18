import React,{useState,useEffect, Component} from "react";
import axios from 'axios'
import Userdisplay from "./UserDisplay";
import '../css/member.css'
import {Card,CardBody,CardHeader,Input, Table} from 'reactstrap'
import {Button,ButtonGroup,ToggleButton} from 'react-bootstrap'
import { Audio,Puff,TailSpin } from 'react-loader-spinner';


class ShowBookQueue extends Component{
    constructor(props){
        super(props);
        this.state={
            bookqueuedata:[],
            Loading:false,
        }
    }
    componentDidMount(){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Library/GetBooksFromQueue',{user_id:this.props.userid})
        .then((response)=>{
            const res=response.data.queued_books
            this.setState({
                bookqueuedata:res,
                Loading:false
            })
        })
        .catch((error)=> alert(error))
        
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            Loading:true,
        })
        axios.post('http://15.207.107.128:6200/Library/GetBooksFromQueue',{user_id:nextProps.userid})
        .then((response)=>{
            const res=response.data.queued_books
            this.setState({
                bookqueuedata:res,
                Loading:false
            })
        })
        .catch((error)=> alert(error))
    }
    render(){
        if(!this.props.user){
            return null;
        }
        else if (this.state.bookqueuedata.length===0 && this.state.Loading===false ){
            return(
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Book queue</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div>Data is empty</div>
                    </CardBody>
                </Card>
            );
        }
        return(
            <div>
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Book data</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="table-pymt">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Book ID</th>
                                    <th>Book name</th>
                                    <th>Catalouge ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.bookqueuedata.map((data,index)=>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{data.book_id}</td>
                                        <td>{data.book_name}</td>
                                        <td>{data.catalogue_id}</td>
                                        <td>{data.status}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

class ShowPaymentHistory extends Component{
    constructor(props){
        super(props);
        this.state={
            paymenthistorydata:[],
            Loading:false
        }
    }
    componentDidMount(){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Library/paymentHistories',{user_id:this.props.userid})
        .then((response)=>{
            const res=response.data.payment_history
            this.setState({
                paymenthistorydata:res,
                Loading:false
            })
        })
        .catch((error)=> alert(error))
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Library/paymentHistories',{user_id:nextProps.userid})
        .then((response)=>{
            const res=response.data.payment_history
            this.setState({
                paymenthistorydata:res,
                Loading:false
            })
        })
        .catch((error)=> alert(error))
    }
    render(){
        if(!this.props.user){
            return null;
        }
        else if (this.state.paymenthistorydata.length===0 && this.state.Loading===false ){
            return(
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Payment History</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div>Data is empty</div>
                    </CardBody>
                </Card>
            );
        }
        return(
            <div>
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Payment History</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="table-pymt">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Payment date</th>
                                    <th>verification date</th>
                                    <th>Amount paid</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.paymenthistorydata.map((data,index)=>
                                    <tr>
                                        <td>{data.transaction_id}</td>
                                        <td>{data.payment_date}</td>
                                        <td>{data.payment_verification_date}</td>
                                        <td>{data.amount_paid}</td>
                                        <td>{data.payment_status}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

class ShowBorrowedBooks extends Component{
    constructor(props){
        super(props);
        this.state={
            borroweddata:[],
            Loading:false
        }
    }
    componentDidMount(){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Admin/GetBorrowedBooks',{user_id:this.props.userid})
        .then((response)=>{
            const res=response.data.borrowed_bks
            this.setState({
                borroweddata:res,
                Loading:false
            })
        })
        .catch((error)=> alert(error))
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Admin/GetBorrowedBooks',{user_id:nextProps.userid})
        .then((response)=>{
            const res=response.data.borrowed_bks
            this.setState({
                borroweddata:res,
                Loading:false
            })
        })
        .catch((error)=> alert(error))
    }
    
    render(){
        if(!this.props.user){
            return null;
        }
        else if (this.state.borroweddata.length===0 && this.state.Loading===false ){
            return(
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Borrowed History</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div>Data is empty</div>
                    </CardBody>
                </Card>
            );
        }
        return(
            <div>
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Borrowed History</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="table-pymt">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>No:</th>
                                    <th>Delivered on</th>
                                    <th>Returned on</th>
                                    <th>Barcode</th>
                                    <th>Book name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.borroweddata.map((data,index)=>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{data.delivered_on}</td>
                                        <td>{data.returned_on}</td>
                                        <td>{data.barcode}</td>
                                        <td>{data.book_name}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

class Showcurrentbooks extends Component{
    constructor(props){
        super(props);
        this.state={
            bookdata:[],
            Loading:false
        }
    }
    componentDidMount(){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Admin/GetCurrentBooks',{user_id:this.props.userid})
        .then((response)=>{
            const res=response.data.current_bks
            this.setState({
                bookdata:res,
                Loading:false
            })
        })
        .catch((error)=> alert(error))
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Admin/GetCurrentBooks',{user_id:nextProps.userid})
        .then((response)=>{
            const res=response.data.current_bks
            this.setState({
                bookdata:res,
                Loading:false
            })
        })
        .catch((error)=> alert(error))
    }
    render(){
        if(!this.props.user){
            return null;
        }
        else if (this.state.bookdata.length===0 && this.state.Loading===false ){
            return(
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Current Books</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div>Data is empty</div>
                    </CardBody>
                </Card>
            );
        }
        return(
            <div>
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Current Books</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="table-pymt">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>No:</th>
                                    <th>Barcode</th>
                                    <th>Delivered on</th>
                                    <th>Book name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.bookdata.map((data,index)=>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{data.barcode}</td>
                                        <td>{data.delivered_on}</td>
                                        <td>{data.book_name}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            userdata:[],
            Loading:false,
            error:false
        }
    }
    componentDidMount(){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Library/userAccountDetails',{user_id:this.props.userid})
        .then((response)=>{
            if(response.data.Result==="Error"){
                this.setState({
                    error:true
                })
            }
            else{
                const res=response.data.user_details
                this.setState({
                    userdata:res,
                    Loading:false
                })
            }
        })
        .catch((error)=> alert(error))
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Library/userAccountDetails',{user_id:this.props.userid})
        .then((response)=>{
            if(response.data.Result==="Error"){
                this.setState({
                    error:true
                })
            }
            else{
                const res=response.data.user_details
                this.setState({
                    userdata:res,
                    Loading:false
                })
            }
        })
        .catch((error)=> alert(error))
    }
    render(){
        if(!this.props.user){
            return null;
        }
        else if (this.state.error){
            return(
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Details</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div>Data is empty</div>
                    </CardBody>
                </Card>
            );
        }
        else if(!this.state.userdata && this.state.Loading===false){
            return(
                <Card>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Details</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div>Data is empty</div>
                    </CardBody>
                </Card>
            );
        }
        return (
            <div>
                <Card>
                    <CardHeader className="text-center bg-1 cursor-pointer text-white">
                        <div className="row">
                            <div className="col-9 text-center">
                                <h5>Details</h5>
                            </div>
                            <div className="col-2 pd-test">
                                <Button variant="danger" className="btn-sm" onClick={this.props.clear}>X</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="container text-left"><div className="row">
                            <div className="col-3">Name:</div>
                            <div className="col-9 crd-brd-btm">{this.state.userdata.full_name}</div>
                            <div className="col-3">Email:</div>
                            <div className="col-9 crd-brd-btm">{this.state.userdata.email}</div>
                            <div className="col-3">Address:</div>
                            <div className="col-9 crd-brd-btm">{this.state.userdata.address}, {this.state.userdata.city}, {this.state.userdata.state}</div>
                            <div className="col-3">Mobile No:</div>
                            <div className="col-9 crd-brd-btm">{this.state.userdata.mobile_no}</div>
                            <div className="col-3">Pincode:</div>
                            <div className="col-9 crd-brd-btm">{this.state.userdata.pincode}</div>
                            <div className="col-3">Data joined:</div>
                            <div className="col-9 crd-brd-btm">{this.state.userdata.date_joined}</div>
                            <div className="col-3">Subscription ends on:</div>
                            <div className="col-9 crd-brd-btm">{this.state.userdata.subscription_end_date}</div>
                            <div className="col-3">Status:</div>
                            <div className="col-9">{this.state.userdata.subscription_status}</div>
                        </div></div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
class Search_member extends Component{
    constructor(props){
        super(props);
        this.state={
            SUN:false,
            MON:false,
            TUE:false,
            WED:false,
            THU:false,
            FRI:false,
            SAT:false,
            usercard:"",
            currentbooks:"",
            borrowedbooks:"",
            paymenthistory:"",
            bookqueue:"",
            clicked:"",
            new:false,
            users:this.props.user,
            testcheck:true
        }
        this.Onbeatclick=this.Onbeatclick.bind(this);
        this.test1=this.test1.bind(this);
    }
    componentDidMount(){
        axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
        .then(response=>{
            if(response.data.day_data.selected_day_name===undefined){
                this.setState({
                    new:true,
                    SUN:false,
                    MON:false,
                    TUE:false,
                    WED:false,
                    THU:false,
                    FRI:false,
                    SAT:false
                })
            }
            else if(response.data.day_data.selected_day_name.length===0){
                this.setState({
                    SUN:false,
                    MON:false,
                    TUE:false,
                    WED:false,
                    THU:false,
                    FRI:false,
                    SAT:false
                })
            }      
            else{
                const splitdata = response.data.day_data.selected_day_name.split(',')
                splitdata.map((data)=>{
                    if(data==="Sun"){
                        this.setState({
                            SUN:true
                        })
                    }
                    else if(data=="Mon"){
                        this.setState({
                            MON:true
                        })
                    }
                    else if(data=="Tue"){
                        this.setState({
                            TUE:true
                        })
                    }
                    else if(data=="Wed"){
                        this.setState({
                            WED:true
                        })
                    }
                    else if(data=="Thu"){
                        this.setState({
                            THU:true
                        })
                    }
                    else if(data=="Fri"){
                        this.setState({
                            FRI:true
                        })
                    }
                    else if(data=="Sat"){
                        this.setState({
                            SAT:true
                        })
                    }
                }
                )
            }
        })
        .catch((error)=> alert(error))
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:nextProps.user.user_id})
        .then(response=>{
            if(response.data.day_data.selected_day_name===undefined){
                console.log("went inside undefined ",nextProps.user.user_id)
                this.setState({
                    new:true,
                    SUN:false,
                    MON:false,
                    TUE:false,
                    WED:false,
                    THU:false,
                    FRI:false,
                    SAT:false
                })
            }
            else if(response.data.day_data.selected_day_name.length===0){
                console.log("Went inside ===0",nextProps.user.user_id)
                this.setState({
                    SUN:false,
                    MON:false,
                    TUE:false,
                    WED:false,
                    THU:false,
                    FRI:false,
                    SAT:false
                })
            }      
            else{
                const splitdata = response.data.day_data.selected_day_name.split(',')
                splitdata.map((data)=>{
                    if(data==="Sun"){
                        this.setState({
                            SUN:true
                        })
                    }
                    else if(data=="Mon"){
                        this.setState({
                            MON:true
                        })
                    }
                    else if(data=="Tue"){
                        this.setState({
                            TUE:true
                        })
                    }
                    else if(data=="Wed"){
                        this.setState({
                            WED:true
                        })
                    }
                    else if(data=="Thu"){
                        this.setState({
                            THU:true
                        })
                    }
                    else if(data=="Fri"){
                        this.setState({
                            FRI:true
                        })
                    }
                    else if(data=="Sat"){
                        this.setState({
                            SAT:true
                        })
                    }
                }
                )
            }
        })
        .catch((error)=> alert(error))
    }

    test1(){
        if(this.props.test!==this.state.testcheck){
            console.log("Did mount happening so at test happy ",this.props.user.user_id);
            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
            .then(response=>{
                if(response.data.day_data.selected_day_name===undefined){
                    console.log("went inside undefined ")
                    this.setState({
                        new:true,
                        SUN:false,
                        MON:false,
                        TUE:false,
                        WED:false,
                        THU:false,
                        FRI:false,
                        SAT:false
                    })
                }
                else if(response.data.day_data.selected_day_name.length===0){
                    console.log("went inside ==0")
                    this.setState({
                        SUN:false,
                        MON:false,
                        TUE:false,
                        WED:false,
                        THU:false,
                        FRI:false,
                        SAT:false
                    })
                }      
                else{
                    const splitdata = response.data.day_data.selected_day_name.split(',')
                    splitdata.map((data)=>{
                        if(data==="Sun"){
                            this.setState({
                                SUN:true
                            })
                        }
                        else if(data=="Mon"){
                            this.setState({
                                MON:true
                            })
                        }
                        else if(data=="Tue"){
                            this.setState({
                                TUE:true
                            })
                        }
                        else if(data=="Wed"){
                            this.setState({
                                WED:true
                            })
                        }
                        else if(data=="Thu"){
                            this.setState({
                                THU:true
                            })
                        }
                        else if(data=="Fri"){
                            this.setState({
                                FRI:true
                            })
                        }
                        else if(data=="Sat"){
                            this.setState({
                                SAT:true
                            })
                        }
                    }
                    )
                }
            })
        }
    }
    Onbeatclick(e){
        if(e.target.id=="sun"){
            console.log("this is new ",this.state.new);
            this.setState({
                SUN:!this.state.SUN
            },()=>{
                if(this.state.SUN===true){
                    if(this.state.new===true){
                        this.setState({
                            clicked:"Sun",
                            new:false
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/AddDaysToUser',{user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                        })
                        
                    }
                    else if(this.state.clicked.length===0){
                        this.setState({
                            clicked:"Sun"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id}).catch((error)=> alert(error))
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                    else{
                        this.setState({
                            clicked:this.state.clicked+",Sun"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked})
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                }
                else{
                    if(!this.state.clicked){
                        console.log("Empty on false");
                    }
                    else{
                        const splitdata = this.state.clicked.split(',')
                        const Indexele = splitdata.indexOf("Sun")
                        if(Indexele>-1){
                            splitdata.splice(Indexele,1);
                            if(splitdata.length===0){
                                this.setState({
                                    clicked:""
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                            axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                            else{
                                this.setState({
                                    clicked:splitdata.toString()
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                        axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked})
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                        }
                    }
                }
            })
        }
        else if(e.target.id=="mon"){
            this.setState({
                MON:!this.state.MON
            },()=>{
                if(this.state.MON===true){
                    if(this.state.new===true){
                        this.setState({
                            clicked:"Mon",
                            new:false
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/AddDaysToUser',{user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                        })
                    }
                    else if(this.state.clicked.length===0){
                        this.setState({
                            clicked:"Mon"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                    else{
                        this.setState({
                            clicked:this.state.clicked+",Mon"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                }
                else{
                    if(!this.state.clicked){
                        console.log("Empty on false");
                    }
                    else{
                        const splitdata = this.state.clicked.split(',')
                        const Indexele = splitdata.indexOf("Mon")
                        if(Indexele>-1){
                            splitdata.splice(Indexele,1);
                            if(splitdata.length===0){
                                this.setState({
                                    clicked:""
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                            axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                            else{
                                this.setState({
                                    clicked:splitdata.toString()
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                        axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                        }
                    }
                }
            })
        }
        else if(e.target.id=="tue"){
            this.setState({
                TUE:!this.state.TUE
            },()=>{
                if(this.state.TUE===true){
                    if(this.state.new===true){
                        this.setState({
                            clicked:"Tue",
                            new:false
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/AddDaysToUser',{user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                        })
                    }
                    else if(this.state.clicked.length===0){
                        this.setState({
                            clicked:"Tue"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                    else{
                        this.setState({
                            clicked:this.state.clicked+",Tue"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                }
                else{
                    if(!this.state.clicked){
                        console.log("Empty on false");
                    }
                    else{
                        const splitdata = this.state.clicked.split(',')
                        const Indexele = splitdata.indexOf("Tue")
                        if(Indexele>-1){
                            splitdata.splice(Indexele,1);
                            if(splitdata.length===0){
                                this.setState({
                                    clicked:""
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                            axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                            else{
                                this.setState({
                                    clicked:splitdata.toString()
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                        axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                        }
                    }
                }
            })
        }
        else if(e.target.id==="wed"){
            this.setState({
                WED:!this.state.WED
            },()=>{
                if(this.state.WED===true){
                    if(this.state.new===true){
                        this.setState({
                            clicked:"Wed",
                            new:false
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/AddDaysToUser',{user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                        })
                    }
                    else if(this.state.clicked.length===0){
                        this.setState({
                            clicked:"Wed"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                    else{
                        this.setState({
                            clicked:this.state.clicked+",Wed"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                }
                else{
                    if(!this.state.clicked){
                        console.log("Empty on false");
                    }
                    else{
                        const splitdata = this.state.clicked.split(',')
                        const Indexele = splitdata.indexOf("Wed")
                        if(Indexele>-1){
                            splitdata.splice(Indexele,1);
                            if(splitdata.length===0){
                                this.setState({
                                    clicked:""
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                            axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                            else{
                                this.setState({
                                    clicked:splitdata.toString()
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                        axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                        }
                    }
                }
            })
        }
        else if(e.target.id==="thu"){
            this.setState({
                THU:!this.state.THU
            },()=>{
                if(this.state.THU===true){
                    if(this.state.new===true){
                        this.setState({
                            clicked:"Thu",
                            new:false
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/AddDaysToUser',{user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                        })
                    }
                    else if(this.state.clicked.length===0){
                        this.setState({
                            clicked:"Thu"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                    else{
                        this.setState({
                            clicked:this.state.clicked+",Thu"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                }
                else{
                    if(!this.state.clicked){
                        console.log("Empty on false");
                    }
                    else{
                        const splitdata = this.state.clicked.split(',')
                        const Indexele = splitdata.indexOf("Thu")
                        if(Indexele>-1){
                            splitdata.splice(Indexele,1);
                            if(splitdata.length===0){
                                this.setState({
                                    clicked:""
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                            axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                            else{
                                this.setState({
                                    clicked:splitdata.toString()
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                        axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                        }
                    }
                }
            })
        }
        else if(e.target.id==="fri"){
            this.setState({
                FRI:!this.state.FRI
            },()=>{
                if(this.state.FRI===true){
                    if(this.state.new===true){
                        this.setState({
                            clicked:"Fri",
                            new:false
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/AddDaysToUser',{user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                        })
                    }
                    else if(this.state.clicked.length===0){
                        this.setState({
                            clicked:"Fri"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                    else{
                        this.setState({
                            clicked:this.state.clicked+",Fri"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                }
                else{
                    if(!this.state.clicked){
                        console.log("Empty on false");
                    }
                    else{
                        const splitdata = this.state.clicked.split(',')
                        const Indexele = splitdata.indexOf("Fri")
                        if(Indexele>-1){
                            splitdata.splice(Indexele,1);
                            if(splitdata.length===0){
                                this.setState({
                                    clicked:""
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                            axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                            else{
                                this.setState({
                                    clicked:splitdata.toString()
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                        axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                        }
                    }
                }
            })
        }
        else if(e.target.id==="sat"){
            this.setState({
                SAT:!this.state.SAT
            },()=>{
                if(this.state.SAT===true){
                    if(this.state.new===true){
                        this.setState({
                            clicked:"Sat",
                            new:false
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/AddDaysToUser',{user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                        })
                    }
                    else if(this.state.clicked.length===0){
                        this.setState({
                            clicked:"Sat"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                    else{
                        this.setState({
                            clicked:this.state.clicked+",Sat"
                        },()=>{
                            axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                            .then((response)=>{
                                this.setState({
                                    DayId:response.data.day_data.day_id
                                },()=>{
                                    axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                }) 
                            })
                            .catch((error)=> alert(error))
                        })
                    }
                }
                else{
                    if(!this.state.clicked){
                        console.log("Empty on false");
                    }
                    else{
                        const splitdata = this.state.clicked.split(',')
                        const Indexele = splitdata.indexOf("Sat")
                        if(Indexele>-1){
                            splitdata.splice(Indexele,1);
                            if(splitdata.length===0){
                                this.setState({
                                    clicked:""
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                            axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                            else{
                                this.setState({
                                    clicked:splitdata.toString()
                                },()=>{
                                    axios.post('http://15.207.107.128:6200/Admin/showDays',{user_id:this.props.user.user_id})
                                    .then((response)=>{
                                        this.setState({
                                            DayId:response.data.day_data.day_id
                                        },()=>{
                                        axios.put('http://15.207.107.128:6200/Admin/UpdateDaysToUser',{day_id:this.state.DayId,user_id:this.props.user.user_id,day_num:this.state.clicked}).catch((error)=> alert(error))
                                        }) 
                                    })
                                    .catch((error)=> alert(error))
                                })
                            }
                        }
                    }
                }
            })
        }
    }
    render(){
        const onclickable=()=>{
            const s="user";
            this.setState({
                currentbooks:"",
                borrowedbooks:"",
                usercard:s,
                paymenthistory:"",
                bookqueue:""
            });
        }
        const Onclickcurrentbooks=()=>{
            const c="currentbooks";
            this.setState({
                usercard:"",
                borrowedbooks:"",
                currentbooks:c,
                paymenthistory:"",
                bookqueue:""
            })
        }
        const Onclickborrowedbooks=()=>{
            this.setState({
                borrowedbooks:"borrowedbooks",
                usercard:"",
                currentbooks:"",
                paymenthistory:"",
                bookqueue:""
            })
        }
        const Onclickpaymenthistory=()=>{
            this.setState({
                paymenthistory:"paymenthistory",
                usercard:"",
                currentbooks:"",
                borrowedbooks:"",
                bookqueue:""
            })
        }
        const Onclickbookqueue=()=>{
            this.setState({
                bookqueue:"bookqueue",
                usercard:"",
                currentbooks:"",
                borrowedbooks:"",
                paymenthistory:""
            })
        }
        const clearusercard=()=>{
            this.setState({
                usercard:""
            });
        }
        const clearcurrentbooks=()=>{
            this.setState({
                currentbooks:""
            })
        }
        const clearborrowedbooks=()=>{
            this.setState({
                borrowedbooks:""
            })
        }
        const clearpaymenthistory=()=>{
            this.setState({
                paymenthistory:""
            })
        }
        const clearbookqueue=()=>{
            this.setState({
                bookqueue:""
            })
        }
        return(
            <div className="row">
            <div className="col-12 col-md-7">
                <Card>
                    <a onClick={onclickable}>
                    <CardHeader className="bg-1 cursor-pointer text-white text-left">
                        <div className="row">
                            <div className="col-12 col-sm-2 text-left">
                                Id: {this.props.user.user_id}
                            </div>
                            <div className="col-12 col-sm-7 text-left">
                                {this.props.user.full_name}
                            </div>
                        </div>
                    </CardHeader>
                    </a>
                    <CardBody>
                        <dl className="row text-left">
                            <dt className="col-6">Member delivery Comment: </dt>
                            <dd className="col-6"></dd>
                            <dt className="col-12">Admin Comments: </dt>
                            <dt className="col-3">Email</dt>
                            <dd className="col-9">{this.props.user.email}</dd>
                            <dt className="col-3">Address</dt>
                            <dd className="col-9">{this.props.user.address}</dd>
                            <dt className="col-3">Pincode</dt>
                            <dd className="col-9">{this.props.user.pincode}</dd>
                            <dt className="col-3">Beat:</dt>
                            <div className="col-9 act">
                                <Button onClick={this.Onbeatclick} id="sun" active={this.state.SUN} variant="light" className="btn-sm brd" >Sun</Button>
                                <Button onClick={this.Onbeatclick} id="mon" active={this.state.MON} variant="light" className="btn-sm brd" >Mon</Button>
                                <Button onClick={this.Onbeatclick} id="tue" active={this.state.TUE} variant="light" className="btn-sm brd" >Tue</Button>
                                <Button onClick={this.Onbeatclick} id="wed" active={this.state.WED} variant="light" className="btn-sm brd" >Wed</Button>
                                <Button onClick={this.Onbeatclick} id="thu" active={this.state.THU} variant="light" className="btn-sm brd" >Thu</Button>
                                <Button onClick={this.Onbeatclick} id="fri" active={this.state.FRI} variant="light" className="btn-sm brd" >Fri</Button>
                                <Button onClick={this.Onbeatclick} id="sat" active={this.state.SAT} variant="light" className="btn-sm brd" >Sat</Button>
                            </div>
                            <div className="fnt-p">
                                    <p>Joining date:{this.props.user.date_joined}. Subscription plan {this.props.user.type_of_subscription}. 
                                    Subscription expiry:{this.props.user.expiry_date}.
                                    {this.props.user.books_taken} books borrowed worth Rs {this.props.user.total_amount} by spending Rs {this.props.user.amt_books} and thus saving Rs {this.props.user.total_amount-this.props.user.amt_books}.</p>
                                </div>
                            <div>
                                <p>Quick Actions: <a onClick={Onclickcurrentbooks} className="pa-1">show Current Books</a>|<a onClick={Onclickbookqueue} className="pa-1">Show Queue</a>|<a onClick={Onclickborrowedbooks} className="pa-1">Show History</a>|<a onClick={Onclickpaymenthistory} className="pa-1">Show Payments</a></p>
                            </div>
                        </dl>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12 col-md-5">
                <Details userid={this.props.user.user_id} user={this.state.usercard} clear={clearusercard}/>
                <Showcurrentbooks userid={this.props.user.user_id} user={this.state.currentbooks} clear={clearcurrentbooks}/>
                <ShowBorrowedBooks userid={this.props.user.user_id} user={this.state.borrowedbooks} clear={clearborrowedbooks} />
                <ShowPaymentHistory userid={this.props.user.user_id} user={this.state.paymenthistory} clear={clearpaymenthistory} />
                <ShowBookQueue userid={this.props.user.user_id} user={this.state.bookqueue} clear={clearbookqueue} />
            </div>
            </div>
        );
    }
}

class Search_main extends Component{
    constructor(props){
        super(props);
        this.state={
            result_value:"",
            Users_result:[],
            CurrentUsers:[],
            beat:"",
            test:false,
            Loading:false
        };
        this.search_input=this.search_input.bind(this);
        this.OnPageChange=this.OnPageChange.bind(this);
        this.page=this.page.bind(this);
    }
    search_input(){
        const fetch_hello=async()=>{
            this.setState({
                Loading:true
            })
            axios.post('http://15.207.107.128:6200//Admin/GetUsersByName',{name:this.result.value})
            .then((res)=>
                this.setState({
                    result_value:this.result.value,
                    Users_result:res.data.all_users,
                    CurrentPage:1,
                    test:!this.state.test,
                    Loading:false
                })
            )
            .catch((error)=> alert(error));
        }
        fetch_hello();    
    }
    OnPageChange(event){
        this.setState({
            CurrentPage:(event.selected+1)
        });
    }
    page(){
        return(
            <div>
                <Userdisplay totalpost={this.state.Users_result.length} paginate={this.OnPageChange} />
            </div>
        );
    }
    render(){
        const IndexOfLastUser = ((this.state.CurrentPage) * 30);
        const IndexOfFirstUser = IndexOfLastUser - 30;
        const CurrentUser = this.state.Users_result.slice(IndexOfFirstUser,IndexOfLastUser);
        return(
            <div className="container under-const">
            <div className="row">
                <div className="col-10 col-sm-5">
                    <div className="icon-pos">
                    <span className="fa fa-search search-icon"></span>
                    </div>
                    <Input className="search-box" type="text" id="search" name="search"
                    placeholder="search bar"
                    innerRef={(input)=>this.result=input}
                    />
                </div>
                <div className="col-1 search-clm">
                    <Button onClick={this.search_input} className="search-btn" type="submit" color="primary" >GO</Button>
                </div>
                <div className="col-1">
                    <Audio
                        type="Puff"
                        color="#228B22"
                        height={40}
                        width={40}
                        visible={this.state.Loading}
                    />
                </div>
            </div>
            <div className="mt-5">
                <div>
                    {
                        CurrentUser.map((user)=>
                            <div>
                            <ul className="list-group mb-4">
                            <Search_member user={user} />
                            </ul>
                            </div>
                        )
                    }
                    
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6">
                    {this.page()}
                </div>
            </div>
        </div>
        );
    }
}

export default Search_main;