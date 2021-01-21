import React, { Component } from 'react'
import { Card, Segment } from 'semantic-ui-react'
import Chart from '../../components/Chart'


class Home extends Component {

    render() {
        return (
            <div className="view">
                <Card.Group itemsPerRow={6}>
                    <Card>
                        <Card.Content>
                            <Card.Header><p className="cardHeader">42</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Total Visits</p></Card.Meta>
                            <Card.Description><p className="cardDescription">+7%</p></Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header><p className="cardHeader">84</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Total Customers</p></Card.Meta>
                            <Card.Description><p className="cardDescription">+14%</p></Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>                     
                        <Card.Content>
                            <Card.Header><p className="cardHeader">12</p></Card.Header>
                            <Card.Meta><p className="cardMeta">New Customers this week</p></Card.Meta>
                            {/* <Card.Description><p className="cardDescription">This week</p></Card.Description> */}
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header><p className="cardHeader">+8</p></Card.Header>
                            <Card.Meta><p className="cardMeta">Visit from last week</p></Card.Meta>
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

