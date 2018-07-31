import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { NavLink } from 'react-router-dom';
import { Applicant, Logout } from './util'
import '../css/applicants.css';

class Applicants extends Component {
    constructor(props) {
        super(props)


        const id = this.props.match.params.workshopId;
    const { location: { state: { workshopTitle } } } = this.props;
    this.title = workshopTitle;

        this.id = Boolean(id) ? id : 'undefined';
        console.log(this.props)

        // this.state = {
        //     applicants: [
        //         {
        //             display_name: "John Doe",
        //             email: "johndoe@gmail.com"
        //         },
        //         {
        //             display_name: "Jane Dole",
        //             email: "janedoe@gmail.com"
        //         },
        //         {
        //             display_name: "John Doe",
        //             email: "johndoe@gmail.com"
        //         },
        //         {
        //             display_name: "John Doe",
        //             email: "johndoe@gmail.com"
        //         }
        //     ]
        // }

        this.state = {
            applicants: [{}, {}, {}, {}]
        }
    }

    componentDidMount() {
        let db = window.firebase.firestore();
        // const firestore = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        db.settings(settings);
        this.db = db;

        if (this.id !== 'undefined') {
            this.getApplicants(this.id);
        }
    }

    filterApplicants = (e, searchItem) => {
        console.log(e.target.value)
        let applicants = this.state.applicants.filter(applicant => {
            console.log(applicant.display_name.includes(e.target.value))
            return applicant.display_name.includes(e.target.value);
        })
        // console.log(applicants)
        // this.setState({applicants})
    }

    getApplicants = (id) => {
        let db = this.db.collection("Applicants")
        db.where("workshop_id", "==", id)
            .get()
            .then((docs) => {
                this.handleSuccess(docs)
            })
            .catch(function (error) {
                console.error("Error getting Workshop Applicants: ", error);
                alert("Error getting Workshop Applicants: ");

            });
    }

    handleSuccess = (docs) => {

        const data = [];
        docs.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            data.push({ id: doc.id, ...doc.data() })
        });
        this.setState({ applicants: [...data] })
    }

    deleteApplicant = (id) => {
        this.db.collection("Applicants").doc(id).delete()
            .then(function () {
                console.log("Document successfully deleted!");
                const applicants = this.state.applicants.filter(function (applicant) {
                    return applicant.id != id;
                })
                this.setState({
                    applicants
                })
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });

    }


    render() {
        return (
            <div>
                <Logout />
                <div id="background" className="container">
                    <div className="row "><br /> <br />
                        <h1 className="col-md-6 sm-6">Applicants</h1><br /> <br />
                        <input onChange={this.filterApplicants} className="col-md-6 col-md-4 col" type="search" id="input" placeholder="search" />
                        <div></div>
                        <h1 className="col-md-6 sm-6">{this.title}</h1>
                        <hr className="half-rule" />
                    </div><br />
                    {this.state.applicants.map((applicant, i) => (
                        <div>
                            <Applicant deleteApplicant={() => { this.deleteApplicant(applicant.id) }} key={i} applicant={applicant} />
                            {/*<hr className="half-rule" />*/}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Applicants;