import { ListItemButton, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ThumbUp, ArrowUpwardRounded } from "@mui/icons-material";

const Course = () => {
    const [questions, setQuestions] = useState([]);

    const router = useRouter()
    const { id } = router.query
    const [prevId, setPrevId] = useState(0);
    const [fetchedQuestions, setFetchedQuestions] = useState(false);

    useEffect(() => {
        if (id != undefined && !fetchedQuestions) {
            fetch(`http://localhost:8000/course/${id}/questions`)
                .then((response) => response.json())
                .then((data) => {
                    setQuestions(data.data || [])
                    setFetchedQuestions(true)
                    console.log('fetched')
                })
        }
    }, [id])


 
    return (
        <div className="text-center">
            <div className="rounded-lg p-[20px]">
                <h1 className="text-[60px] font-bold text-white">{id}</h1>
                <h1 className="text-xl font-bold my-5 text-white">QUESTIONS</h1>
            </div>
            <div className="flex flex-col w-fit m-auto items-center h-screen content-center" >
                {questions.sort((b,a) => a.upvotes - b.upvotes).map(question => {
                    console.log(question);
                    return (
                        <Link
                            href={`/question/${question.question_id}`}
                            key={question.question_id}
                        >
                            <div className="flex justify-between space-x-5 w-[500px] bg-[#212326] text-xl my-2 rounded-lg p-[25px] transition transform hover:scale-125">
                                <div className="text-left text-white">
                                    {question.title}
                                </div>
                                <div className="text-right text-white">

                                    <ThumbUp style={{color: 'white', marginRight: 10}} />


                                    {question.upvotes}
                                </div>
                            </div>
                        </Link>
                    )
                })}
                <Link
                    href={`/course/${id}/question/create`}
                >
                    <div className="bg-[#212326] text-white my-5 text-xl font-bold rounded-lg p-[20px] transition transform hover:scale-125">
                        CREATE
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default Course