import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import { Row, Col } from 'react-flexbox-grid';
import WorkHours from "../components/WorkHours";
import Requests from '../components/Requests';
import Trips from '../components/Trips';
import View from '../components/View';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import CalendarToday from '@material-ui/icons/CalendarToday'

import CustomDialog from '../components/Dialog';
import Preferences from '../components/dialogs/Preferences';
import InfoBox from '../components/InfoBox';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

function Home() {
    const [info, setInfo] = useState(['workHours']);
    const [times, setTimes] = useState()
    const [view, setView] = useState();
    const [anchorEl, setAnchorEl] = useState(null);

    const matches = useMediaQuery('(min-width:768px)');
    const [showLeft, setShowLeft] = useState(false);

    const [showDialgoPreferences, setShowDialogPreferences] = useState(false);

    const user = JSON.parse(localStorage.getItem('employee'));

    function getInfo(arr) {
        setAnchorEl(null);
        setInfo(arr);
    }

    function getTimes(arr) {
        setInfo([arr[0], arr[1], null, null]);
        setTimes([arr[2], arr[3]]);
    }

    function logout() {
        localStorage.removeItem('employee');
    }

    useEffect(() => {
        switch (info[0]) {
            default: setView(<WorkHours getTimes={arr => getTimes(arr)} />); break;
            case 'workHours': setView(<WorkHours getTimes={arr => getTimes(arr)} />); break;
            case 'requests': setView(<Requests info={info} times={times ? times : null} />); break;
            case 'trips': setView(<Trips info={info} />); break;
        }
    })

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <Row className='header' middle='xs'>
                        <Col xs={6} className='blue'>
                            {user ? user.first_name + ' ' + user.last_name : 'Ime Prezime'}
                        </Col>
                        <Col xs={6} align='right'>
                            <button style={{display: matches ? 'none' : 'inline'}} className='icon' onClick={() => setShowLeft(!showLeft)}>
                                <CalendarToday fontSize='small' />
                            </button>
                            <button
                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={e => setAnchorEl(e.currentTarget)}
                                className='icon'
                            >
                                <MenuIcon fontSize='small' />
                            </button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={e => setAnchorEl(null)}
                            >
                                <ul>
                                    <li>
                                        <button className={info[0] === 'workHours' ? 'flat blue' : 'flat'} onClick={() => getInfo(['workHours', null, info[2], info[3]])}>
                                            Unos radnog vremena
                                            </button>
                                    </li>
                                    <li>
                                        <button className={info[0] === 'requests' ? 'flat blue' : 'flat'} onClick={() => getInfo(['requests', null], info[2], info[3])}>
                                            Zahtevi
                                            </button>
                                    </li>
                                    <li>
                                        <button className={info[0] === 'trips' ? 'flat blue' : 'flat'} onClick={() => getInfo(['trips', null, info[0], info[1]])}>
                                            Službena putovanja
                                            </button>
                                    </li>
                                    <hr className='blue' />
                                    <li>
                                        <a className='flat' href="/employees">Zaposleni</a>
                                    </li>
                                    <li>
                                        <a className='flat' href='/holidays'>Unos neradnih dana</a>
                                    </li>
                                    <li>
                                        <a className='flat' href="/requests">Pregled zahteva</a>
                                    </li>
                                    <hr className='blue' />
                                    <li>
                                        <button className='flat' onClick={() => setShowDialogPreferences(true)}>
                                            Podešavanja
                                        </button>
                                    </li>
                                    <li>
                                        <a className='flat' href='/login' onClick={() => logout()}>Odjavi se</a>
                                    </li>
                                </ul>
                            </Menu>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}><hr className='blue' /></Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={5} style={{ display: showLeft || matches ? 'block' : 'none' }}>
                    <Calendar
                        type='many'
                        getInfo={arr => getInfo(arr)}
                    />
                    <InfoBox
                        getInfo={arr => getInfo(arr)}
                    />
                </Col>
                
                <Col xs={12} md={6} mdOffset={1}>
                    <View children={view} />
                </Col>
            </Row>

            <CustomDialog
                open={showDialgoPreferences}
                onClose={() => setShowDialogPreferences(false)}
                children={<Preferences />}
            />
        </div>
    )
}

export default Home;