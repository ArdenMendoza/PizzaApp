import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { pizzaSize } from '../../api/model';
import { IPizzaAppState } from '../../Store/PizzaAppStore';
import * as OrderActions from '../../Store/actions/OrderActions';
import sizeSmall from '../../images/size_small.png';
import sizeMedium from '../../images/size_medium.png';
import sizeLarge from '../../images/size_large.png';

interface Props {
    pageTitle: string;
    menuItems: { menuLabel: string; menuImageUrl: string }[];
    onMenuItemClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    selectedItemLabel: string;
}

const getIsSelectedClassName = (itemLabel: string, selectedLabel: string): string => itemLabel == selectedLabel ? 'cardOption cardSelected' : 'cardOption';

export const OrderPanel: React.FunctionComponent<Props> = (props) => {
    const { pageTitle, menuItems, onMenuItemClick, selectedItemLabel } = props;
    return (
        <div className={'orderPage'}>
            <h1 className={'pageTitle'}>{pageTitle}</h1>
            <div style={{ height: 'calc(100% - 2em)', flex: 1 }}>
                <div style={{ display: 'flex', height: 'calc(100% - 30px)', padding: '10px' }}>
                    {
                        menuItems.map(m => {
                            return <Card onClick={onMenuItemClick} className={getIsSelectedClassName(m.menuLabel, selectedItemLabel)}>
                                <div className={'cardOptionImage'} style={{ backgroundImage: 'url(' + m.menuImageUrl + ')' }}>
                                </div>
                                <div className={'cardOptionLabel'}>{m.menuLabel}</div>
                            </Card>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

