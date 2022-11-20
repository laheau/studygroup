import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { color } from "@mui/system";
import { CenterFocusStrong } from "@mui/icons-material";

export default function Cards({cards}) {
  return (
    <div className="flex flex-col w-fit m-auto items-center h-screen content-center">
      {cards.map(card => {
        console.log(card.tags);
        return (
          <div className="w-[500px] h rounded-lg p-[15px] my-2">
            <Accordion style={{ borderRadius: 15, backgroundColor: "transparent", color: 'white', fontSize: 20 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ height: '300px', backgroundColor: '#212326', borderRadius: 15, flexDirection: "column" }}
              >
                <div className="flex flex-col items-center">

                  {card.tags ? <Typography fontWeight={16} textAlign='right'  >{card.tags}</Typography> : null}
                  <Typography fontWeight={"bold"} fontSize={20} textAlign={'center'} >{card.question}</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ height: '300px', backgroundColor: "#3a3d42", borderRadius: 15, justifyContent: "center" }}>
                <Typography fontWeight={"semi-bold"} fontSize={20} textAlign={'center'} >
                  {card.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        )
      })}
    </div>
  )
}
