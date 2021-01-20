import React, { Component } from 'react'
import { Segment, Header, Image} from 'semantic-ui-react'
import lplate from './lplateresized.png';


class Title extends Component {
    render() {
        return (
            <div>
                <Segment padded>
                    <Header as='h2' style={{fontSize: "1.5em"}}>
                        <Image src={lplate} size='huge'/> License Plate Database
                    </Header>
                </Segment>
            </div>
        )
    }
}

export default Title

