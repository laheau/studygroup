import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { color } from "@mui/system";
import { CenterFocusStrong } from "@mui/icons-material";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  const [cards, setCards] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

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
    <div className="flex flex-col w-fit m-auto items-center h-screen content-center">
        {cards.map(cards => {
                    console.log(cards.question);
                    return (
    <div className="border-2 w-[500px] h rounded-lg p-[15px] my-2 outline-lime-500 border-lime-200">
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{height: '300px'}}
      >
        <Typography >{cards.question}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{height: '300px', backgroundColor: "lightgray"}}>
        <Typography >
          {cards.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
    </div>
        )})}
  </div>
  );
}

export default Profile;
