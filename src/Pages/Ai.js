import React, {useState} from 'react'
import { openai } from '../components/api/openapi'
import styled from "styled-components"
import {auth} from '../firebase'
import { Avatar } from '@mui/material'
import ai from '../assets/ai.png'
import { Send } from '@mui/icons-material'

const Ai = () => {
  const[input, setInput] = useState("")
  const picUrl = auth.currentUser.photoURL
  const [isLoading, setIsLoading] = useState(false);
  const[submittedTest, setSubmittedText] = useState("")
  const[res, setRes] = useState([])
  const handleSubmit = async () =>{
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setSubmittedText(input)
    setInput(" ")
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt:input,
      temperature: 0.5,
      max_tokens: 500,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })
    setRes(response.data.choices[0].text)
    console.log(response.data.choices[0].text)
  }
  return (
    <Container>
       <div className='input-con'>
            <div className="ai-pro">
            <Avatar src={picUrl}/>
            </div>
       <input value={input} onChange={(e)=>{
            setInput(e.target.value)}}
            placeholder="What's up ?"
            />
        <div className='but' onClick={handleSubmit}>
        <Send className='button'/>
        </div>
        
        </div>
        
        <div className='response'>
        <div className='user-res'>
            <div className='image-con'>
               <Avatar src={picUrl}/>
            </div>
            <div className='sub-text'>
           {submittedTest}
           </div>
        </div>
        <div>
        
        <div className='bot-response'>
                 {isLoading ? (
                    <div className='loading'>
                         <p>Typing...</p>
                    </div>
                  
                 ):( <div className='result-con'>
                   <div className='ai-pro'>
                        <Avatar src={ai}/>
                    </div>
                 <div className='gradient__text'>
              <p>{res}</p>
                    </div>
                    </div>
                 )}
        
        </div>
        </div>
       
          
        </div>
    </Container>
  )
}

export default Ai

const Container = styled.div`
   display:flex;
    color:white;
    padding:2rem;
    align-items:center;
    justify-content:center;
    h1{
        position:absolute;
        left: 0;
        top: 0;
        margin: 10px;
    }
   .but-con{
    display:flex;
    align-items:center;
    justify-content:center;
   }
   .button{
    display:flex;
    align-items:center;
    justify-content:center;
   }

`;
