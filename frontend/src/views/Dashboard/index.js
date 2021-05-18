import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import Chart from '../../components/Chart'
import axios from 'axios';


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customers : [],
            visits: []
        };
    }

        componentDidMount() {
            let one = "http://localhost:9000/customers";
            let two = "http://localhost:9000/visits";
            const requestOne = axios.get(one);
            const requestTwo = axios.get(two);
    
            axios  
                .all([requestOne, requestTwo])
                .then(
                    axios.spread((...responses) => {
                        this.setState({ customers : responses[0].data, visits : responses[1].data });
                    })
                                    )
                .catch(errors => {
                    console.log(errors);
                })
            }
   

    render() {

        var startDate = "2021-01-01T20:17:42.000Z";
        var endDate = "2021-01-31T11:13:24.000Z";

        const totalVisits = () => {
            const content = this.state.visits;
            const contentLength = Object.keys(content).length;
            return contentLength;
        }

        const visitsThisMonth = () => {
            const content = this.state.visits;
            var contentThisMonth = content.filter(function(obj) {
                return obj.dateTime.$date >= startDate && obj.dateTime.$date <= endDate;
            });
            const contentLength = Object.keys(contentThisMonth).length;
            console.log(contentLength);
            return contentLength;
        }

        const totalCustomers = () => {
            const content = this.state.customers;
            const contentLength = Object.keys(content).length;
            return contentLength;
        }

        function getDaysInMonth(month, year) {
            let date = new Date(year, month, 1);
            let days = [];
            while (date.getMonth() === month) {
              days.push(new Date(date));
              date.setDate(date.getDate() + 1);
            }
            //wow this code is horrible. but it works. and if it works it works!
            let numberOfDays = Object.keys(days).map(x => parseInt(x));
            let numberofDaysAddOne = numberOfDays.map (x => x + 1 );
            let numberofDaysAddOneString = numberofDaysAddOne.map (x => x.toString());
            return numberofDaysAddOneString;
          }

        



        return (
            <div className="view">
                <Card.Group itemsPerRow={6}>
                    <Card>
                        <Card.Content>
                            <Card.Header><p className="cardHeader">{ totalVisits() }</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Total Visits</p></Card.Meta>
                            <Card.Description><p className="cardDescription"></p></Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header><p className="cardHeader">{ visitsThisMonth() }</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Visits This Month</p></Card.Meta>
                            {/* <Card.Description><p className="cardDescription">+14%</p></Card.Description> */}
                        </Card.Content>
                    </Card>
                    <Card>                     
                        <Card.Content>
                            <Card.Header><p className="cardHeader">{ totalCustomers() }</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Total Customers</p></Card.Meta>
                            {/* <Card.Description><p className="cardDescription">This week</p></Card.Description> */}
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header><p className="cardHeader"></p></Card.Header>
                            <Card.Meta><p className="cardMeta">New Customers This Week (can't do this one with fake data)</p></Card.Meta>
                            {/* <Card.Description><p className="cardDescription">+16%</p></Card.Description> */}
                        </Card.Content>   
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header><p className="cardHeader">35%</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Of Visits are from returning Customers this month</p></Card.Meta>
                            {/* <Card.Description><p className="cardDescription">This week (this not done)</p></Card.Description> */}
                        </Card.Content>   
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header><p className="cardHeader">16%</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Customer retention rate</p></Card.Meta>
                            {/* <Card.Description><p className="cardDescription">This week</p></Card.Description> */}
                        </Card.Content>   
                    </Card>
                </Card.Group>

                <Card.Group itemsPerRow={2}>
                    <Card>
                        <Chart label= {getDaysInMonth(0, 2020)} />   
                    </Card>
                    <Card>
                        <Chart />   
                    </Card>
                </Card.Group>
              </div>
        )
    }
}

export default Dashboard

