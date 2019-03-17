import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

function InfoBox(props) {
    return (
        <div className='info-box'>
            <Row top='xs' center='xs'>
                <Col xs={4}>
                    <button onClick={()=>props.getInfo(['requests', 'vacation'])}>
                        Godišnji odmor <br/>
                        <span className='blue'>10 dana</span>
                    </button>
                </Col>
                <Col xs={4}>
                    <button onClick={()=>props.getInfo(['requests', 'earned'])}>
                        Prekovremeni rad <br/>
                        <span className='blue'>5 h i 10 min</span>
                    </button>
                </Col>
                <Col xs={4}>
                    <button onClick={()=>props.getInfo(['requests', 'sentRequests'])}>
                        Poslati zahtevi <br/>
                        <span className='blue'>7 / 10</span>
                    </button>
                </Col>
            </Row>
        </div>
    )    
}

export default InfoBox;