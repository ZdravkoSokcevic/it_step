import React, { useState } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import InputImage from '../ImageInput';

function EmployeeEdit(props) {
    const [fname, setFname] = useState(props.emp ? props.emp.fname : null);
    const [lname, setLname] = useState(props.emp ? props.emp.lname : null);
    const [uname, setUname] = useState(props.emp ? props.emp.uname : null);
    const [email, setEmail] = useState(props.emp ? props.emp.email : null);
    const [pos, setPos] = useState(props.emp ? props.emp.pos : null);
    const [man, setMan] = useState(props.emp ? props.emp.man : null);

    return (
        <div>
            {props.emp ?
                <div>
                    <Row middle='xs' center='xs'>
                        <Col xs={12} align='center'>
                            <InputImage
                                height="100px"
                            />
                        </Col>
                    </Row>
                    <Row middle='xs'>
                        <Col xs={6}><p>Ime</p></Col>
                        <Col xs={6} align='center'>
                            <p>
                                <input value={fname} onChange={e => setFname(e.target.value)} type="text" />
                            </p>
                        </Col>
                    </Row>
                    <Row middle='xs'>
                        <Col xs={6}><p>Prezime</p></Col>
                        <Col xs={6} align='center'>
                            <p>
                                <input value={lname} onChange={e => setLname(e.target.value)} type="text" />
                            </p>
                        </Col>
                    </Row>
                    <Row middle='xs'>
                        <Col xs={6}><p>Korisničko ime</p></Col>
                        <Col xs={6} align='center'>
                            <p>
                                <input value={uname} onChange={e => setUname(e.target.value)} type="text" />
                            </p>
                        </Col>
                    </Row>
                    <Row middle='xs'>
                        <Col xs={6}><p>Email</p></Col>
                        <Col xs={6} align='center'>
                            <p>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                            </p>
                        </Col>
                    </Row>
                    <Row middle='xs'>
                        <Col xs={6}><p>Pozicija</p></Col>
                        <Col xs={6} align='center'>
                            <p>
                                <select value={pos} onChange={e => setPos(e.target.value)}>
                                    <option value="worker">Radnik</option>
                                    <option value="manager">Menadžer</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </p>
                        </Col>
                    </Row>
                    <Row middle='xs'>
                        <Col xs={6}><p>Menadžer</p></Col>
                        <Col xs={6} align='center'>
                            <p>
                                <select value={man} onChange={e => setMan(e.target.value)}>
                                    <option value="Mirko Petrovic">Mirko Petrovic</option>
                                    <option value="Janko Djukic">Janko Djukic</option>
                                </select>
                            </p>
                        </Col>
                    </Row>
                    <Row middle='xs'>
                        <Col xs={6}><p>Staž</p></Col>
                        <Col xs={6} align='center'>
                            <p>
                                <input type="number" />
                            </p>
                        </Col>
                    </Row>
                    <Row middle='xs' center='xs'>
                        <Col xs={12}>
                            <button className='full'>POTVRDI</button>
                        </Col>
                    </Row>
                </div>
                : null}
        </div>
    )
}

export default EmployeeEdit;