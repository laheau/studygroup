import { ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


const Question = () => {
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [content, setContent] = useState("");
    const [fetchedAnswers, setFetchedAnswers] = useState(false);
    const router = useRouter()
    const { id } = router.query
    const [prevId, setPrevId] = useState(id);

    useEffect(() => {
      if (id != undefined) setPrevId(id);
    }, [id])
    
    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            "student_id": 1,
            "question_id": id,
            "content": content,
            "tags": ""
        }
        fetch(`http://localhost:8000/answer`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(router.push(`/question/${id}`))
    }

    useEffect(() => {
        if (id != undefined && !fetchedAnswers) {

            fetch(`http://localhost:8000/question/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.data != undefined) setQuestion(data.data[0])
                    if (data.answer_list != undefined) {
                        setAnswers(data.answer_list)
                        setFetchedAnswers(true)
                        console.log("Fetchnt")
                    }
                });
        }
    }, [id])
    console.log(question);
    return (
        <html>
        <head>
            <title>
                {question.title}
            </title>
         </head>
        <div className="flex flex-col mt-5 m-auto items-center h-screen content-center">
            <div className="bg-lime-100 p-[15px] rounded-lg w-[600px]">
            <h1 className="text-center text-2xl font-bold">{question.title}</h1>
                <p className="my-5">{question.content}</p>

               
                
            </div>
            <div>
                    <form onSubmit={handleSubmit}>
                    <textarea placeholder="Answer" className="p-[5px] w-[500px] h-[300%] outline-black rounded-lg border-black border-2 m-5 align-middle content-center" name="content" defaultValue={""} onChange={handleContentChange}></textarea>
                    <button
                    type="submit"
                    title="submit"
                    className="p-[10px]
                    bg-lime-200
                    rounded-lg text-center font-bold"
                    onSubmit={handleSubmit}> SUBMIT </button>
                    </form>
                    
                </div>
                {answers.map(answer => {

                    return (
                        <div 
                        
                         key={answer.answer_id}
                         >
                            <div className="border-2 w-[500px]">
                                <div className="">
                                {answer.content}
                                </div>
                                <div className="flex justify-between flex-row">
                                    <div className="items-start">
                                    Author: Aymen Ouali

                                    </div>
                                    <div className="items-end">
                                        <div>
                                        {answer.upvotes} 
                                        </div>
                                    </div>                                    
                                </div >



                        </div>
                         </div>
                    )
                })}
        </div>
        </html>
    )
}

export default Question