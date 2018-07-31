import React, { Component } from 'react';
import { NotificationSignUp, IndexPageWorkshop, Footer, Jumbotron, months } from './util';
import Header from './Header'
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import ClientWorkshop from './ClientWorkshop';


class Index extends Component {
    constructor(props) {
        super(props)



        this.state = {
            workshops: [{}, {}, {}, {}]
        }


    }

    manipulateDateFormat = (workshops) => {
        /*This funct converts the starDat and endDate from milliseconds format like 15366466550 to something like june 5th 2016*/
        for (let i = 0; i < workshops.length; i++) {
            const startDay = (new Date(workshops[i].startDate)).getDate();
            const startMonth = months[(new Date(workshops[i].startDate)).getMonth()];
            
            const startFormat = this.getDayFormat(startDay);

            const endDay = (new Date(workshops[i].endDate)).getDate();
            const endMonth = months[(new Date(workshops[i].endDate)).getMonth()];
            const endYear = (new Date(workshops[i].endDate)).getFullYear()
            const endFormat = this.getDayFormat(endDay);

            const createdAtDay = (new Date(workshops[i].createdAt)).getDate();
            const createdAtMonth = months[(new Date(workshops[i].createdAt)).getMonth()];
            const createdAtYear = (new Date(workshops[i].createdAt)).getFullYear()
            const createdAtFormat = this.getDayFormat(createdAtDay);

            workshops[i].startDate = `${startDay}${startFormat} ${startMonth}`
            workshops[i].endDate = `${endDay}${endFormat} ${endMonth},  ${endYear}`
            workshops[i].createdAt = `Posted on  the ${createdAtDay}${createdAtFormat} of ${createdAtMonth} ${createdAtYear}`



        }
        return workshops;
    }

    getDayFormat = (day) => {

        switch (day) {
            case 1:
                var format = "st";
                break;
            case 2:
                var format = "nd";
                break;
            case 3:
                var format = "rd";
                break;
            default:
                var format = "th"

        }
        return format;
    }

    componentDidMount() {
        let db = window.firebase.firestore();
        // const firestore = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        db.settings(settings);
        this.db = db;
        this.getWorkshops()
  
    }


    handleSuccess = (docs) => {
        const data = [];
        docs.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            data.push({ id: doc.id, ...doc.data() })

        });
        const formattedWorkshop = this.manipulateDateFormat(data)
        this.setState(
            {
                workshops: [...formattedWorkshop]
            })
    }

    learnMore = (workshop) => {
        this.props.history.push(`/workshops/${workshop.id}`, {
            workshop
        });
    }


    getWorkshops = () => {
        let db = this.db.collection("Workshops")
        db.where("status", "==", "PUBLISHED")
            .get()
            .then((docs) => {
                this.handleSuccess(docs)
            })
            .catch(function (error) {
                console.error("Error getting document: ", error);
                alert("Error writing document: ");

            });
    }



    learnMore = (workshop) => {
        this.props.history.push(`/client/workshops/${workshop.id}`, {
            workshop
        });
    }



    render() {
        return (
            <div>
                {/*<BrowserRouter>

                        <Route path="/client/workshops" component={ClientWorkshop} />
                </BrowserRouter>*/}

                <Header />
                <Jumbotron />
                <div className="container col-lg-8 offset-lg-2 col-md-12 col-sm-12">
                    <div className="row ml-2 mt-1">
                        <p className="title">Upcoming Open Workshops</p>
                        {/*insert wkshp here*/}
                        {this.state.workshops.map((workshop, i) => (

                            <IndexPageWorkshop key={i} learnMore={() => { this.learnMore(workshop) }} workshop={workshop} />



                        ))}

                        <NotificationSignUp />
                    </div>
                </div>
                <Footer />

            </div>
        )
    }
}

export default Index;