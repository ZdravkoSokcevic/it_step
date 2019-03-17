import React, { useState, useEffect } from 'react';
import View from './View';
import { Col, Row } from 'react-flexbox-grid';
import InputImage from './ImageInput';


function Trips(props) {
    const [view, setView] = useState();
    const [x, setX] = useState(props.info[1] ? props.info[1] : 'trip');
    const [current, setCurrent] = useState(props.info[1] ? props.info[1] : null);

    useEffect(() => {
        if (current !== props.info[1] && props.info[1]) {
            setCurrent(props.info[1]);
            setX(props.info[1]);
        }
        switch (x) {
            default: setView(<Trip dates={[props.info[2], props.info[3]]} />); break;
            case 'trip': setView(<Trip dates={[props.info[2], props.info[3]]} />); break;
            case 'refund': setView(<Refund />); break;
        }

    })

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <button className={x === 'trip' ? 'flat blue' : 'flat'} onClick={() => setX('trip')}>
                        Službena putovanja
                </button>
                    <button className={x === 'refund' ? 'flat blue' : 'flat'} onClick={() => setX('refund')}>
                        Refundacija
                </button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <hr className='blue' />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <View children={view} />
                </Col>
            </Row>
        </div>
    )
}

function Trip(props) {

    const [start, setStart] = useState(props.dates[0]);
    const [end, setEnd] = useState(props.dates[1]);

    function formatDate(date) {
        if (date instanceof Date) {
            var y = date.getFullYear();
            var m = date.getMonth(); if (m < 10) m = '0' + m;
            var d = date.getDate(); if (d < 10) d = '0' + d;
            return y + '-' + m + '-' + d;
        }
        else return null;
    }

    return (
        <div>
            <Row>
                <Col xs={6}>
                    <p>Od</p>
                    <p><input type="date" value={formatDate(start)} onChange={e => setStart(e.target.value)} /></p>
                </Col>
                <Col xs={6}>
                    <p>Do</p>
                    <p><input type="date" value={formatDate(end)} onChange={e => setEnd(new Date(e.target.value))} /></p>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <p>Država</p>
                    <p><input type="text" /></p>
                </Col>
                <Col xs={6}>
                    <p>Grad</p>
                    <p><input type="text" /></p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <p>Razlog putovanja</p>
                    <p><textarea></textarea></p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <p><button className='full'>POŠALJI ZAHTEV</button></p>
                </Col>
            </Row>
        </div>
    )
}

function Refund() {
    return (
        <div>
            <Row>
                <Col xs={6}>
                    <p>Razlog refundacije</p>
                    <p>
                        <select>
                            <option value="">Razlog 1</option>
                            <option value="">Razlog 2</option>
                            <option value="">Razlog 3</option>
                            <option value="">Razlog 4</option>
                        </select>
                    </p>
                </Col>
                <Col xs={6}>
                    <p>Iznos</p>
                    <p><input type="number" /></p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <InputImage
                        height="80%"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <p><button className='full'>POŠALJI ZAHTEV</button></p>
                </Col>
            </Row>
        </div>
    )
}

export default Trips;