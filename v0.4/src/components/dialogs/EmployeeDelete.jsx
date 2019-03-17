import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

function EmployeeDelete(props) {
    return (
        <div>
            {props.emp ?
                <div>
                    <Row center='xs'>
                        <Col xs={12}>
                            <p>
                                Da li ste sigurni da želite da obrišete zaposlenog <br />
                                <span className='blue'>{props.emp.fname} {props.emp.lname}</span> <br />
                                iz baze podataka? <br />
                            </p>
                            <p>
                                Postupak je nemoguće poništiti.
                            </p>
                        </Col>
                    </Row>
                    <Row center='xs'>
                        <Col xs={12}>
                            <p><button className='full'>POTVRDI</button></p>
                        </Col>
                    </Row>
                </div>
                : null
            }
        </div>
    )
}

export default EmployeeDelete;