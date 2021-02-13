import React, { Component } from 'react'
import { Card, Segment } from 'semantic-ui-react'
import Chart from '../../components/Chart'
import axios from 'axios';


class Home extends Component {

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

        var startDate = new Date("2021-01-01");
        var endDate = new Date("2021-02-01");

        const totalVisits = () => {
            const content = this.state.visits;
            const contentLength = Object.keys(content).length;
            return contentLength;
        }

        const visitsThisMonth = () => {
            const content = this.state.visits;
            const contentThisMonth = content.filter(function (x) {
                var hitDates = x.dateTime.$date || {};
                hitDates = Object.keys(hitDates);
                console.log(hitDates);

                hitDates = hitDates.map(function(date) { return new Date(date); });
                var hitDateMatches = hitDates.filter(function(date) {return date >= startDate && date <= endDate });
                return hitDateMatches.length>0;
            })
            console.log(contentThisMonth);
            return contentThisMonth;
        }

        const totalCustomers = () => {
            const content = this.state.customers;
            const contentLength = Object.keys(content).length;
            return contentLength;
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
                            <Card.Description><p className="cardDescription">+14%</p></Card.Description>
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
                            <Card.Header><p className="cardHeader">+8</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Customers This Week</p></Card.Meta>
                            <Card.Description><p className="cardDescription">+16%</p></Card.Description>
                        </Card.Content>   
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header><p className="cardHeader">86%</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Of Visits are from returning Customers</p></Card.Meta>
                            <Card.Description><p className="cardDescription">This week</p></Card.Description>
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
                        <Chart />   
                    </Card>
                    <Card>
                        <Chart />   
                    </Card>
                </Card.Group>
              </div>
        )
    }
}

export default Home

