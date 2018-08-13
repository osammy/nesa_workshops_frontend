import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import '../css/header.css';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            translucent: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {

        let translucent = true;

        if (window.scrollY === 0) {
            translucent = false
        }
        if (this.state.translucent === translucent) return;
        this.setState({
            translucent
        }
        )
    }

    render() {
        return (
            <nav style={{
                "background": (this.state.translucent) ? "rgba(245,139,59,0.7)" : "rgba(248,228,213,1)"
            }} className="navbar fixed-top navbar-expand-lg navbar-light pl-0 pr-0 py-0">
                <div id="o-logo"> <NavLink id="o-logo-correct-skew" className="navbar-brand px-4 py-4 my-0 mr-4" href="#" to="/index">TechWorkshops<br /><span>By Nesa</span></NavLink>
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse  ml-4 pl-4" id="navbarSupportedContent">
                    <ul className="nav navbar-nav navbar-right ml-auto ">

                        <NavLink to="/">  <li className="nav-item pr-4 pl-4 mr-4 ml-4">
                            <span className="nav-link pr-4 pl-4 mr-4 ml-4">Home</span>
                        </li></NavLink>
                        {/*<NavLink to="/workshops">
                            <li className="nav-item pr-4 pl-4 mr-4 ml-4">
                                <span className="nav-link pr-4 pl-4 mr-4 ml-4">Courses</span>
                            </li>
                        </NavLink>*/}
                        {/*<NavLink to="/workshops">
                            <li className="nav-item pr-4 pl-4 mr-4 ml-4">
                                <span className="nav-link pr-4 pl-4 mr-4 ml-4">Workshops</span>
                            </li>
                        </NavLink>*/}
                        <NavLink to="/about">
                            <li className="nav-item pr-4 pl-4 mr-4 ml-4">
                                <span className="nav-link pr-4 pl-4 mr-4 ml-4" >About</span>
                            </li>
                        </NavLink>

                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;