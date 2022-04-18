import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Add_books extends Component{
    render(){
        return(
            <div className="container under-const">
                <div className="row">
                <div className="col-12 col-sm-8 bg-white">
                <LocalForm className="mt-4">
                    <Row className="form-group">
                        <Label htmlFor="booktitle" md={2    }>Book Title</Label>
                        <Col md={10}>
                            <Control.text model=".booktitle" id="booktitle" name="booktitle"
                                placeholder="Book Title"
                                className="form-control"
                                validators={{
                                    
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".booktitle"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                                />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="author" md={2}>Author</Label>
                        <Col md={10}>
                            <Control.text model=".author" id="author" name="author"
                                placeholder="Author"
                                className="form-control"
                                validators={{
                                    
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                                />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="bookid" md={2}>Book ID</Label>
                        <Col md={10}>
                            <Control.text model=".bookid" id="bookid" name="bookid"
                                placeholder="Book ID"
                                className="form-control"
                                validators={{
                                    
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".bookid"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 numbers',
                                    maxLength: 'Must be 15 numbers or less',
                                    isNumber: 'Must be a number'
                                }}
                                />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="bookpic" md={2}>Book Picture</Label>
                        <Col md={8} className="ml-3">
                            <Row>
                                <Col md={4}>
                                    <Control.file className="btn-sm" model=".bookpic" id="bookpic" name="bookpic"       
                                    />
                                </Col> 
                                <Col md={7}>
                                    <button className="btn btn-sm btn-secondary mt-1">Upload</button>
                                </Col>                       
                             </Row>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{size:10}} className="mt-3">
                            <Button type="submit" className="btn-sm" color="success">
                                ADD BOOK
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
                </div>
                </div>
            </div>
        );
    }
}
  
export default Add_books;