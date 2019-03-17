import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import AccessTime from '@material-ui/icons/AccessTime';

function WorkHours(props) {
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [startWork, setStartWork] = useState('');
    const [endWork, setEndWork] = useState('');
    const [overtime, setOvertime] = useState('');
    const [saved, setSaved] = useState(false);

    function setTime(x) {
        var d = new Date();
        var hours = d.getHours();
        if (hours < 10) hours = '0' + hours;
        var mins = d.getMinutes();
        if (mins < 10) mins = '0' + mins;
        switch (x) {
            default: return;
            case 0: setStartDay(hours + ':' + mins); break;
            case 1: setStartWork(hours + ':' + mins); break;
            case 2: setEndWork(hours + ':' + mins); break;
            case 3: setEndDay(hours + ':' + mins); break;
        }
    }

    function changeTime(time, x) {
        switch (x) {
            default: return;
            case 0: setStartDay(time); break;
            case 1: setStartWork(time); break;
            case 2: setEndWork(time); break;
            case 3: setEndDay(time); break;
        }
    }

    useEffect(() => {
        if (startWork && endWork) {
            var start = parseInt(startWork[0] + startWork[1]) * 60 + parseInt(startWork[3] + startWork[4]);
            var end = parseInt(endWork[0] + endWork[1]) * 60 + parseInt(endWork[3] + endWork[4]);
            if (end - start > 480) {
                setOvertime(end - start - 480);
            }
            else setOvertime(null)
        }
        else return;
    })

    function formatOvertime() {
        if (overtime < 60) return <span className='blue'>{overtime} minut(a)</span>
        else {
            var h = Math.floor(overtime / 60);
            var m = Math.round((overtime / 60 - h) * 60);
            return <span className='blue'>{h} h {m > 0 ? 'i ' + m + 'min' : ""}</span>
        }
    }

    function saveTimes() {
        setSaved(true);
    }

    function sendInfo () {
        props.getTimes(['requests', 'earned', startWork, endWork])
    }
 
    return (
        <div>
            <Row middle='xs'>
                <Col xs={4}>
                    <p>
                        Dolazak na posao
                        </p>
                </Col>
                <Col xs={8}>
                    <p>
                        <input required value={startDay} onChange={e => changeTime(e.target.value, 0)} type="time" />
                        <button className='icon' onClick={() => setTime(0)}><AccessTime fontSize="small" /></button>
                    </p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={4}>
                    <p>
                        Početak rada
                        </p>
                </Col>
                <Col xs={8}>
                    <p>
                        <input required value={startWork} onChange={e => changeTime(e.target.value, 1)} type="time" />
                        <button className='icon' onClick={() => setTime(1)}><AccessTime fontSize="small" /></button>
                    </p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={4}>
                    <p>
                        Kraj rada
                        </p>
                </Col>
                <Col xs={8}>
                    <p>
                        <input required value={endWork} onChange={e => changeTime(e.target.value, 2)} type="time" />
                        <button className='icon' onClick={() => setTime(2)}><AccessTime fontSize="small" /></button>
                    </p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={4}>
                    <p>
                        Odlazak sa posla
                        </p>
                </Col>
                <Col xs={8}>
                    <p>
                        <input required value={endDay} onChange={e => changeTime(e.target.value, 3)} type="time" />
                        <button className='icon' onClick={() => setTime(3)}><AccessTime fontSize="small" /></button>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <p>
                        <button onClick={() => saveTimes()} className='full' disabled={!startDay && !startWork && !endWork && !endDay}>
                            SAČUVAJ
                                </button>
                    </p>
                </Col>
            </Row>
            <Row style={{ visibility: overtime ? 'visible' : 'hidden' }}>
                <Col xs={12}>
                    <p>Ostvarili ste {formatOvertime()} prekovremenog rada.</p>
                    <p><button className='full' disabled={!saved} onClick={()=>sendInfo()}>
                        FORMIRAJ ZAHTEV
                    </button></p>
                </Col>
            </Row>
            {/* <Row>
                <Col xs={12}>
                    <p>Predstojeći praznici:</p>
                    <p>
                        <ul>
                            <li>21.6.1994. Bogojavljanje</li>
                            <li>21.6.1994. Bogojavljanje</li>
                            <li>21.6.1994. Bogojavljanje</li>
                            <li>21.6.1994. Bogojavljanje</li>
                        </ul>
                    </p>
                </Col>
            </Row> */}
        </div>
    )
}

export default WorkHours;