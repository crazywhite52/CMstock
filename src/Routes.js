import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import StockView from "./components/Stock1";
import StockView2 from "./components/Stock2";
import StockOnline from "./components/StockOnline";
import StockJib from "./components/StockJib";
import Login from "./components/FormLogin";
import Orderlist from "./components/Orderlist";

class Routes extends React.Component {
    render() {
        return (

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/stock1" component={StockView} />
                <Route exact path="/stock2" component={StockView2} />
                <Route exact path="/stockonline" component={StockOnline} />
                <Route exact path="/stockjib" component={StockJib} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/order" component={Orderlist} />
                <Route
                    render={function () {
                        return <h1>Not Found</h1>;
                    }}
                />
            </Switch>

        )
    }
}

export default Routes;