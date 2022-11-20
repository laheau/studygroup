import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { color } from "@mui/system";
import { CenterFocusStrong } from "@mui/icons-material";
import TextField from "@mui/material/TextField";


const card = {
    "question": "Hi how are you?",
    "answer": "Great!"
}

const Quizz = () => {
    const router = useRouter();
    const { id } = router.query;

    const [filter, setFilter] = useState("");
    const [cards, setCards] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [fetchedCards, setFetchedCards] = useState(false);
    const [filteredCards, setFilteredCards] = useState([]);

    useEffect(() => {
        if (!fetched) {
            console.log(id);
            fetch(`http://localhost:8000/student/${id}/cards`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.result != undefined) {
                        setCards(data.result);
                        setFetched(true);
                    }
                });
        }
    }, []);

    return (
        <div>
            <div className="flex flex-col w-fit m-auto items-center h-screen content-center">

                <div className="w-[500px] h rounded-lg p-[15px] my-2">
                    <Accordion style={{ borderRadius: 15, backgroundColor: "transparent", color: 'white', fontSize: 20 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ height: '300px', backgroundColor: '#66b2ff', borderRadius: 15, flexDirection: "column" }}
                        >
                            <div className="flex flex-col items-center">

                                {card.tags ? <Typography fontWeight={16} textAlign='right'  >{card.tags}</Typography> : null}
                                <Typography fontWeight={"bold"} fontSize={20} textAlign={'center'} >{card.question}</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails style={{ height: '300px', backgroundColor: "#204f85", borderRadius: 15, justifyContent: "center" }}>
                            <Typography fontWeight={"semi-bold"} fontSize={20} textAlign={'center'} >
                                {card.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>

            </div>
        </div>

    );
}

export default Quizz;
