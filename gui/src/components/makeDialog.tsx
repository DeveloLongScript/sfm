import Dialog from "@mui/material/Dialog"
import {useState} from "react"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

export default function makeDialog(name: string, description: string) {
    const [open, setOpen] = useState(true)

    const dialog = (
        <Dialog open={open} onClose={() => {setOpen(false)}}>
            <DialogTitle>
                {name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )

    
}