import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { NavLink } from 'react-router-dom';
import '../css/header.css';
import Header from './Header'
// import '../inline.js';
import {Button, ButtonToolbar, Modal} from 'reactstrap'
import { Top, BodyContainer, Footer, SocialMedia } from "./util"

class ClientWorkshop extends Component {
    constructor(props) {
        super(props)

let dLocation = "22 joy avenue ajao estate lagos";
 dLocation.toString().replace(/\s+/g, '+');
// const url =`https://maps.google.com/maps?q=${dLocation}&t=k&z=19&ie=UTF8&iwloc=&output=embed`;
    const { location: { state: { workshop } } } = this.props;
    console.log(workshop);
    const {startDate,endDate, time, title, fee, bannerUrl,description, id, no_of_seats, applications} = workshop;
    console.log(workshop);
    this.workshopId = id;
    const top = {
        startDate,
        endDate,
        time,
        title,
        fee,
 
    }

    const bottom = {
        bannerUrl,
        time,
        startDate,
        endDate,
        description
    }


    this.state ={
        top,
        bottom,
        fee,
        no_of_seats,
        applications,
        show:true
    }

    console.log(this.state)


        // this.state = {
        //     top: {
        //         day: "June 2018",
        //         time: "8AM - 12AM",
        //         title: "React and Redux Fundamentals",
        //         cost: "5000 "
        //     },
        //     fulldate: "Saturday, June 3, 2018",
        //     fulltime: "08:00AM to 12:00PM",
        //     content:"In this workshop we delve into one of the most powerful but often confusing concepts in programming: functions that call themselves. We’ll take a look at recursion under the hood to better understand how and when to use this powerful technique.",
        //     url:url

        // }

    }

      handleClose = ()=>{
    this.setState({ show: false });
  }

  handleShow = ()=>{
    this.setState({ show: true });
  }

    initPayment = ()=>{
    //     const email = prompt("Please enter email");
    //     if((email === null) || email === "") {
    //         alert("Email field missing");
    //         return;
    // }
    //     const amount = this.state.top.fee;
        const data = {
            email:"osamaimafidon@gmail.com",
            amount:25000000
        }
        this.payWithPaystack(data)

    }

    payWithPaystack = ({email, amount})=>{

    var handler = window.PaystackPop.setup({
      key: 'pk_test_4edb6704ac9c9db84e986ca247970a5160fe5651',
      email,
      amount,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
         custom_fields: [
            {
                display_name: "Samuel",
                variable_name: "mobile_number",
                value: +2348012345678,
                workshop_id:this.workshopId
            }
         ]
      },
      callback: function(response){
          alert('success. transaction ref is ' + response.reference);
          console.log(response)
      },
      onClose: function(){
          alert('window closed');
      }
    });
    handler.openIframe();
  }

    render() {
        return (
            <div>
                <Header />
                <Top initPayment={this.initPayment} top={this.state.top} seatsLeft={this.state.no_of_seats - this.state.applications} />
                <BodyContainer bottom={this.state.bottom}  />
                <SocialMedia fee={this.state.fee} seatsLeft={this.state.no_of_seats - this.state.applications} />
                <Footer />
                {/*<ButtonToolbar>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Wrapped Text</h4>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
  cumque dolorem.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>*/}
            </div>
        )
    }
}

export default ClientWorkshop;