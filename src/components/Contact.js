import React, { Component } from 'react';
import { Logout, Footer, Navigation } from './util';
import FileUploader from 'react-firebase-file-uploader';
// import '../css/contact.css';

// import TimePicker from 'react-time-picker';

class Contact extends Component {
    constructor(props) {
        super(props);

        // const { location: { state: { workshop } } } = this.props;
        // const checkProps = "workshop" in this.props.location.state;
        // console.log(checkProps);
        // console.log(this.props.location.state === undefined)
        this.performUpdate = false;
        this.savedId = undefined;
        console.log(this.props)
        if (this.props.location.state !== undefined) {
            this.performUpdate = true;
            const { location: { state: { workshop } } } = this.props;
            const { startDate, endDate, status, time, title, fee, bannerUrl, description, id, venue, no_of_seats } = workshop;
            this.id = id;

            this.state = {
                workshop: {
                    startDate,
                    endDate,
                    fee,
                    title,
                    time,
                    status,
                    bannerUrl,
                    venue,
                    no_of_seats,
                    description

                },
                avatar: "",
                isUploading: false,
                upLoaded: false,
                progress: 0,
                bannerUrl: ""
            }

        } else {
            this.state = {
                workshop: {
                    startDate: undefined,
                    endDate: undefined,
                    fee: undefined,
                    title: undefined,
                    time: undefined,
                    status: undefined,
                    bannerUrl: undefined,
                    venue: undefined,
                    no_of_seats: undefined,
                    description: undefined

                },
                avatar: "",
                isUploading: false,
                upLoaded: false,
                progress: 0,
                bannerUrl: ""
            };
        }

    }

    componentDidMount() {
        let db = window.firebase.firestore();
        // const firestore = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        db.settings(settings);
        this.db = db;
    }

    // handleChangeUsername = event =>
    //     this.setState({ username: event.target.value });

    handleUploadStart = () => { this.setState({ isUploading: true, progress: 0 }) };
    handleProgress = progress => {
        if (progress === 100) {
            this.setState({ upLoaded: true })
        }
        this.setState({ progress })
    };
    handleUploadError = error => {
        this.setState({ isUploading: false, isLoaded: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        console.log("upload success")
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        window.firebase
            .storage()
            .ref("nesa_workshops")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ bannerUrl: url }));
    };


    handleWorkshopSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.save);

        // const decide = confirm("Want to upload without, a banner image?");
        //     if((decide === null) || decide === "") {
        //         alert("Pls Upload a banner Image");
        //         return;
        // }

        const venue = e.target.venue.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const startDate = Date.parse(e.target.startDate.value)
        const endDate = Date.parse(e.target.endDate.value);
        const bannerUrl = this.state.bannerUrl;
        const time = e.target.time.value + " " + e.target.morningOrEvening.value;
        // const morningOrEvening = e.target.morningOrEvening.value;
        const fee = Number(e.target.fee.value);
        const applications = 0;
        const no_of_seats = Number(e.target.noOfSeats);
        const status = this.performUpdate?"PUBLISHED":"DRAFT";

        const data = {
            venue,
            title,
            description,
            startDate,
            endDate,
            bannerUrl,
            time,
            fee,
            applications,
            status
        }
        console.log(data)

        this.handleSave(data);

    }

publishWorkshop = (e)=> {
    e.preventDefault();
    if(this.savedId === undefined) {
        alert("You should save first before you publish");
        return;
    }

    if(this.state.status === "PUBLISHED") {
        console.log("This workshop has already been published");
        return;
    }
    this.db.collection("Workshops").doc(this.savedId)
                .update({
                    status:"PUBLISHED",
                    updatedAt:Date.now()
                }).then(function(){
                    alert("Document Published Succesfully");
                    this.savedId = undefined;
                }).catch(function(err){
                    alert("Error publishing document");
                    console.log("Error publishing docs "+err)
                })
}


    saveToFirestore = (db, performUpdate, data) => {
        let { venue, title, description, startDate, endDate, bannerUrl, time, morningOrEvening, fee,
            applications, status } = data;
        // status = (performUpdate) ? "PUBLISHED" : status;

        if (performUpdate) {
            console.log("updating...")
            return db.collection("Workshops").doc(this.id)
                .update({
                    venue, title, description, startDate, endDate,
                    bannerUrl, time, fee, applications, status,
                    updatedAt:Date.now()
                })
        } else {
            console.log("saving...")
                        var getUniqueId = db.collection("Workshops").doc();
                        console.log(getUniqueId.id)
                        this.savedId = getUniqueId.id;

            return db.collection("Workshops").doc(getUniqueId.id).set({
                venue, title, description, startDate, endDate,
                bannerUrl, time, fee, applications, status,
                createdAt: Date.now(),
                updatedAt: Date.now()
            })

        }
    }

    // handleImageUpload = () => {
    //     const storageRef = window.firebase.storage().ref();
    // }

    handleSave = (data) => {


        this.saveToFirestore(this.db, this.performUpdate, data)
            .then(function () {
                console.log("Document successfully written!");
                alert("Document successfully written!");

            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                alert("Error writing document: ");

            });
        // this.db.collection("Workshops").add({
        //     venue,
        //     title,
        //     description,
        //     startDate,
        //     endDate,
        //     bannerUrl,
        //     time,
        //     fee,
        //     applications,
        //     status,
        //     createdAt: window.firebase.database.ServerValue.TIMESTAMP
        // })

    }

    uploadBanner = (e) => {
        e.preventDefault();
        // console.log(e.target.files[0])

        // const bannerUrl = e.target.value;
        // console.log(bannerUrl);
        const reader = new FileReader();

        reader.onload = function (event) {
            const the_url = event.target.result
            // console.log(the_url);
            const storageRef = window.firebase.storage().ref();
            storageRef.put(the_url).then(function (snapShot) {
                console.log('Uploaded a file or blob')
            })
                .catch(function () {
                    alert("upload failer");
                    // console.log(err)
                })
        }

        reader.readAsDataURL(e.target.files[0]);





    }

    render() {
        return (
            <div id="top">
                <Logout />
                <div id="o-contents">

                    <div id="o-body">

                        <h1 className="title">New Workshop</h1>
                        <Navigation />
                        <br /><br />
                        <form onSubmit={(e) => { this.handleWorkshopSubmit(e, 'DRAFT') }} id="o-form" className="mr-0">
                            <div className="form-group">
                                <input defaultValue={this.state.workshop.title} name="title" type="text" className="form-control o-input-theme o-input-modify-size" id="inputAddress" placeholder="Workshop title" />
                            </div><br />
                            <div className="form-row">
                                <div className="form-group col-sm-3">
                                    <input defaultValue={this.state.workshop.startDate} name="startDate" type="date" className="form-control o-input-theme o-input-modify-size" id="inputEmail4"
                                        placeholder="Start date" />
                                </div>
                                {/*<div className="form-group col-sm-4"><TimePicker
                                    onChange={this.handleTimeChange}
                                    value={this.state.time}
                                /></div>*/}
                                <div className="form-group col-sm-3">
                                    <input defaultValue={this.state.workshop.endDate} name="endDate" type="date" className="form-control o-input-theme o-input-modify-size" id="inputPassword4" placeholder="End date" />
                                </div>
                                <div className="form-group col-sm-3">
                                    <input defaultValue={this.state.workshop.time} name="time" max="12" min="1" type="number" className="form-control o-input-theme o-input-modify-size" id="inputPassword4" placeholder="Time" />
                                </div>
                                <div className="form-group col-sm-3  o-input-theme o-input-modify-size">
                                    <select defaultValue={this.state.workshop.morningOrEvening} name="morningOrEvening" className="form-control" id="sel1">
                                        <option>PM</option>
                                        <option>AM</option>

                                    </select>
                                </div>
                            </div><br />
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    {/*<input id="photo" onChange={this.uploadBanner} name="bannerUrl" accept="image/*" type="file" className="form-control o-input-theme o-input-modify-size" id="inputEmail4" placeholder="Upload Banner" />*/}
                                    <FileUploader
                                        accept="image/*"
                                        name="bannerUrl"
                                        randomizeFilename
                                        storageRef={window.firebase.storage().ref('nesa_workshops')}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess}
                                        onProgress={this.handleProgress}
                                        className="form-control o-input-theme o-input-modify-size"
                                        placeholder="Upload Banner"
                                    />
                                </div>
                                <div className="form-group col-md-2">{`${this.state.progress || 0}%`}</div>
                                <div className="form-group col-sm-5">
                                    <input defaultValue={this.state.workshop.fee} name="fee" type="number" className="form-control o-input-theme o-input-modify-size" id="inputPassword4" placeholder="Fee" />
                                </div>
                                {/*<div className="form-group col-sm-2">
                                    <input name="paymentStatus" type="checkbox" className="form-control o-input-modify-size" />
                                </div>*/}
                            </div><br />

                            <div className="form-row">
                                <div className="form-group col">
                                    <input defaultValue={this.state.workshop.venue} name="venue" type="text" className="form-control o-input-theme o-input-modify-size" id="inputEmail4" placeholder="Venue" />
                                </div>
                                <div className="form-group col">
                                    <input defaultValue={this.state.workshop.no_of_seats} name="noOfSeats" type="number" className="form-control o-input-theme o-input-modify-size" id="inputEmail4" placeholder="Number of seats" />
                                </div>
                            </div>

                            {/*<div  className="form-group col-md-2"><h3 className="paidText">Paid?</h3></div>*/}

                            <br />

                            <div className="form-group">
                                <textarea defaultValue={this.state.workshop.description} name="description" placeholder="Description" className="form-control o-input-theme" id="exampleFormControlTextarea1" rows="10"></textarea>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-3 col-sm-6">
                                        <button name="save" type="submit" className="btn btn-primary mr-5 o-btn-style">Save</button>

                                    </div>
                                    <div className="col-3 col-sm-5">
                                        <button onClick={this.publishWorkshop} name="publish" type="submit" className="btn  btn-success ml-5 o-btn-style">Publish</button>

                                    </div>
                                    <div className="col-6 col-sm-1"></div>
                                </div>

                            </div>
                        </form>

                        <br /><br /><br />
                        {/*<footer id="o-main-footer">
                <div style="color:black" className="col-4 pb-3">&copy;2017 Makers Academy Nigeria Ltd</div>

            </footer>*/}
                        <br /><br /><br /><br />

                    </div>
                </div>

                <Footer />

            </div>
        )
    }
}


export default Contact