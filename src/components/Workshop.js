import React, { Component } from 'react';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Skeleton from 'react-loading-skeleton';

import { NavLink } from 'react-router-dom';


class Workshop extends Component {
    constructor(props) {
        super(props)
        
        // this.state = {
        //     id,
        //     startDate,
        //     endDate,
        //     time
        // }

    }



    render() {
        let { workshop: { id, startDate,endDate, time, title, status, applications, createdAt },viewWorkshop,viewApplicants, editWorkshop } = this.props;
        applications = (applications !== undefined)?(applications +" applications"):applications;
        return (
            <div>{}
                <div className="container mt-3">
                    <div className="container">
                        <div className="workshop-post pt-3 mb-3 ">
                            <div className="d-flex justify-content-between">
                                {/*<div className="date-time">
                                    <span className="mr-2">{startDate || <Skeleton width={100} duration={0.6} />}</span>
                                    <span>{time || <Skeleton width={150} duration={0.6} />}</span>
                                </div>*/}
                                <div>{startDate || <Skeleton width={100} duration={0.6} />}&nbsp;-{endDate || <Skeleton width={100} duration={0.6} />} &nbsp;{time || <Skeleton width={150} duration={0.6} />}</div>
                                <div onClick={editWorkshop} className={`${status === 'PUBLISHED' ? 'text-success' : 'text-warning'} status font-weight-bold`}>{status || <Skeleton width={100} duration={0.6} />}</div>
                            </div>
                            {/*text-decoration:none*/}
                            <h3 onClick={viewWorkshop} className="workshop-title my-2">{title || <Skeleton width={800} duration={0.6} />}</h3>
                            <h4 onClick={viewApplicants} className="application-status text-success">{applications || <Skeleton width={100} duration={0.6} />}</h4>
                            <small>{createdAt||<Skeleton width={200} duration={0.6} />}</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Workshop;