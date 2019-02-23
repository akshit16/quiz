import React,{Component} from 'react'
import { Button, Form, Input, TextArea, Grid, Select } from 'semantic-ui-react'
import axios from 'axios';

var options = []
class quiz extends Component{
    state={
      category:[],
      selectedFile: null, 
      loaded: 0,
      quizname:'',
      catvalue:'',
      subvalue:'',
      subcategory:[]
    }
    componentDidMount(){
        this.callBackendAPI()
    }
    callBackendAPI = async () => {
      const response = await fetch('/api/category/getcategory');
      const body = await response.json();
    console.log(body)
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      this.setState({category:body.categ})
      options=this.state.category
      console.log(options)
      return body;
    }

    getsubcateg = async () => {
      const response = await fetch('/api/category/getSubCategory');
      const body = await response.json();
    console.log(body)
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      
      console.log(this.state.catvalue)
      
      for(var i=0;i<body.subcateg.length;i++)
      {
      if(this.state.catvalue==body.subcateg[i].category){
      var subcategory=[]
      subcategory=Object.assign({}, body.subcateg[i], { category: undefined });
      delete subcategory.category
      console.log(subcategory.text.length)
      var obj=[]
      for(var j=0;j<subcategory.value.length;j++)
      obj[j] ={key:subcategory.text[j], text:subcategory.text[j],value:subcategory.value[j]}
      console.log(obj)
      this.setState({subcategory:obj},function(){
        console.log(this.state.subcategory)
      })
    }
    }

     // options=this.state.category
      //console.log(options)
      return body;
    }

    handleselectedFile = (event) => {
      console.log(event.target.files)
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      },function(){
        console.log(this.state.selectedFile)
      })
    } 

    handleChange=(e,data)=>
    {
     this.setState({catvalue:data.value},function(){
       console.log(this.state.catvalue)
     })
     this.getsubcateg()

      console.log(data.value)
    }

    handleSubChange=(e,data)=>
    {
     this.setState({subvalue:data.value},function(){
       console.log(this.state.subvalue)
     })
    }
    handleUpload = () => {
      const data = new FormData()
      console.log(this.state.selectedFile)
      data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        
      axios
        .post('/api/quiz/upload', data, {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
            })
          },
        })
        .then(res => {
          console.log(res.statusText)
          console.log(this.state.selectedFile)
          this.setState({selectedFile:null},function(){
            console.log(this.state.selectedFile)
          })
          this.cancelCourse()
          this.onSubmit()
        }).catch(err=>{
          console.log(err)
        })
  
    }

    onSubmit=(e)=> {
      
      const data = {
           quizname: this.state.quizname,
           category:this.state.catvalue,
           subcategory:this.state.subvalue
           }
    console.log(data)
        axios.post('/api/quiz/createQuiz', data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(function (res){
        console.log(res)
    
      //this.history.push('/adminHome');
  //console.log(this.state.session)
      })
      .catch(err=>{
        console.log(err+"abc")
      });
    //  this.cancelCourse()
 }  
//  cancelCourse = () => { 
//   document.getElementById("form-input-control-first-name").value="";
//   document.getElementById("some").value="";
// }
  updateInput=(event)=>{
      this.setState({quizname : event.target.value},function(){
        console.log(this.state.quizname)
      })
     
      }
      // updateSub=(event)=>{
      //   this.setState({sub : event.target.value})
      //   }

    cancelCourse = () => { 
      document.getElementById("files").value="";
    }
    render(){
        return(
            <div>
              <Form id='uploadForm' encType="multipart/form-data"  method="post" 
              style={{marginTop:"30px"}}>  
        
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='Quiz Name'
              placeholder='Quiz Name'
              onChange={this.updateInput}
            />
            <Form.Field
             control={Select}
               onChange={this.handleChange}
              options={this.state.category}
              label={{ children: 'Category', htmlFor: 'form-select-control-gender' }}
              placeholder='Category'
              
              
            />
            <Form.Field
              control={Select}
              options={this.state.subcategory}
              onChange={this.handleSubChange}
              label={{ children: 'Sub Category', htmlFor: 'form-select-control-gender' }}
              placeholder='Sub Category'
              search
              searchInput={{ id: 'form-select-control-gender' }}/>
         {/* <Form.Field label='file' type='file' control='button' style={{float:'left',marginTop:"6px"}}>
      Upload File
    </Form.Field> */}
    <input type="file" name="files" id="files" style={{marginTop:"6px"}} onChange={(event)=>this.handleselectedFile(event)} />
          <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Submit'
            style={{marginTop:"8px"}}
            onClick={(e)=>{this.handleUpload();}}
          />
        </Form>
        </div>
        )
    }
}
export default quiz