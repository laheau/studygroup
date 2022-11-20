import { useRouter } from 'next/router'
import React from 'react'

export default function CardCreationForm() {
  const router = useRouter()
  const [question,setQuestion] = React.useState("")
  const [answer,setAnswer] = React.useState("")
  const [tags,setTags] = React.useState("")

  
  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value)
  }
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      studentId: 1,
      question: question,
      answer: answer,
      tags: tags,
    };
    console.log(body)
    fetch(`http://localhost:8000/card`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(router.push('/profile/1'));
  };
  
  return (
    <div className='relative mr-[130px] items-center justify-center w-[400px]'>
      <h1 className='font-bold text-2xl text-center text-[#0a1828] my-5 uppercase'>Create a card</h1>
      <div className='bg-[#66b2ff] rounded-lg p-[20px] my-5 flex flex-col content-center '>
        
      <form onSubmit={handleSubmit}>
        <div>
          <textarea onChange={handleChangeQuestion} className='w-[100%] h-[100%] my-5 rounded-lg p-[10px]' placeholder='Question' />
        </div>
        <div>
          <textarea onChange={handleChangeAnswer} className='w-[100%] h-[100%] my-5 rounded-lg p-[10px]' placeholder='Answer' />
        </div>
        <div>
          <textarea onChange={(e) => setTags(e.target.value)} className='w-[100%] h-[100%] my-5 rounded-lg p-[10px]' placeholder='Tags' />
        </div>
        <input type="submit" className="p-[10px] uppercase font-bold bg-white rounded-lg text-[#66b2ff]  transition transform hover:scale-125"/>

      </form>
      </div>
    </div>)
}
