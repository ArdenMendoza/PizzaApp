import React from 'react';
import { Card } from '@material-ui/core';

interface Props {
    pageTitle: string;
    menuItems: { menuLabel: string; menuImageUrl: string }[];
    onMenuItemClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    selectedItemLabel: string;
}

const getIsSelectedClassName = (itemLabel: string, selectedLabel: string): string => itemLabel === selectedLabel ? 'cardOption cardSelected' : 'cardOption';

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

