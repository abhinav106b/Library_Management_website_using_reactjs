
import React,{Component,useState} from "react";
import {Card,CardBody,Input,Button,Table} from 'reactstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'
import '../css/book.css'
import axios from "axios";
import { toggleButtonClasses } from "@mui/material";
import Userdisplay from "../Members/UserDisplay";
import {Audio} from 'react-loader-spinner';

class Display_book extends Component{
    constructor(props){
        super(props);
        this.state={
            SelectedFile:null
        };
        this.AddPicture=this.AddPicture.bind(this);
        this.UploadPicture=this.UploadPicture.bind(this);
    }
    AddPicture(event){
        this.setState({
            SelectedFile: event.target.files[0]
        })
    }
    UploadPicture(){
        if(this.state.SelectedFile ===null){
            alert("Add picture to Upload");
        }
        else{
            console.log(this.state.SelectedFile);
            alert("Picture uploaded :)");
        }
    }
    render(){
        return(
            <div className="test-10">
                <Card>
                    <CardBody>
                        <div className="container">
                        <div className="row">
                        <div className="col-3">
                            <img className="img-1" src={this.props.data.book_image} />
                        </div>
                        <div className="col-9">
                            <div className="row">
                            <div className="col-12 text-left crd-hd-fnt"><p>{this.props.data.book_title}</p></div>
                            </div>
                            <div className="row">
                            <div className="col-12 text-left crd-p-fnt">
                                <p>--Author|Bin=C2;Q Wt=5| Avg P=91 <br></br>
                                --ASIN: 685545588| Rating= 5.0 |<a className="crd-a">CLICK TO FIX</a>|<a className="crd-a">FETCH DETAILS</a>| <a className="crd-a">FETCH HISTORY</a><br></br>
                                --Categories= Book category|  </p>
                            </div>    
                            </div>
                        </div>
                        </div>
                        <div className="row inline-ht">
                            <div className="col-12">
                                <button className="btn btn-light crd-btn-1 btn-sm">BL034567001(??)</button>
                                <button className="btn btn-sm crd-btn-2  btn-danger"><span className="fa fa-xmark">X</span></button>
                                <button className="btn btn-sm crd-btn-2  btn-danger"><span className="fa fa-question"></span></button>
                                <button className="btn btn-sm crd-btn-2  btn-danger"><span className="fa fa-thumbs-down"></span></button>
                                <button className="btn btn-sm crd-btn-2  btn-danger"><span className="fa fa-barcode"></span></button>
                                <button onClick={()=>this.fileinput.click()} className="btn btn-sm crd-btn-1  btn-light">Add Picture</button>
                                <input style={{display:'none'}} type="file"
                                onChange={this.AddPicture}
                                ref={fileinput => this.fileinput = fileinput} ></input>
                                <button onClick={this.UploadPicture} className="btn btn-sm crd-btn-3  btn-light">Upload Picture</button>
                                <button className="btn btn-sm crd-btn-1  btn-success">Showing to customers</button>
                            </div>
                        </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

class Search_book extends Component{
    constructor(props){
        super(props);
        this.state={
            book_data:[],
            search_data:"book",
            isSearchopen:false,
            CurrentBooks:[],
            CurrentPage:1,
            Bookloading:false,
            Loading:false
        };
        this.onbtnchange=this.onbtnchange.bind(this);
        this.onSearchclick=this.onSearchclick.bind(this);
        this.fetch_bookby_id=this.fetch_bookby_id.bind(this);
        this.OnPageChange=this.OnPageChange.bind(this);
        this.page=this.page.bind(this);
    }
    componentDidMount(){
        this.setState({
            Loading:true
        })
        axios.post('http://15.207.107.128:6200/Library/GetDashboardBooks',{limit:5,user_id:"23"})
        .then(response =>{
            const book_data = (response.data.book_list);   
            this.setState({
                book_data:book_data,
                Loading:false
            })   
        })
        .catch((error)=>alert(error))
    }
    onbtnchange(){
        this.setState({
            isSearchopen:!this.state.isSearchopen
        });
    }
    onSearchclick(e){
        this.onbtnchange();
        if(e.currentTarget.id==="Books"){
            this.setState({
                search_data:"book"
            })
        }
        else if(e.currentTarget.id==="Authors"){
            this.setState({
                search_data:"author"
            })
        }
        else if(e.currentTarget.id==="Genres"){
            this.setState({
                search_data:"genre"
            })
        }
        else if(e.currentTarget.id==="Barcode"){
            this.setState({
                search_data:"barcode"
            })
        }
        else if(e.currentTarget.id==="Spl:OLD"){
            this.setState({
                search_data:"spl:OLD"
            })
        }
        else if(e.currentTarget.id==="Spl:0-genre"){
            this.setState({
                search_data:"spl:0-genre"
            })
        }
        else if(e.currentTarget.id==="Spl:0-rating"){
            this.setState({
                search_data:"spl:0-rating"
            })
        }
    }
    fetch_bookby_id(){
        this.setState({
            Bookloading:true
        })
        axios.post('http://15.207.107.128:6200/Library/bookSearchAPI',{type:this.state.search_data,genre:"",name:this.result.value,author:""})
        .then(response=>{
            const book_data =(response.data.book_list);
            this.setState({
                book_data:book_data,
                Bookloading:false
            })
        })
        .catch((error)=>alert(error));
    }
    OnPageChange(event){
        this.setState({
            CurrentPage:(event.selected+1)
        });
    }
    page(){
        return(
            <div>
                <Userdisplay totalpost={this.state.book_data.length} paginate={this.OnPageChange} />
            </div>
        );
    }
    render(){
        const IndexOfLastUser = ((this.state.CurrentPage) * 30);
        const IndexOfFirstUser = IndexOfLastUser - 30;
        const CurrentBook = this.state.book_data.slice(IndexOfFirstUser,IndexOfLastUser);
        const btn_toggle=()=>{
            if(this.state.isSearchopen){
                return(
                    <div className="drp-toggle">
                        <ul className="list-group text-left">
                            <a id="Books" onClick={this.onSearchclick}><li className="li-ht cursor-pointer">Books</li></a>
                            <a id="Authors" onClick={this.onSearchclick}><li className="li-ht cursor-pointer">Authors</li></a>
                            <a id="Genres" onClick={this.onSearchclick}><li className="li-ht cursor-pointer">Genres</li></a>
                            <a id="Barcode" onClick={this.onSearchclick}><li className="li-ht cursor-pointer">Barcode</li></a>
                            <a id="Spl:OLD" onClick={this.onSearchclick}><li className="li-ht cursor-pointer">Spl:OLD</li></a>
                            <a id="Spl:0-genre" onClick={this.onSearchclick}><li className="li-ht cursor-pointer">Spl: 0-genre</li></a>
                            <a id="Spl:0-rating" onClick={this.onSearchclick}><li className="li-ht cursor-pointer">Spl: 0-Rating</li></a>
                        </ul>
                    </div>
                );
            }
        }
        return(
            <div className="container under-const">
                <div className="row mb-5">            
                    <div className="col-3 col-sm-2 search-pd-l">
                        <button onClick={this.onbtnchange} className="btn btn-search">{this.state.search_data}
                        <span className="fa fa-angle-down"></span></button>
                        <div>{btn_toggle()}</div>
                    </div>
                    <div className="col-6 col-sm-5">
                        <Input className="search-box-2" type="text" id="search" name="search"
                        placeholder="search bar"
                        innerRef={(input)=>this.result=input}/>
                    </div>         
                    <div className=" col-1 col-sm-1 search-clm">
                        <Button onClick={this.fetch_bookby_id} className="search-btn" type="submit" color="primary" >GO</Button>
                    </div>
                    <div className="col-12 col-sm-1">
                        <Audio
                            type="Puff"
                            color="#2B7A78"
                            height={40}
                            width={40}
                            visible={this.state.Bookloading}
                        />
                        <Audio
                            type="Puff"
                            color="#2B7A78"
                            height={40}
                            width={40}
                            visible={this.state.Loading}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-8">
                    {CurrentBook.map((book)=>
                        <Display_book data={book} />
                     )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.page()}
                    </div>
                </div>
            </div>
        );
    }
}
  
export default Search_book;