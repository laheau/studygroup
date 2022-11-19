import { ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Course = () => {
    const [questions, setQuestions] = useState([]);

    const router = useRouter()
    const { id } = router.query
    const [prevId, setPrevId] = useState(id);

    useEffect(() => {
        if (id != undefined) setPrevId(id);
    }, [id])

    useEffect(() => {
        if (id != undefined) {
            fetch(`http://localhost:8000/course/${id}/questions`)
                .then((response) => response.json())
                .then((data) => setQuestions(data.data || []));
        }
    }, [id])

    console.log(questions)

    return (
        <div className="text-center">
            <div className="bg-lime-200 rounded-lg p-[20px]">
                <h1 className="text-2xl font-bold">Course: {id}</h1>
            </div>
            <div className="flex flex-col w-fit m-auto items-center h-screen content-center" >
                <h1 className="text-xl font-bold my-5">QUESTIONS</h1>
                {questions.map(question => {
                    console.log(question);
                    return (
                        <Link
                            href={`/question/${question.question_id}`}
                            key={question.question_id}
                        >
                            <div className="bg-lime-200 text-xl rounded-lg p-[20px] transition transform hover:scale-125">
                                {question.title}
                            </div>
                        </Link>
                    )
                })}
                <Link
                    href={`/course/${id}/question/create`}
                >
                    <div className="bg-lime-200 my-5 text-xl font-bold rounded-lg p-[20px] transition transform hover:scale-125">
                        CREATE
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default Course