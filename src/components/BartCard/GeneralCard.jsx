import React, {useRef} from "react";
import BartGeneralHeaderCard from "./BartGeneralHeaderCard";
import {makeStyles} from "@material-ui/core/styles";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import styles from "assets/jss/material-dashboard-react/components/generalTile.js";
import {Clickable} from "react-clickable";
import {BooleanDialog} from "../BartDialogs/BooleanDialog";
import {HomeComponent} from "../../index";
import {UpdateHomeForm} from "../Forms/Edit/UpdateHomeForm";
import {UpdateRoomForm} from "../Forms/Edit/UpdateRoomForm";
import {AddDeviceToRoom} from "../BartDialogs/AddDeviceToRoom";
import BartGeneralFooterCard from "./BartGeneralFooterCard";
import {InviteUserToHome} from "../BartDialogs/InviteUserToHome";
import Conditional from "../Authorization/Conditional";

const useStyles = makeStyles(styles);

export default function GeneralCard(props) {
    const classes = useStyles();
    
    const refDelete = useRef(null);
    const refEdit = useRef(null);
    const refAddDevice = useRef(null);
    const refInviteUser = useRef(null);

    const {type} = props;

    const handleEdit = () => {
        refEdit.current.openForm();
    };

    const handleDelete = () => {
        refDelete.current.openDialog()
    };

    // ROOM
    const handleAddDevice = () => {
        refAddDevice.current.openDialog();
    };

    // HOME
    const handleInviteUser = () => {
        refInviteUser.current.openDialog();
    };

    const onSelect = () => {
        if (props.onClick !== undefined) {
            props.onClick();
            return;
        }
        console.log('Item selected!');
    };


    const getEditForm = () => {
        switch (type) {
            case HomeComponent.HOME:
                return (<UpdateHomeForm ref={refEdit} {...props}/>);
            case HomeComponent.USER:
                break;
            case HomeComponent.ROOM:
                return (<UpdateRoomForm ref={refEdit} {...props}/>);
            case HomeComponent.DEVICE:
                break;
        }
    };

    return (
        <GridItem xs={12} sm={6} md={3}>
            <BooleanDialog ref={refDelete} type={type} {...props}/>
            {getEditForm()}

            <Conditional condition={type === HomeComponent.HOME}>
                <InviteUserToHome ref={refInviteUser} {...props}/>
            </Conditional>

            <Conditional condition={type === HomeComponent.ROOM}>
                <AddDeviceToRoom ref={refAddDevice} {...props}/>
            </Conditional>

            <Clickable onClick={() => onSelect()}>
                <Card className={classes.container}>
                    <BartGeneralHeaderCard title={props.title} active={props.active} color={props.color}
                                           displayActivity={props.displayActivity} {...props}/>

                    <CardFooter stats/>
                    {props.children}

                    <BartGeneralFooterCard handleAddDevice={handleAddDevice} handleEdit={handleEdit}
                                           handleDelete={handleDelete}
                                           handleInviteUser={handleInviteUser}{...props}/>
                </Card>
            </Clickable>
        </GridItem>
    );
}