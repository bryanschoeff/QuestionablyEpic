import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {runSimC} from "../Engine/SimCImport/SimCImportEngine";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

// const useStyles = makeStyles((theme) => ({
//   root: { height: 500 },
// }));

export default function SimCraftInput(props) {
  // const classes = useStyles;
  const [open, setOpen] = React.useState(false);
  const [simC, setSimC] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    //setErrorMessage("Incorrect Spec")
    runSimC(simC, props.pl, props.contentType, setErrorMessage);
    //setOpen(false);
  };


  return (
    <div>
      <Button style={{ color: "white" }} onClick={handleClickOpen}>
        SimC
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Paste Your SimC String</DialogTitle>
        <DialogContent style={{ height: 400 }}>
          
          <TextField
            // className={classes.root}
            autoFocus
            multiline={true}
            margin="dense"
            id="simcentry"
            label="SimC String"
            fullWidth
            style={{ height: "100%" }}
            variant="outlined"
            onChange={evt => setSimC(evt.target.value)}
          />
          
        </DialogContent>
        <DialogActions>
        <p id="SimCError">{errorMessage}</p>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
