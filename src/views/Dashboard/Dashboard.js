import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {useObserver} from "mobx-react-lite"
import homeImg from "../../assets/img/indexBackground.jpg";

import {bugs, server, website} from "variables/general.js";
import {completedTasksChart, dailySalesChart, emailsSubscriptionChart} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import MainDisplayCard from "../../components/BartCard/MainDisplayCard";
import useStores from "../../hooks/useStores";
import {Typography} from "@material-ui/core";
import BartOSTitle from "../../components/Typography/BartOSTitle";
import {RoutePages} from "../../routes";

const useStyles = makeStyles(styles);

export default function Dashboard() {
    const classes = useStyles();
    const {authStore, homeStore, uiStore} = useStores();

    React.useEffect(() => {
        uiStore.setActualPage(RoutePages.DASHBOARD);
    }, [uiStore]);

    React.useEffect(() => {
        authStore.initKeycloak();
        homeStore.getAllHomes();
    }, [authStore, homeStore]);

    const Backup = () => (
        <>
            <GridContainer>
                <MainDisplayCard title="Home 23" active message="Hey yooou" color="success"/>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Store/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Revenue</p>
                            <h3 className={classes.cardTitle}>$34,245</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <DateRange/>
                                Last 24 Hours
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="danger" stats icon>
                            <CardIcon color="danger">
                                <Icon>info_outline</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>Fixed Issues</p>
                            <h3 className={classes.cardTitle}>75</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <LocalOffer/>
                                Tracked from Github
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <Accessibility/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Followers</p>
                            <h3 className={classes.cardTitle}>+245</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update/>
                                Just Updated
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>

            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={dailySalesChart.data}
                                type="Line"
                                options={dailySalesChart.options}
                                listener={dailySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Daily Sales</h4>
                            <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory}/> 55%
                </span>{" "}
                                increase in today sales.
                            </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime/> updated 4 minutes ago
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="warning">
                            <ChartistGraph
                                className="ct-chart"
                                data={emailsSubscriptionChart.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                            <p className={classes.cardCategory}>Last Campaign Performance</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime/> campaign sent 2 days ago
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="danger">
                            <ChartistGraph
                                className="ct-chart"
                                data={completedTasksChart.data}
                                type="Line"
                                options={completedTasksChart.options}
                                listener={completedTasksChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Completed Tasks</h4>
                            <p className={classes.cardCategory}>Last Campaign Performance</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime/> campaign sent 2 days ago
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>


            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomTabs
                        title="Tasks:"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Bugs",
                                tabIcon: BugReport,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[0, 3]}
                                        tasksIndexes={[0, 1, 2, 3]}
                                        tasks={bugs}
                                    />
                                )
                            },
                            {
                                tabName: "Website",
                                tabIcon: Code,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[0]}
                                        tasksIndexes={[0, 1]}
                                        tasks={website}
                                    />
                                )
                            },
                            {
                                tabName: "Server",
                                tabIcon: Cloud,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[1]}
                                        tasksIndexes={[0, 1, 2]}
                                        tasks={server}
                                    />
                                )
                            }
                        ]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                            <p className={classes.cardCategoryWhite}>
                                New employees on 15th September, 2016
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="warning"
                                tableHead={["ID", "Name", "Salary", "Country"]}
                                tableData={[
                                    ["1", "Dakota Rice", "$36,738", "Niger"],
                                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                                ]}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    );

    const Welcome = () => {
        const useWeStyle = makeStyles(style => ({
            container: {
                width: "100%",
                height: "100%",
                textAlign: "center",
                justifyContent: "center",
                marginTop: "50px"
            },
            logo: {
                width: "55vh",
                height: "55vh"
            }
        }));

        const welStyle = useWeStyle();

        return (
            <>
                <div className={welStyle.container}>
                    <Typography variant={"h3"}> Welcome to Smart Home</Typography>
                    <BartOSTitle variant={"h1"} subVariant={"h1"}/>
                    <img className={welStyle.logo} src={homeImg} alt={"Home"}/>
                </div>
            </>
        );
    };

    const showWelcome = (state) => {
        return state ? <Welcome/> : <Backup/>;
    };


    return useObserver(() => {
        return (showWelcome(true));
    });
}
