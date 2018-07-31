import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Banner, Footer } from './util'
import Header from './Header'
import Body from './About_body'
// import '../css/header.css';

class About extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title:"About"
        }
    }



    render() {
        return (
            <div>
                <Header />
                <Banner title={this.state.title} />
                <Body />
                <Footer />
            </div>
        )
    }
}

export default About;