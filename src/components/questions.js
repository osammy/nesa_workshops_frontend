import React, { Component } from 'react';
import { ListGroup, ListGroupItem }  from 'react-bootstrap';

import { withRouter } from 'react-router-dom';
import dummyData from '../data/data'

class Questions extends Component {

  constructor() {
    super();
    console.log(dummyData)
    const storedQuestions = localStorage.getItem("questions");
    /* uncomment this to input data from dummyData */
    // let allQuestions;
    
    // if(storedQuestions !== null) {
    //     allQuestions = JSON.parse(storedQuestions);

    // } else {
    //     allQuestions = dummyData;
    // }

    /* ---------------------------------End Comment------------------------------------------------ */

        const allQuestions = (storedQuestions !== null) ? JSON.parse(storedQuestions) : [];

    const subjects = []
    for(let subject in allQuestions) {
        subjects.push(
            {
                subject,
                hint:allQuestions[subject][0]['hint']

            }
        )
    }
    
    this.state = { subjects }


  }



  openAnswer = subject => {
    this.props.history.push(`/answers/${subject}`, {
        subject
    });
  }

  render() {
      return (
          <div className="container">
            <h3>Questions</h3>
            <br />
            <ListGroup>
                {this.state.subjects.map((S, i) => {
                    return (
                        <ListGroupItem key={i} onClick={() => this.openAnswer(S.subject)}>
                            <h4>{S.subject}</h4>
                            <p>{S.hint}</p>
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
          </div>
      );
  }
}

export default withRouter(Questions);
