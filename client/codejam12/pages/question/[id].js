import { ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Question = () => {
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    
    const router = useRouter()
    const { id } = router.query
    const [prevId, setPrevId] = useState(id);

    useEffect(() => {
      if (id != undefined) setPrevId(id);
    }, [id])
    

    useEffect(() => {
        if (id != undefined && id != prevId) {

            fetch(`http://localhost:8000/question/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.data != undefined) setQuestion(data.data[0])
                    if (data.answer_list != undefined) setAnswers(data.answer_list)
                });
        }
    }, [id, prevId])

    return (
        <div>
            <h1>{question.title}</h1>
            <div>
                <p>{question.content}</p>
            </div>
            <ListItemButton component="a" href="#simple-list">
                {answers.map(answer => {
                    return (
                        <Link 
                        href={`/question/${answer.answer_id}`}
                         key={answer.answer_id}
                         >{answer.title}
                         </Link>
                    )
                })}
            </ListItemButton>
        </div>

    )
}

export default Question