import React, { Component } from 'react'
import { Header, Image} from 'semantic-ui-react'
import lplate from './lplateresized.png';


class Title extends Component {
    render() {
        return (
            <div className="title">
                    <Header as='h2' style={{fontSize: "1.5em"}}>
                        <Image src={lplate} size='huge'/> License Plate Database
                    </Header>
            </div>
        )
    }
}

export default Title

