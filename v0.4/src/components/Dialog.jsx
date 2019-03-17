import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

import Close from '@material-ui/icons/Close';

function CustomDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle align='right'>
                <button className='icon' onClick={props.onClose}><Close fontSize='small' /></button>
            </DialogTitle>
            <DialogContent>
                <div>
                    {props.children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog;