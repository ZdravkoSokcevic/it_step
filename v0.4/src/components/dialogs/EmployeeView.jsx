import React from 'react';

function EmployeeView(props) {

    function displayPosition() {
        switch (props.emp.pos) {
            default: return;
            case 'worker': return 'Radnik';
            case 'manager': return 'Menadžer';
            case 'admin': return 'Administrator';
        }
    }

    return (
        <div>
            {props.emp ?
                <div className='employee-view'>
                    <table>
                        <tbody>
                            <tr>
                                <td>Ime i prezime:</td>
                                <td className='blue'>{props.emp.fname} {props.emp.lname}</td>
                            </tr>
                            <tr>
                                <td>Korisničko ime:</td>
                                <td className='blue'>{props.emp.uname}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td className='blue'>{props.emp.email}</td>
                            </tr>
                            <tr>
                                <td>Pozicija:</td>
                                <td className='blue'>{displayPosition()}</td>
                            </tr>
                            {props.emp.man ?
                                <tr>
                                    <td>Menadžer:</td>
                                    <td className='blue'>{props.emp.man}</td>
                                </tr>
                                : null
                            }
                            <tr>
                                <td>Staž:</td>
                                <td className='blue'>5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                : null
            }
        </div>
    )
}

export default EmployeeView;