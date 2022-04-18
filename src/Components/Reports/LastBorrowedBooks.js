import axios from 'axios';
import React, { Component } from 'react';
import {Table} from "reactstrap"
import ReactHTMLTableToExcel from 'react-html-to-excel';



class LastBorrowedBks extends Component{
    constructor(props){
        super(props);
        this.myRef=React.createRef();
        this.state={
            borrowedbks:[]
        };
    }
    componentDidMount(){
        axios.get('http://15.207.107.128:6200/Admin/LastBorrowedBooks')
        .then(response=>{
            const data=response.data.last_borrowed_bks
            this.setState({
                borrowedbks:data
            })
            console.log(this.state.borrowedbks);
        })
    }
    render(){
        return(
            <div className="constainer under-const">
                <div className='row'>
                   <div className="mb-3 col-sm-8 col-12"><h3>Here are the Reports Last Borrowed</h3></div>
                   <div className="col-12 col-sm-4">
                   <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-sm btn-primary"
                    table="table-to-xls"
                    filename="Lastborrowed_books_report"
                    sheet="tablexls"
                    buttonText={<span className="fa ml-1 fa-download">Download</span>}/>
                    </div> 
                </div>
                <div className="row">
                    <div className="col-11 center table-pymt">
                    <Table id="table-to-xls" className="bg-white mt-2" striped bordered>
                        <thead>
                            <tr>
                                <th>Days_ago</th>
                                <th>memeber_id</th>
                                <th>Name</th>
                                <th>Email ID</th>
                                <th>Mobile no</th>
                                <th>Membership_status_flag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.borrowedbks.map((data)=>
                                <tr>
                                    <td>{data.days_ago[0]}</td>
                                    <td>{data.user_id}</td>
                                    <td>{data.full_name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.mobile_no}</td>
                                    <td>{data.subs_status}</td>
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

export default LastBorrowedBks;