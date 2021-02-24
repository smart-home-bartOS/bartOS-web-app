import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import {SemipolarLoading} from "react-loadingg";

import avatar from "../../assets/img/avatar.jpeg";
import useStores from "../../hooks/useStores";
import {useObserver} from "mobx-react-lite";
import {Typography} from "@material-ui/core";
import {RoutePages} from "../../routes";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
    const classes = useStyles();
    const {authStore, uiStore} = useStores();

    React.useEffect(() => {
        authStore.getUserInfo();
    });

    React.useEffect(() => {
        uiStore.setActualPage(RoutePages.USER_PROFILE);
    }, [uiStore]);

    return useObserver(() => {
        const {user, isAuthenticated} = authStore;

        const handleEdit = () => {
            authStore.edit();
        };

        const showUserProperty = () => {
            if (user) {
                return (
                    <div>
                        <Typography variant={"h4"}>{user.name || "Undefined name"}</Typography>
                        <h4>Email: {user.email || "Undefined email"}</h4>
                        <h5>ID: {user.sub || "Undefined ID"}</h5>
                    </div>)
            }
        };

        if (isAuthenticated) {
            return (
                <>
                    <GridContainer justify={"center"}>
                        <GridItem xs={12} sm={12} md={6}>
                            <Card profile>
                                <CardAvatar profile>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img src={avatar} alt="..."/>
                                    </a>
                                </CardAvatar>
                                <CardBody profile>
                                    {showUserProperty()}

                                     <p>{authStore.getToken() || "Undefined token"}</p>

                                    <Button color="primary" round onClick={handleEdit}>
                                        EDIT
                                    </Button>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </>
            );
        } else {
            return (<SemipolarLoading/>);
        }
    });
}
