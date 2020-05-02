import { IOpenDialogAction, ICloseDialogAction } from '../actions/DialogActions';

export interface IDialogState {
    isOpen: boolean;
    title: string;
    message: string;
}

const initialState: IDialogState = {
    isOpen: false,
    title: '',
    message: '',
};

export const dialogReducer = (state = initialState, action: IOpenDialogAction | ICloseDialogAction): IDialogState => {
    switch (action.type) {
        case 'DIALOG_OPEN':
            const { message, title } = action.payload;
            return {
                ...state,
                isOpen: true,
                message,
                title
            }
        case 'DIALOG_CLOSE':
            return {
                ...state,
                isOpen: false
            }
    }
    return state;
};