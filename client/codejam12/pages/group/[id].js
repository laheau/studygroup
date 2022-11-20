import { ListItemButton, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ThumbUp, ArrowUpwardRounded } from "@mui/icons-material";
import Cards from "../components/UI/Cards";
import GroupMembers from "../components/UI/GroupMembers";

const mockGroup = {
    name: "COMP202 STUDY GROUP",
    group_id: 1,
    student_count: 3,
}

const mockCards = [
    {
        question: "How to compute 2+2?",
        answer: "Simple, just use a calculator."
    },
    {
        question: "How to compute 1*1?",
        answer: "Simple, just use a calculator."
    },
    {
        question: "Who is going to win CodeJam12?",
        answer: "Aymen Ouali and Jun Kai Liao"
    },
]

const Group = () => {
    const [group, setGroup] = useState(mockGroup);
    const [cards, setCards] = useState(mockCards);

    const router = useRouter()
    const { id } = router.query

    return (
        <div className="text-center">
            <div className="rounded-lg p-[20px]">
                <h1 className="text-[60px] font-bold text-white">{group.name}</h1>
                <h1 className="text-xl font-bold my-5 text-white">Study Cards</h1>
            </div>
            <div className="flex flex-col w-fit m-auto items-center h-screen content-center" >
               <Cards cards={cards} />
            </div>
            <GroupMembers />
        </div>

    )
}

export default Group