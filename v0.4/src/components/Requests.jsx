import React, { useState, useEffect } from 'react';
import View from './View';
import { Row, Col } from 'react-flexbox-grid';

function Requests(props) {
    const [view, setView] = useState();
    const [x, setX] = useState(props.info[1] ? props.info[1] : 'earned');
    const [current, setCurrent] = useState(props.info[1] ? props.info[1] : null);

    useEffect(() => {
        if (current !== props.info[1] && props.info[1]) {
            setCurrent(props.info[1]);
            setX(props.info[1]);
        }
        switch (x) {
            default: setView(<Earned times={props.times ? props.times : null} />); break;
            case 'dayOff': setView(<DayOff dates={[props.info[2], props.info[3]]} />); break;
            case 'earned': setView(<Earned times={props.times ? props.times : null} />); break;
            case 'vacation': setView(<Vacation dates={[props.info[2], props.info[3]]} />); break;
            case 'retroactive': setView(<Retroactive dates={[props.info[2], props.info[3]]} />); break;
            case 'sentRequests': setView(<SentRequests />); break;
            case 'receivedRequests': setView(<ReceivedRequests />); break;
            case 'other': setView(<Other dates={[props.info[2], props.info[3]]} />); break;
        }
    })

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <button className={x === 'earned' ? 'flat blue' : 'flat'} onClick={() => setX('earned')}>
                        Prekovremeni rad
                            </button>
                    <button className={x === 'dayOff' ? 'flat blue' : 'flat'} onClick={() => setX('dayOff')}>
                        Slobodni dani
                            </button>
                    <button className={x === 'vacation' ? 'flat blue' : 'flat'} onClick={() => setX('vacation')}>
                        Godišnji odmor
                            </button>
                    <button className={x === 'retroactive' ? 'flat blue' : 'flat'} onClick={() => setX('retroactive')}>
                        Odsustvo
                            </button>
                    <button className={x === 'sentRequests' ? 'flat blue' : 'flat'} onClick={() => setX('sentRequests')}>
                        Poslati zahtevi
                            </button>
                    <button className={x === 'receivedRequests' ? 'flat blue' : 'flat'} onClick={() => setX('receivedRequests')}>
                        Pristigli zahtevi
                            </button>
                    <button className={x === 'other' ? 'flat blue' : 'flat'} onClick={() => setX('other')}>
                        Ostalo
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

function DayOff(props) {

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
                    <p>Početak</p>
                    <p><input type="date" value={formatDate(start)} onChange={e => setStart(e.target.value)} /></p>
                </Col>
                <Col xs={6}>
                    <p>Kraj</p>
                    <p><input type="date" value={formatDate(end)} onChange={e => setEnd(e.target.value)} /></p>
                </Col>
            </Row>
            <Row>
                <Col xs={8}>
                    <p><button className='full'>POŠALJI ZAHTEV</button></p>
                </Col>
            </Row>
        </div>
    )
}

function Earned(props) {

    function formatOvertime() {
        var overtime;
        var start = parseInt(props.times[0][0] + props.times[0][1]) * 60 + parseInt(props.times[0][3] + props.times[0][4]);
        var end = parseInt(props.times[1][0] + props.times[1][1]) * 60 + parseInt(props.times[1][3] + props.times[1][4]);
        if (end - start > 480) {
            overtime = end - start - 480;
            if (overtime < 60) return <span className='blue'>{overtime} min</span>
            else {
                var h = Math.floor(overtime / 60);
                var m = Math.round((overtime / 60 - h) * 60);
                return <span className='blue'>{h} h i {m} min</span>
            }
        }
        else return;
    }

    function getStart() {
        var start = parseInt(props.times[0][0] + props.times[0][1]) * 60 + parseInt(props.times[0][3] + props.times[0][4]);
        var time = start + 480;
        var h = Math.floor(time / 60);
        if (h < 10) h = '0' + h;
        var m = Math.round((time / 60 - h) * 60);
        if (m < 10) m = '0' + m;
        return h + ':' + m;
    }

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <p>Ukupno ste ostvarili <span className='blue'>x h i y min</span> prekovremenog rada.</p>
                    {props.times && props.times.length > 0 ? <p>Danas ste ostvarili {formatOvertime()} prekovremenog rada.</p> : <p>Danas niste ostvarili prekovremeni rad.</p>}
                </Col>
            </Row>
            {props.times && props.times.length > 0 ?
                <div>
                    <Row>
                        <Col xs={12}>
                            <p>Period prekovremenog rada</p>
                        </Col>
                        <Col xs={6}>
                            <p>Početak: <span className='blue'>{getStart()}</span></p>
                        </Col>
                        <Col xs={6}>
                            <p>Kraj: <span className='blue'>{props.times[0]}</span></p>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <p>Razlog prekovremenog rada</p>
                            <p><textarea></textarea></p>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <p><button className='full'>POŠALJI ZAHTEV</button></p>
                        </Col>
                    </Row>
                </div>
                : null
            }
        </div>
    )
}

function Vacation(props) {

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
                <Col xs={12}>
                    <p>Imate ukupno <span className='blue'>x dan(a)</span> godišnjeg odmora preostalo.</p>
                    <p>Ukupno ste ostvarili <span className='blue'>x dan(a)</span> prekovremenog rada.</p>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <p>Početak</p>
                    <p><input type="date" value={formatDate(start)} onChange={e => setStart(e.target.value)} /></p>
                </Col>
                <Col xs={6}>
                    <p>Kraj</p>
                    <p><input type="date" value={formatDate(end)} onChange={e => setEnd(e.target.value)} /></p>
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

function Retroactive(props) {

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
                    <p>Početak</p>
                    <p><input type="date" value={formatDate(start)} onChange={e => setStart(e.target.value)} /></p>
                </Col>
                <Col xs={6}>
                    <p>Kraj</p>
                    <p><input type="date" value={formatDate(end)} onChange={e => setEnd(e.target.value)} /></p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <p>Razlog odsustva</p>
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

function SentRequests() {
    return (
        <div>
            <ul>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
            </ul>
        </div>
    )
}

function ReceivedRequests() {
    return (
        <div>
            <ul>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
                <li>Zahtev 1</li>
            </ul>
        </div>
    )   
}

function Other(props) {

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
                    <p>Početak</p>
                    <p><input type="date" value={formatDate(start)} onChange={e => setStart(e.target.value)} /></p>
                </Col>
                <Col xs={6}>
                    <p>Kraj</p>
                    <p><input type="date" value={formatDate(end)} onChange={e => setEnd(e.target.value)} /></p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <p>Razlog</p>
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

export default Requests;