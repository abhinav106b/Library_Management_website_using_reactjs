import React,{Component,useState} from "react";
import {Card,CardBody,CardHeader,Button} from 'reactstrap'
import axios from 'axios'
import '../css/delivery.css'



class Fetch_BdRun extends Component{
    constructor(props){
        super(props);
        this.state={
            approve:"Approve",
            sun:false,
            mon:false,
            tue:false,
            wed:false,
            thu:false,
            fri:false,
            sat:false
        }
        this.Onclickapprove=this.Onclickapprove.bind(this);
        this.Onbeatclick=this.Onbeatclick.bind(this);
    }
    Onclickapprove(){
        if(this.state.approve==="Approve"){
            this.setState({
                approve:<span className="fa fa-check">Approved</span> 
            });
        }
        const ChangeStatusToReturned= async()=>{
            const res=await axios.put('http://15.207.107.128:6200/Admin/ChangeStatusToAdRun',{user_id:this.props.Data.user_id})
            .then((response)=>{
                console.log(response.data.Result)
                if(response.data.Result==="Error"){
                    alert("Error !!!");
                    this.setState({
                        approve:"Approve"
                    })
                }
            })
            .catch((error)=>alert(error));
        }
        ChangeStatusToReturned();
    }
    Onbeatclick(e){
        console.log(e.target.id);
        if(e.target.id=="sun"){
            this.setState({
                sun:!this.state.sun
            });
            console.log("sun");
        }
        else if(e.target.id=="mon"){
            this.setState({
                mon:!this.state.mon
            });
            console.log("mon");
        }
        else if(e.target.id=="tue"){
            this.setState({
                tue:!this.state.tue
            });
        }
        else if(e.target.id==="wed"){
            this.setState({
                wed:!this.state.wed
            });
        }
        else if(e.target.id==="thu"){
            this.setState({
                thu:!this.state.thu
            });
        }
        else if(e.target.id==="fri"){
            this.setState({
                fri:!this.state.fri
            });
        }
        else if(e.target.id==="sat"){
            this.setState({
                sat:!this.state.sat
            });
        }
    }
    render(){
        return(
            <div  className="row row-pd-1">
            <div className="col-12 col-sm-10 center">
                <Card>
                    <CardHeader className="bg-1 text-white text-left">
                        <div className="row">
                            <div className="col-1">
                                {this.props.cnt+1}
                            </div>
                            <div className="col-12 col-sm-4 text-left">
                                Id: {this.props.Data.book_order_id}
                            </div>
                            <div className="col-12 col-sm-3 text-left">
                                {this.props.Data.full_name}
                            </div>
                            <div className="col-6 col-sm-2 text-right">
                                <Button onClick={this.Onclickapprove} className="bg-success" >{this.state.approve}</Button>
                            </div>
                            <div className="col-6 col-sm-2 text-right">
                                <Button className="bg-danger">Delete</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <dl className="row text-left">
                            <dt className="col-3">Email</dt>
                            <dd className="col-9">{this.props.Data.email}</dd>
                            <dt className="col-3">Address</dt>
                            <dd className="col-9">{this.props.Data.address}</dd>
                            <dt className="col-3">Pincode</dt>
                            <dd className="col-9">{this.props.Data.pincode}</dd>
                            <dt className="col-3">City</dt>
                            <dd className="col-9">{this.props.Data.city}</dd>
                            <dt className="col-3">Beat:</dt>
                            <div className="col-9 act-1">
                                <Button id="sun" active={this.state.sun} variant="light" className="btn-sm brd" >Sun</Button>
                                <Button id="mon" active={this.state.mon} variant="light" className="btn-sm brd" >Mon</Button>
                                <Button id="tue" active={this.state.tue} variant="light" className="btn-sm brd" >Tue</Button>
                                <Button id="wed" active={this.state.wed} variant="light" className="btn-sm brd" >Wed</Button>
                                <Button id="thu" active={this.state.thu} variant="light" className="btn-sm brd" >Thu</Button>
                                <Button id="fri" active={this.state.fri} variant="light" className="btn-sm brd" >Fri</Button>
                                <Button id="sat" active={this.state.sat} variant="light" className="btn-sm brd" >Sat</Button>
                            </div>
                            <dt className="col-12">
                                <p className="pd-2">This customer joined the website on {this.props.Data.date_joined}. Subscription is expiring on {this.props.Data.expiry_date}-{this.props.Data.days_left.substring(0,4)}ays more.
                                {this.props.Data.books_taken} books borrowed worth Rs {this.props.Data.total_amt} by spending Rs {this.props.Data.total_amt_book_read} and thus saving Rs {this.props.Data.total_amt-this.props.Data.total_amt_book_read}.</p>
                            </dt>
                        </dl>
                    </CardBody>
                </Card>
            </div>
        </div>
        );
    }
}



class bd_run extends Component{
    constructor(props){
        super(props);
        this.state={
            book_data :[],
            Loading:false
        };
        this.OnEmpty=this.OnEmpty.bind(this);
    }
    componentDidMount(){
        this.setState({
            Loading:true
        })
        axios.get('http://15.207.107.128:6200/Admin/BDRun')
        .then(response =>{
            const book_data = (response.data.bd_run_data);     
            this.setState({
                book_data:book_data,
                Loading:false
            })  
        })
        .catch((error)=> alert(error))
    }
    OnEmpty(){
        if(this.state.Loading){
            return(
                <p className="text-center fnt-bdrun">Loading...</p>
            );
        }
        else if(this.state.book_data.length===0){
            return (   
                <p className="text-center fnt-bdrun">Data is empty</p>    
            );
        }
        else{
            return null
        }
        
    }
    render(){
        return(
            <div className="container container-adjust">  
                <div className="row">
                    <div className="col-12 col-sm-10 center text-left card-pd-1">
                        <CardHeader className="card-bg-2">{this.state.book_data.length} AFD'S Currently {this.OnEmpty()}</CardHeader>
                    </div>
                </div>   
                <div>
                    {       
                        
                        this.state.book_data.map((book,index)=>
                            <Fetch_BdRun key={book.book_order_id} Data={book} cnt={index} />
                        )        
                    }
                </div>
                
            </div>
            
        );
    }
}
  
export default bd_run;

