import { Add, ThumbUp } from "@mui/icons-material";
import { ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CardCreationForm from "../components/UI/CardCreationForm";

const Question = () => {
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [content, setContent] = useState("");
  const [createCard, setCreateCard] = useState(false);
  const [fetchedAnswers, setFetchedAnswers] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [prevId, setPrevId] = useState(id);

  useEffect(() => {
    if (id != undefined) setPrevId(id);
  }, [id]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      student_id: 1,
      question_id: id,
      content: content,
      tags: question.course_id,
    };
    fetch(`http://localhost:8000/answer`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(router.reload(window.location.pathname));
  };

  useEffect(() => {
    if (id != undefined && !fetchedAnswers) {
      fetch(`http://localhost:8000/question/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.data != undefined) setQuestion(data.data[0]);
          if (data.answer_list != undefined) {
            setAnswers(data.answer_list);
            setFetchedAnswers(true);
            console.log("Fetchnt");
          }
        });
    }
  }, [id]);
  console.log(question);
  return (
    <div className="flex flex-row justify-between content-center">
      <div className="flex flex-col mt-5 m-auto items-center h-screen content-center">
        <div className="flex flex-col bg-[#212326] p-[15px] rounded-lg w-[600px]">
        <div onClick={() => setCreateCard(prev => !prev)} className="cursor-pointer w-fit mx-2 bg-white border-4 border-[#212326] rounded-[50%] p-[12px]">
          <Add />
        </div>
          <div className="flex flex-col justify-between">

            <h1 className="text-center text-2xl font-bold text-white">{question.title}</h1>

          </div>
          <div className="rounded-lg text-xl p-[10px] bg-white my-10">

          <p className="my-5 text-black">{question.content}</p>
          </div>

          <div className="flex justify-between flex-row">
            <div className="items-start text-white">Author: Aymen Ouali</div>
            <div className="items-end">
              <div className="text-white mx-1">
                <ThumbUp style={{cursor: 'pointer', color: "white", marginRight: 10}} />
                {question.upvotes}
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Answer"
              className="p-[5px] w-[500px] h-[300%] outline-black rounded-lg border-black border-2 m-5 align-middle content-center"
              name="content"
              defaultValue={""}
              onChange={handleContentChange}
            ></textarea>
            <button
              type="submit"
              title="submit"
              className="p-[10px]
                    bg-[#212326]
                    rounded-lg text-center font-bold text-white transition transform hover:scale-125"
              onSubmit={handleSubmit}
            >
              {" "}
              SUBMIT{" "}
            </button>
          </form>
        </div>
        {answers.map((answer) => {
          return (
            <div className="my-1 " key={answer.answer_id}>
              <div className="border-4 w-[500px] rounded-lg p-[15px] outline-[#212326] border-[#212326] bg-white">
                <div className="my-3">{answer.content}</div>
                <div className="flex justify-between flex-row">
                  <div className="items-start">Author: Aymen Ouali</div>
                  <div className="items-end">
                    <div>
                      <ThumbUp style={{cursor: 'pointer', marginRight: 10}} />
                      {answer.upvotes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {createCard ? <CardCreationForm /> : null}
    </div>

  );
};

export default Question;
