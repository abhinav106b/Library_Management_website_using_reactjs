import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-to-excel';
import React, { Component,useRef } from 'react';
import {Card, CardHeader, Table,Button} from "reactstrap";



class SuspendedBks extends Component{
    constructor(props){
        super(props);
        this.myRef=React.createRef();
        this.state={
            suspended_user_bks:[]
        };
    }
    componentDidMount(){
        axios.get('http://15.207.107.128:6200/Admin/SuspendedUserBooks')
        .then(response=>{
            const data=response.data.suspended_user_bks
            this.setState({
                suspended_user_bks:data
            })
            console.log(data);
        })
    }
    render(){
        return(
            <div className="container under-const">
                <div className='row'>
                   <div className="mb-3 col-sm-8 col-12 text-left"><h3>Here are the Reports Last Borrowed</h3></div>
                   <div className="col-12 col-sm-4">
                   <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-sm btn-primary"
                    table="table-to-xls"
                    filename="Suspended_books_report"
                    sheet="tablexls"
                    buttonText={<span className="fa ml-1 fa-download">Download</span>}/>
                    </div> 
                </div>
                <div className="row">
                    <div className="col-12 center table-pymt">
                    <Table id="table-to-xls" className="bg-white mt-2" striped bordered>
                        <thead>
                            <tr>
                                <th>Updated_at</th>
                                <th>Barcode</th>
                                <th>Cat_id</th>
                                <th>Title</th>
                                <th>Current_location</th>
                                <th>Member_data_id</th>
                                <th>Name</th>
                                <th>Membership_status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.suspended_user_bks.map((susdata)=>
                                this.state.suspended_user_bks[0].books_taken_after_inactive_account.map((data)=>
                                    <tr>
                                        <td>{data.delivery_date}</td>
                                        <td>{data.barcode}</td>
                                        <td>{data.catalogue_id}</td>
                                        <td>{data.book_title}</td>
                                        <td>{susdata.location}</td>
                                        <td>{susdata.user_id}</td>
                                        <td>{susdata.full_name}</td>
                                        <td>SUSPENDED</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuspendedBks;