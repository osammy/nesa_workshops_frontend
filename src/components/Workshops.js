import React, { Component } from 'react';
import { Logout, Footer, PlusIcon, months } from './util';
import Sidebar from 'react-sidebar';
import Workshop from './Workshop';
import {Navigation }from './util'
import '../css/app.css';
import '../css/index.css';





class Workshops extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        // this.state = {
        //     workshops: [
        //         {
        //             id:"8ynh",
        //             title: "React and Redux Fundamentals",
        //             day: "JUNE 13",
        //             time: "10AM - 1PM",
        //             status: "DRAFT",
        //             applications: "3 Applications"
        //         },
        //         {
        //             id:"23dre",
        //             title: "Angular 6 Development Fundamentals",
        //             day: "JULY 3",
        //             time: "8AM - 12 NOON",
        //             status: "PUBLISHED",
        //             applications: "5 Applications"
        //         }]
        // }
        this.state = {
            workshops: [{}, {}, {}, {}],
            sidebarOpen: false

        }

    }

    componentDidMount() {
        let db = window.firebase.firestore();
        // const firestore = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        db.settings(settings);
        this.db = db;
        this.getWorkshops()
    }

    getWorkshops = () => {
        let db = this.db.collection("Workshops")
            .get()
            .then((docs) => {
                this.handleSuccess(docs)
            })
            .catch(function (error) {
                console.error("Error getting document: ", error);
                alert("Error gettingdocument: ");

            });
    }

    handleSuccess = (docs) => {
        const data = [];
        docs.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            data.push({ id: doc.id, ...doc.data() })

        });
        const workshops = this.manipulateDateFormat(data)
        console.log(workshops)
        this.setState(
            {
                workshops: [...workshops]
            })
    }

    manipulateDateFormat = (workshops) => {
        /*This funct converts the starDat and endDate from milliseconds format like 15366466550 to something like june 5th 2016*/
        for (let i = 0; i < workshops.length; i++) {
            let sd = workshops[i].startDate;
            let ed = workshops[i].endDate;

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
            workshops[i].sd = sd;
            workshops[i].ed = ed;


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

    modifyDateToSuitInputTypeDate = (workshopWithDatesInMilli) => {
        let startDay = (new Date(workshopWithDatesInMilli.sd)).getDate();
        let startMonth = (new Date(workshopWithDatesInMilli.sd)).getMonth() + 1;
        const startYear = (new Date(workshopWithDatesInMilli.sd)).getFullYear()

        let endDay = (new Date(workshopWithDatesInMilli.ed)).getDate();
        let endMonth = (new Date(workshopWithDatesInMilli.ed)).getMonth() + 1;
        const endYear = (new Date(workshopWithDatesInMilli.ed)).getFullYear()
        startMonth = (startMonth < 10) ? `0${startMonth}` : startMonth
        startDay = (startDay < 10) ? `0${startDay}` : startDay;
        endMonth = (endMonth < 10) ? `0${endMonth}` : endMonth;
        endDay = (endDay < 10) ? `0${endDay}` : endDay;






        workshopWithDatesInMilli.startDate = `${startYear}-${startMonth}-${startDay}`;
        workshopWithDatesInMilli.endDate = `${endYear}-${endMonth}-${endDay}`;
        workshopWithDatesInMilli.time = workshopWithDatesInMilli.time[0] + workshopWithDatesInMilli.time[1];
        workshopWithDatesInMilli.morningOrEvening = workshopWithDatesInMilli.time[2] + workshopWithDatesInMilli.time[3];
        console.log(workshopWithDatesInMilli)
        return workshopWithDatesInMilli

    }

    viewWorkshop = workshop => {
        this.props.history.push(`/client/workshops/${workshop.id}`, {
            workshop
        });
    }

    viewApplicants = (workshopId,workshopTitle, i) => {
        this.props.history.push(`/workshops/${workshopId}/applicants`,{
            workshopTitle
        });
    }

    editWorkshop = (aWorkshop) => {
        const workshop = this.modifyDateToSuitInputTypeDate(aWorkshop)
        // console.log(workshop)
        this.props.history.push("/contact",
            {
                workshop
            });
        this.modifyDateToSuitInputTypeDate(aWorkshop)
    }



    render() {
        return (
            <div>

                <Logout /><br />
                <div className="container">
                                    <Navigation />

                    <h1 className="o-theme-color"> Workshop</h1>
                    {this.state.workshops.map((workshop, i) =>

                        <Workshop viewWorkshop={() => { this.viewWorkshop(workshop) }} viewApplicants={() => { this.viewApplicants(workshop.id,workshop.title) }} editWorkshop={() => { this.editWorkshop(workshop) }} key={i} workshop={workshop} />
                    )}
                    <PlusIcon />

                </div>
                <Footer />

            </div>
        )
    }
}


export default Workshops