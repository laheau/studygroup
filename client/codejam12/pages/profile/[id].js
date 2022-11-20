import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { color } from "@mui/system";
import { CenterFocusStrong } from "@mui/icons-material";
import Cards from "../components/UI/Cards";

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
    <Cards cards={cards} />
  );
}

export default Profile;
