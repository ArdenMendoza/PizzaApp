import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

interface Props {
    isDialogOpen: boolean;
    dialogTitle: string;
    dialogText: string;
    onClose: (s: boolean) => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const MessageDialog: React.FunctionComponent<Props> = (props) => {
    const { isDialogOpen, dialogText, dialogTitle, onClose } = props;

    const handleClose = () => {
        onClose(false);
    }
    return (
        <Dialog
            open={isDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{dialogText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary"> Ok </Button>
            </DialogActions>
        </Dialog>
    );
}

