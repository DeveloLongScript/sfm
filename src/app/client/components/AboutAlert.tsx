import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Link
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function About(props: {
  open: boolean;
  setOpen: (bool: boolean) => void;
}) {
  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <h2 style={{ textAlign: "center" }}>
          SFM
          <hr />
        </h2>
        <DialogContentText id="alert-dialog-description">
          SFM was developed by DeveloLongScript (and other open source
          contributors) aiming to create a self-hosted file manager.<br /> SFM stands for <i>simple file manager</i>.<br />
          <br/>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Open Source Licenses</Typography>
            </AccordionSummary>
            <AccordionDetails><iframe src="/api/misc-api/getLicensesHTML" style={{width: "100%", height: "400px", backgroundColor: "white"}}></iframe><br/><Typography>Generated using <Link href="https://npmjs.com/package/slicf">slicf</Link></Typography></AccordionDetails>
          </Accordion>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setOpen(false);
          }}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
