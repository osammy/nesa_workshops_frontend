import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { 
  ListGroup,
  ListGroupItem,
  Button,
  FormGroup,
  FormControl,
  InputGroup
}  from 'react-bootstrap';

class PostAnswer extends Component {
  constructor(props) {
    super(props);

    const { location: { state: { subject } } } = this.props;
    const storedQuestions = localStorage.getItem("questions");
    const questions = (storedQuestions !== null) ? JSON.parse(storedQuestions) : {};
    let exam  = questions[subject];
    this.subject = subject;
    const show = false;
     


  this.state = {
    exam,
    show
  }


  }


handleRadioChange = (e,Exam,dIndex)=> {

for(var i=0;i<Exam.options.length;i++) {
    
    Exam.options[i].selected = false;
    if(i === dIndex) {
      Exam.options[dIndex].selected = e.target.checked;
    }
}

const theCopy = this.state.exam;
const indexInState = this.state.exam.indexOf(Exam);
theCopy[indexInState] = Exam;
this.setState(
  {
    exam:theCopy
  }
)

}
submitExam = ()=>{
  let count = 0;
  const show = true;
  for(var i=0;i<this.state.exam.length;i++) {
    for(var j=0;j<this.state.exam[i].options.length;j++) {

      if(this.state.exam[i].options[j].selected && this.state.exam[i].options[j].correct) {
        //  console.log(this.state.exam[i].options[j].selected+ "===" +this.state.exam[i].options[j].correct)
          count = count+1;
      }
    }
  }

  alert("your score is: "+count);
  this.setState(
    {
      show
    }
  )
}


  render() {
    return (
      <div className="container">

        <h2>{this.subject}</h2>
        <br />

        <ListGroup>
            {this.state.exam.map((E, i) => {
              return (
                <ListGroupItem key={i}>
                  <p style={{
                    "fontSize":"1.2em"
                  }}>{E.question}</p>
                  
                    {E.options.map((O,j)=>{
                      return <span style={{
                          "color":(this.state.exam[i].options[j].correct && this.state.show)?"green":"black"
                        }} key={j}>
                        <input onChange={(e)=>{this.handleRadioChange(e,E,j)}} value={O.option} type="radio" name={`radio${E.question}`}  />
                        &nbsp;{O.option}
                        <span>
                          <i className={
                           (this.state.exam[i].options[j].selected && this.state.exam[i].options[j].correct && this.state.show)? "glyphicon glyphicon-ok":"item"
                           }>
                           </i>
                        <br />
                        </span>
                        </span>
                    })}

                </ListGroupItem>
              );
            })}
          </ListGroup>

          <br />

            <br />
            <button onClick={this.submitExam} className="btn btn-primary">Submit Exam</button>


      </div>
    );
  }
}

export default PostAnswer;
