import React from 'react'

export default function CardCreationForm() {
  const [question,setQuestion] = React.useState("")
  const [answer,setAnswer] = React.useState("")

  
  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value)
  }
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      student_id: 1,
      question: question,
      answer: answer,
      tags: "",
    };
    fetch(`http://localhost:8000/card`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(res => console.log(res));
  };
  
  return (
    <div className='relative mr-[130px] items-center justify-center w-[400px]'>
      <h1 className='font-bold text-2xl text-center text-white my-5 uppercase'>Create a card</h1>
      <div className='bg-[#212326] rounded-lg p-[20px] my-5 flex flex-col content-center '>
        
      <form>
        <div>
          <textarea onChange={handleChangeQuestion} className='w-[100%] h-[100%] rounded-lg p-[10px]' placeholder='Question' />
        </div>
        <div>
          <textarea onChange={handleChangeAnswer} className='w-[100%] h-[100%] rounded-lg p-[10px]' placeholder='Answer' />
        </div>
        <button
              type="submit"
              title="submit"
              className="p-[10px]
                    bg-white
                    rounded-lg text-center font-bold text-[#212326] transition transform hover:scale-125"
              onSubmit={handleSubmit}
            >SUBMIT</button>
      </form>
      </div>
    </div>)
}
