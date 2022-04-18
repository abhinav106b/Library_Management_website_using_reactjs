import React,{Component} from 'react'
import Header from './HeaderComponent';
import { Switch, Route, Redirect} from 'react-router-dom'
import Home from './Home_component';
import Search_book from './Books/Search_book';
import './css/book.css'
import request_list from './Books/Request_list';
import Add_books from './Books/Add_Books';
import print_bar_codes from './Books/Print_Bar_Codes';
import hql_migration from './Books/HQL_Migration';
import mannual_ad_record from './Books/Mannual_AD_Record';
import change_bar_code from './Books/Change_Bar_Code';
import show_location from './Books/Show_Location';
import bd_run from './Delivery/BD_Run';
import delivery_slip from './Delivery/Deliver_Slip';
import delivery_summary from './Delivery/Delivery_Summary';
import Ad_run from './Delivery/AD_Run';
import add_delivery from './Delivery/Add_Delivery';
import Search_main from './Members/Search_Member';
import Payment_details from './Members/Payment_Details';
import coupen_codes from './Members/Coupen_Codes';
import Member_login from './Members/Member_Login';
import daily_report from './Reports/Daily_Report';
import member_based_report from './Reports/Member_Based_Report';
import book_based_report from './Reports/Book_Based_Report';
import LastBorrowedBks from './Reports/LastBorrowedBooks';
import SuspendedBks from './Reports/SuspendedBks';
import Logout from './Logout';
import { createBrowserHistory } from "history";


class Main extends Component{
    
    render(){
        
        return(
            <div>
            <div className="main-bg">
                <Header/>
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/search_book' component={Search_book} />
                    <Route path='/request_list' component={request_list} />
                    <Route path='/add_books' component={Add_books} />
                    <Route path='/print_bar_codes' component={print_bar_codes} />
                    <Route path='/hql_migration' component={hql_migration} />
                    <Route path='/mannual_ad_record' component={mannual_ad_record} />
                    <Route path='/change_bar_code' component={change_bar_code} />
                    <Route path='/show_location' component={show_location} />
                    <Route path='/bd_run' component={bd_run} />
                    <Route path='/delivery_slip' component={delivery_slip} />
                    <Route path='/delivery_summary' component={delivery_summary} />
                    <Route path='/ad_run' component={Ad_run} />
                    <Route path='/add_delivery' component={add_delivery} />
                    <Route path='/search_member' component={Search_main} />
                    <Route path='/payment_details' component={Payment_details} />
                    <Route path='/coupen_codes' component={coupen_codes} />
                    <Route path='/member_login' component={Member_login} />
                    <Route path='/last_borrowed' component={LastBorrowedBks} />
                    <Route path='/suspended_books' component={SuspendedBks} />
                    <Route path='/book_based_report' component={book_based_report} />
                    <Route path='/logout' component={Logout} />
                    <Redirect to="/home" />
                </Switch>
            </div>
            <div className="main-bg-1"></div>
            </div>
        );
    }
}

export default Main;
