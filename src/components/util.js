import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import '../css/header.css';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
// import {BodyText} from "./util"
//card
import Typography from '@material-ui/core/Typography';
//end card
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom';


export const Banner = (props) => (
    <div style={{ "marginTop": "85px" }} id="o-heading" className="d-flex flex-row justify-content-center align-items-center">
        <h1>{props.title}</h1>
    </div>
)

export const Navigation = (props) => (
    <nav aria-label="breadcrumb">
        <ol style={{
            "background": "rgba(245,139,51,0.6)"
        }} className="breadcrumb">
            <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
            <li className="breadcrumb-item"><NavLink to="/contact">Add Workshop</NavLink></li>
            <li className="breadcrumb-item active" aria-current="page"><NavLink to="/Workshops">Workshops</NavLink></li>
        </ol>
    </nav>
)

export const Footer = (props) => (
    <footer id="o-main-footer" >
        <div className="o-footer">
            <div id="o-correct-skew" className="container ">
                <div className="row p-3">
                    <div className="col-3">NESA BY MAKERS is a New Economy Skill Accelerator home to, and school of Africa's next bold and innovative problem-solvers
                </div>
                    <div className="col-7"></div>
                </div>
                <div className="row p-3">
                    <div className="col-8 pb-3">+2349034843943 | hello@makers.ng | Yaba, Lagos </div>
                    <div style={{ "color": "black" }} className="col-4 pb-3">&copy;2017 Makers Academy Nigeria Ltd</div>
                </div>
                <div className="row m-3">
                    <div className="col-8"></div>
                    <div className="col-4"></div>
                </div>

            </div>
        </div>
    </footer>
)


export const Logout = (props) => (
    <div>
        <div id="o-top-line"></div>
        <div className="container"><br />
            <div className="row">
                <div className="col-sm-10"></div>
                <h2 className="col-sm-2 o-logout">Logout<img className="pl-3" src="./img/power-button.png" /></h2><br /><br />
            </div>
        </div><br />
    </div>
)

export const Top = ({ top: { startDate, endDate, time, title, fee },openModal, seatsLeft }) => {
    return (
        <div style={{ "marginTop": "85px" }} className="col-12 n_navbar n_pathClip">
            <div className="container">
                <div className="row d-flex justify-content-between n_main">
                    <div className=" mt-4">
                        <p className="n_barDate">{startDate} &nbsp;-&nbsp;{endDate} &nbsp; {time}</p>
                        <p className="n_barTitle">{title}</p>
                    </div>
                    <div className="n_barPrice mt-5">
                        <button style={{"outline":"none"}} disabled={(fee === 0) || (seatsLeft < 1)} style={{
                            "visibility": fee ? "visible" : "hidden"
                        }} onClick={openModal} className="n_apply">
                            <span style={{
                                "fontSize": "1.1em",
                                "display": ((seatsLeft < 1) && (fee !== 0)) ? "none" : "block"
                            }}>&#8358;{fee}&nbsp;Apply</span>
                            <span style={{
                                "fontSize": "1.1em",
                                "display": ((seatsLeft < 1) && (fee !== 0)) ? "block" : "none"
                            }}>Sold Out</span>
                            <span style={{
                                "fontSize": "0.9em",
                                "display": (fee === 0) ? "block" : "none"
                            }}>Free</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const BodyContainer = ({ bottom: { time, description, startDate, endDate, bannerUrl, location } }) => (
    <div className="container mt-5">
        <div className="row">
            <div className="col-lg-7 p-lg-5  p-md-5 col-md-7 col-sm-12 col-xs-12 ">
                <div className="n_eventImage">
                </div>
                {/*inserrt article here*/}
                <BodyText description={description} />
            </div>

            <div className="col-lg-5 pt-md-5 pt-lg-5 col-md-5 col-sm-12 col-xs-12 ">
                <div className="container">
                    <div className="row">
                        <div className="n_SectionDate">
                            <p>{startDate || <Skeleton width={700} />}&nbsp; to &nbsp; {endDate}
                                <br />{time}
                            </p>
                            <p className="n_SectionAdd">Add to Calendar</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mapouter">
                            <iframe className="gmap_canvas px-2" width="400" height="200" id="gmap_canvas" src="https://maps.google.com/maps?q=154%20Murtala%20Muhammed%20Way%2C%20Adekunle%2C%20Lagos&t=k&z=19&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                            </iframe>
                            {/*<a href="https://www.maps-erstellen.de">maps-erstellen.de</a>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export const BodyText = ({ description }) => (
    <div>
        <br />
        <p className="n_article">
            {description || <Skeleton width={700} count={8} />}
        </p>
    </div>
)

export const SocialMedia = ({ fee, seatsLeft, openModal }) => (
    <div className="container">
        <div className="row n_footer">
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 n_social d-flex justify-content-around ">
                <img src="./img/facebook.png" className="p-2 n_socialMedia" />
                <img src="./img/twitter.png" className="p-2 n_socialMedia" />
                <img src="./img/whatsapp.png" className="p-2 n_socialMedia" />
            </div>
            <div className="col-md-5 col-lg-5 d_apply justify-content-center">

                <button style={{"outline":"none"}} onClick={openModal} disabled={(fee === 0) || (seatsLeft < 1)} style={{
                    "visibility": fee ? "visible" : "hidden"
                }} className="n_apply">
                    <span style={{
                        "fontSize": "0.9em",
                        "display": ((seatsLeft < 1) && (fee !== 0)) ? "none" : "block"
                    }}>&#8358;{fee}&nbsp;Apply</span>
                    <span style={{
                        "fontSize": "0.9em",
                        "display": ((seatsLeft < 1) && (fee !== 0)) ? "block" : "none"
                    }}>Sold Out</span>
                    <span style={{
                        "fontSize": "0.9em",
                        "display": (fee === 0) ? "block" : "none"
                    }}>Free</span>
                </button>
            </div>
            <div className="col-md-1 col-lg-1"></div>

        </div>
    </div>
)



export const PlusIcon = () => (
    <div className="container-fluid mt-5">
        <div className="row">
            <div className="col-md-10"></div>
            <div className="col-md-2 d-flex flex-row-reverse p-0">
                <div className="add-content btn btn-primary d-flex justify-content-center">
                    {/*<i className="fa fa-plus fa-2x p-3 add-sign" aria-hidden="true"></i>*/}
                    <Button size="large" variant="fab" color="secondary" aria-label="add" >
                        <AddIcon />
                    </Button>
                </div>

            </div>
        </div>
    </div>
)

export const Applicant = ({ applicant: { display_name, email, amount }, deleteApplicant, fiterApplicants }) => {
    const inlineStyle = "col-md-1 col-sm-3 col-xs-5";
    amount = (amount === 0) ? "free" : amount;
    const nairaClass = (amount === "free" || amount === undefined) ? "hide" : "show";

    return (
        <div style={{ "borderBottom": "1px solid #999" }} className="row">
            <div className="col-md-11 col-sm-9 col-xs-7">
                <p>
                    <span className="span2">{email || <Skeleton width={200} />}</span>
                    <br />
                    <span className="span1">{display_name || <Skeleton width={300} />}</span>&nbsp;
                    <span style={{ "display": Boolean(amount) ? "inline" : "none" }} className="o-fee">
                        <span className={nairaClass}>&#8358;</span>
                        <span>{amount || <Skeleton width={50} />}</span>
                    </span>
                    <span style={{ "display": Boolean(amount) ? "none" : "block" }}>
                        <Skeleton width={50} />  <Skeleton width={50} />
                    </span>
                    <br />
                    <small>Posted on 25th dec 2017</small>
                </p>
            </div>
            <div style={{ "paddingTop": "10px" }} className={inlineStyle}>
                <Button className="btn" variant="fab" color="secondary" aria-label="add" onClick={deleteApplicant}>
                    <DeleteIcon />
                </Button>
            </div>
        </div>
    )
}

export const Jumbotron = () => (
    <div style={{ "marginTop": "97px" }} className="e-hero theory">
        <div className="image-a">
            <div className="jumbotron d-flex justify-content-between container col-lg-10 offset-lg-1 col-md-12 col-sm-12">
                <div >
                    <h1 className="display-4">Accelerate Your Skill</h1>
                    <h4 className="lead-2">Improve yourself by learning new skills faster</h4>
                    <h4 className="lead-2 mt-3">Find Courses on UI/UX, Web Development and Data Science </h4>

                </div>
                <div className="pl-4 hero-animation">
                    <div className="circles">
                        <div className="inner-circle"><div className="inner-circle-2"></div></div>
                    </div>
                </div>
            </div>
            <div className="overlay"></div>
        </div>
    </div>
)

export const IndexPageWorkshop = ({ workshop: { startDate, endDate, day, time, title, description, fee, no_of_seats, applications, createdAt }, learnMore }) => {
    fee = (fee === 0) ? "free" : fee;
    const nairaClass = (fee === "free" || fee === undefined) ? "hide" : "show";
    const seatsLeft = no_of_seats - applications;
    const seatsLeftView = (seatsLeft < 1) ? "Sold Out" : `${seatsLeft} Seats Left`;


    return (
        <div className="row ml-2 mt-2 upcoming">
            <div className="col-lg-6 col-sm-6 col-md-6">
                <p className="date">{startDate || <Skeleton width={100} />}&nbsp;&nbsp; {endDate || <Skeleton width={100} />} &nbsp;{time || <Skeleton width={50} />}</p>
                <p className="course dark-grey truncate">{title || <Skeleton width={300} />}</p>
                <p className="grey truncate">{description || <Skeleton />}</p>

                <span style={{
                    "display": Boolean(fee) ? "block" : "none"
                }}>
                    <span className="fee">
                        <span className={nairaClass}>&#8358;</span>
                        <span>{fee}</span>
                    </span>
                    &nbsp;
                <span className="fee">{seatsLeftView}</span></span>
                <span style={{ "display": Boolean(fee) ? "none" : "block" }}>
                    {Boolean(fee) || <Skeleton width={50} />}  {Boolean(fee) || <Skeleton width={50} />}
                </span>


                <br /><br />
                <small className="grey">{createdAt || <Skeleton width={200} duration={0.6} />}</small>

            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 course-card">
                <p className="lead-apply mg-2">

                    <span style={{
                        "color": "#f58b3b",
                        "borderRadius": "20px",
                        "border": "1px solid #f58b3b",
                        "padding": "10px",
                        "cursor": "pointer",
                        "visibility": Boolean(fee) ? "visible" : "hidden"
                    }} onClick={learnMore}  >LEARN MORE</span>

                </p>
            </div>
        </div>
    )
}

export const NotificationSignUp = () => (
    <div className="row subscribe mt-5 ml-2">
        <div className="form-group   mx-2 mr-3">
            <h4>Sign Up for Event Notification</h4>
        </div>
        <form className="form-inline">
            {/*<div className="form-group   mx-2 mr-3">
                <label htmlFor="staticName" className="title-sign-up">Sign Up for Event Notification</label>
            </div>*/}
            <div className="form-group  mx-2 mr-3">

                {/*<label htmlFor="staticName" className="sr-only">Name</label>
                <input type="text" className="form-control my-input" id="staticEmail2" placeholder="NAme" />*/}
                <TextField
                    id="uncontrolled"
                    label="Name"
                    defaultValue=""
                    margin="normal"
                />            </div>
            <div className="form-group  mx-2 mr-3">
                <label htmlFor="staticEmail2" className="sr-only">Email</label>
                {/*<input type="text" className="form-control my-input" id="staticEmail2" placeholder="Email" />*/}
                <TextField
                    id="uncontrolled"
                    label="Email"
                    defaultValue=""
                    margin="normal"
                />
            </div>
            <div className="form-group">
                <Button type="submit" variant="contained" color="secondary">Sign Up</Button>
            </div>
        </form>
    </div>
)

export const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];