import React,{Component} from 'react'
import {Navbar, Nav, NavbarToggler, Collapse, NavItem,
    Button} from 'reactstrap';
import {Link,NavLink} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'



class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            isnavOpen: false,
            ismobile:false
        };
        this.togglenav=this.togglenav.bind(this);
    }
    togglenav(){
        this.setState({
            isnavOpen : !this.state.isnavOpen
        });
    }
    render(){
        return(
                <Navbar dark expand="md" sticky="top">
                    <div className="container">   
                        <NavbarToggler onClick={this.togglenav} />  
                        <Collapse isOpen={this.state.isnavOpen} navbar>
                        <Nav navbar>
                            <NavItem className="pd-1">
                                <NavLink className="navlink" to="/home"><span className="fa fa-home fa-sm"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>   
                                <Dropdown>
                                    <Dropdown.Toggle className="test-1"> 
                                        <span className="fa fa-book fa-sm"></span> Books
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <Link className="test-2" to="/search_book">Search Book</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/request_list">Request List</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link  className="test-2" to="/add_books">Add Books</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link  className="test-2" to="/print_bar_codes">Print Bar Codes</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link  className="test-2" to="/hql_migration">HQL Migration</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/mannual_ad_record">Mannual AD Record</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link  className="test-2" to="/change_bar_code">Change Bar Code</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/show_location">Show Location</Link>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <Dropdown>
                                    <Dropdown.Toggle className="test-1">
                                        <span className="fa fa-truck fa-sm"></span> Delivery
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#">
                                            <Link  className="test-2" to="/bd_run">BD Run</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/delivery_slip">Delivery Slip</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/delivery_summary">Delivery Summary</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/ad_run">AD Run</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/add_delivery">Add Delivery</Link>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <Dropdown>
                                    <Dropdown.Toggle className="test-1">
                                        <span className="fa fa-address-card fa-sm"></span> Members
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/search_member">Search Member</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/payment_details">Payment Details</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/coupen_codes">Coupen Codes</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/member_login">Member Login</Link>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                <Dropdown>
                                    <Dropdown.Toggle className="test-1">
                                        <span className="fa fa-flag fa-sm"></span> Reports
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/last_borrowed">Last Borrowed</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link  className="test-2" to="/suspended_books">Suspended Books</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <Link className="test-2" to="/book_based_report">Book Based Report</Link>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </NavItem>
                            <NavItem>
                                    <Link to="/logout"><Button className="test-1" ><span className="fa fa-sign-in fa-lg"></span> Logout</Button></Link>
                            </NavItem>
                        </Nav>  
                        </Collapse>    
                    </div>
                </Navbar>
            
        );
    }
}

export default Header;