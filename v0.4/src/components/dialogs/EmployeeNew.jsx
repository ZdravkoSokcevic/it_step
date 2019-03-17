import React, { useState } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import InputImage from '../ImageInput';

function EmployeeNew(props) {

    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [uname, setUname] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [pass1, setPass1] = useState();
    const [pos, setPos] = useState('worker');
    const [man, setMan] = useState();

    const [manList, setManList] = useState([]);

    const [error, setError] = useState(false);

    function getManagers() {
        fetch('http://localhost:8000/controller/getManagers.php', {
            method: 'post'
        }).then(function (res) {
            return res.json()
        }).then(function (json) {
            setManList(json);
        })
    }

    function createEmployee() {

        if (pass !== pass1 || !fname || !lname || !uname || !email || !pass)
            setError(true);
        else {
            var user = {
                firstname: fname,
                lastname: lname,
                type: pos,
                manager: man,
                username: uname,
                email: email,
                password: pass,
                picture: null
            }

            fetch('http://localhost:8000/controller/insertWorker.php', {
                method: 'post',
                body: JSON.stringify(user)
            }).then(function (res) {
                return res.json()
            }).then(function (json) {
                console.log(json)
            })

            props.closeDialog();
        }
    }

    return (
        <div className='employee-new'>
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
                        <input type="text" value={fname} onChange={e => setFname(e.target.value)} />
                    </p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={6}><p>Prezime</p></Col>
                <Col xs={6} align='center'>
                    <p>
                        <input type="text" value={lname} onChange={e => setLname(e.target.value)} />
                    </p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={6}><p>Korisničko ime</p></Col>
                <Col xs={6} align='center'>
                    <p>
                        <input type="text" value={uname} onChange={e => setUname(e.target.value)} />
                    </p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={6}><p>Email</p></Col>
                <Col xs={6} align='center'>
                    <p>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={6}><p>Lozinka</p></Col>
                <Col xs={6} align='center'>
                    <p>
                        <input type="password" value={pass} onChange={e => setPass(e.target.value)} />
                    </p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={6}><p>Ponovljena lozinka</p></Col>
                <Col xs={6} align='center'>
                    <p>
                        <input type="password" value={pass1} onChange={e => setPass1(e.target.value)} />
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
                        <select value={man} onChange={e => setMan(e.target.value)} onClick={() => getManagers()}>
                            <option value={null}></option>
                            {manList ?
                                manList.map((manager, i) => {
                                    return <option key={i} value={manager.id}>
                                        {manager.first_name} {manager.last_name}
                                    </option>
                                })
                                : null
                            }
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
                    <p><button className='full' onClick={() => createEmployee()}>POTVRDI</button></p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <p align='center' style={{ display: error ? 'block' : 'none' }} className='error'>Došlo je do greške. Proverite unete podatke.</p>
                </Col>
            </Row>
        </div>
    )
}

export default EmployeeNew;