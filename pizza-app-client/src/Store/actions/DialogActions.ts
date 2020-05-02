import { Action } from 'redux';

export interface ISimpleAction extends Action { type: string; }
export interface IAction<P> extends ISimpleAction { payload: P; }

export type IOpenDialogPayload = { title: string; message: string; }
export interface IOpenDialogAction extends IAction<IOpenDialogPayload> { type: 'DIALOG_OPEN'; }
export const openDialog = (payload: IOpenDialogPayload): IOpenDialogAction => ({
    type: 'DIALOG_OPEN',
    payload
});

export interface ICloseDialogAction extends ISimpleAction { type: 'DIALOG_CLOSE'; }
export const closeDialog = (): ICloseDialogAction => ({
    type: 'DIALOG_CLOSE',
});