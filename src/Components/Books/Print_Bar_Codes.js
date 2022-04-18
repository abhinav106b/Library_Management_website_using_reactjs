import React,{Component} from "react";
import { Navbar,Nav } from "reactstrap";
import {Link} from 'react-router-dom'


class Naveg extends Component{
    constructor(props){
        super(props);
        this.state={
            ismobile:false
        };
    }
    render(){
        const setmobile=()=>{
            this.setState({
                ismobile:!this.state.ismobile
            })
        }
        return(
            <div className="row">
                <div className="col-12">
                <Navbar dark>
                    <Nav navbar>
                        <ul onClick={()=>this.setState({ismobile:!this.state.ismobile})} className={this.state.ismobile ? "nav-links-mobile" : "nav-links-1"}>
                            <li className="text-white nav-links-2">Show Location</li>
                            <li className="text-white nav-links-2">add delivery</li>
                            
                        </ul>
                        <button onClick={()=>this.setState({ismobile:!this.state.ismobile})} className="mobile-menu-icon">
                            {this.state.ismobile ? <i className="fa fa-times"></i> :<i className="fa fa-bars"></i> }
                        </button>
                    </Nav>
                </Navbar>
                </div>
            </div>
        );
    }
}
function print_bar_codes(){
    return(
        <div className="container under-const">
            <h1>Under Construction</h1>
        </div>
    );
}
  
export default print_bar_codes;