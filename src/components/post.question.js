import React, { Component } from 'react';

class PostQuestions extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   question:
    //   {
    //     subject: "",
    //     question: "",
    //     options: [{
    //       option: "",
    //       for: "",
    //       correct: false
    //     }]
    //   }
    //   ,
    //   questions: []

    // }
    this.state = {

        subject: "",
        question: "",
        options: []

    }
  }

  addOptions = (e) => {
    e.preventDefault();
    const newObj = {
      option: "",
      selected:false,
      correct: false
    }

    let addOption = [...this.state.options, newObj]
    let newQuestion = this.state.options;
    newQuestion = addOption;
    // console.log(newQuestion)

    this.setState({ options: newQuestion},function(){
      console.log(this.state)
    })

  }

  handleInputChange = (e)=>{
    
    this.setState({
      subject:e.target.value
    })
  }

    handleTextAreaChange = (e)=>{
    
    this.setState({
      question:e.target.value
    })
  }





  submitExam = (e) => {
    e.preventDefault();
    const formInfo = 
      {
        subject: "",
        question: "",
        hint:"",
        options: []
      };


    formInfo.subject = e.target.subject.value;
    formInfo.question = e.target.question.value;
    formInfo.hint = e.target.hint.value;
    let theOption = "";
    const keepCount = [];

    if (e.target.radio.length< 2) {
      alert('You need to Enter mmore than one question');
      return;
    }
    this.state.options.map((val, j) => {
      theOption = `option${j + 1}`;
      keepCount.push(theOption)
      // theRadio = `radio${j+1}`;
      formInfo.options.push(
        {
          option: e.target[theOption].value,
          selected:false,
          correct: e.target.radio[j].checked
        }
      )

    })
    // const questions = [...this.state.questions, formInfo];
   const {subject, question, hint ,options} = formInfo;
    console.log(formInfo);
    this.setState({
      subject, 
      question,
      hint,
      options

    })

    const examSubject =  formInfo.subject;
    let data = localStorage.getItem("questions");

    if(data !== null) {
      let db = JSON.parse(data);

      if(!db[examSubject]) {

      db[examSubject] = [formInfo];
      localStorage.setItem("questions",JSON.stringify(db));
      
    } else {
      // alert(JSON.stringify(db[examSubject]))
      db[examSubject].push(formInfo);
      localStorage.setItem("questions",JSON.stringify(db))
      }

    } else {
      const putInDb = {};
      putInDb[examSubject] = [formInfo];

      localStorage.setItem("questions",JSON.stringify(putInDb));
    }
     this.setState({
       question:"",
       options:[]
     })
  }


  render() {
    return (
      <div className="container">
        <form name="post" onSubmit={this.submitExam}>
          <h3>Post Question</h3>
          <br /><br />
          <label htmlFor="subject">Subject</label>
          <input value={this.state.subject} onChange={this.handleInputChange}
           name="subject" type="text" className="form-control" />
          <label htmlFor="subject">Instruction</label>
          <input value={this.state.hint} 
           name="hint" type="text" className="form-control" />

          <br />
          <label htmlFor="question">Question</label>
          <textarea onChange={this.handleTextAreaChange} value={this.state.question} name="question" className="form-control"></textarea>
          <br />
          <div>  <button type="submit" className="btn btn-primary">Submit</button>
</div>
          <button onClick={this.addOptions} className="btn btn-primary">add Option</button>

          {
            this.state.options.map((Option, i) => {
              return (
                <div style={{
                       "width":"30%",
                       "padding":"20px"
        }}  key={i} className="input-group">

      <input placeholder={`Option${i + 1}`} name={`option${i + 1}`}  type="text" value={`Option${i + 1}`} className="form-control" aria-label="..." />
            <span className="input-group-addon">
        <input name="radio" type="radio" aria-label="..." />
      </span>
      </div>)
            })
          }

          <hr />
              <div>
                <h2>{this.state.subject}</h2>
                <p>{this.state.question}</p>
              </div>
        </form>
      </div>
    );
  }
}

export default PostQuestions;
