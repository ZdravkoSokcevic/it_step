import React, { useState } from 'react';

import Edit from '@material-ui/icons/Edit';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import DeleteForever from '@material-ui/icons/DeleteForever';

import CustomDialog from '../components/Dialog';

import EmployeeNew from '../components/dialogs/EmployeeNew';
import EmployeeView from '../components/dialogs/EmployeeView';
import EmployeeEdit from '../components/dialogs/EmployeeEdit';
import EmployeeDelete from '../components/dialogs/EmployeeDelete';

function Employees() {
    const [showControl, setShowControl] = useState(null);

    const [showDialogNew, setShowDialogNew] = useState(false);
    const [showDialogView, setShodDialogView] = useState([false, null]);
    const [showDialogEdit, setShowDialogEdit] = useState([false, null]);
    const [showDialogDelete, setShowDialogDelete] = useState([false, null]);

    const [manList, setManList] = useState([]);

    const [search, setSearch] = useState('');
    const [position, setPosition] = useState('all');
    const [manager, setManager] = useState('all');

    const emp = [{
        id: 1,
        fname: 'Neko',
        lname: 'Neković',
        uname: 'nekonekovic',
        pos: 'worker',
        man: 'Mirko Petrović',
        email: 'nekonekoneko@gmail.com'
    }, {
        id: 2,
        fname: 'Janko',
        lname: 'Đukić',
        uname: 'jankodjukic',
        pos: 'manager',
        man: null,
        email: 'janko@gmail.com'
    }, {
        id: 3,
        fname: 'Đorđe',
        lname: 'Iliev',
        uname: 'djole',
        pos: 'worker',
        man: 'Janko Djukić',
        email: 'djole@gmail.com'
    }]

    function ifSearched(employee) {
        if ((employee.fname + ' ' + employee.lname + ' ' + employee.uname).toLowerCase().includes(search) || (employee.fname + ' ' + employee.lname + ' ' + employee.uname).includes(search) || (employee.fname + ' ' + employee.lname + ' ' + employee.uname).toUpperCase().includes(search))
            return true;
        else return false;
    }

    function ifPosition(employee) {
        if (employee.pos === position || position === 'all') return true;
        else return false;
    }

    function ifManager(employee) {
        if (employee.man === manager || manager === 'all') return true;
        else return false;
    }

    function ifVisible(employee) {
        if (ifSearched(employee) && ifPosition(employee) && ifManager(employee)) return true;
        else return false;
    }

    function displayPosition(empPos) {
        switch (empPos) {
            default: return;
            case 'worker': return 'Radnik';
            case 'manager': return 'Menadžer';
            case 'admin': return 'Administrator';
        }
    }

    function getManagers() {
        fetch('http://localhost:8000/controller/routing.php?table=manager&action=getWorkers', {
            method: 'post'
        }).then(function (res) {
            return res.json()
        }).then(function (json) {
            setManList(json);
        })
    }

    return (
        <div className='employees'>
            <table>
                <thead>
                    <tr>
                        <th colSpan='2'>
                            <input type="text" placeholder='Pretraga' onChange={e => setSearch(e.target.value)} />
                        </th>
                        <th >
                            <select onChange={e => setPosition(e.target.value)}>
                                <option value="all">Sve pozicije</option>
                                <option value="worker">Radnik</option>
                                <option value="manager">Menadžer</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </th>
                        <th >
                            <select onChange={e => setManager(e.target.value)} onClick={()=>getManagers()}>
                                <option value="all">Svi menadžeri</option>
                                {/* <option value="Mirko Petrovic">Mirko Petrovic</option>
                                <option value="Janko Djukic">Janko Djukic</option> */}
                                {manList ?
                                    manList.map((manager, i) => {
                                        return <option key={i} value={manager.first_name + ' ' + manager.last_name}>
                                            {manager.first_name} {manager.last_name}
                                        </option>
                                    })
                                    : null
                                }
                            </select>
                        </th>
                        <th><button onClick={() => setShowDialogNew(true)} className='full'>NOVI ZAPOSLENI</button></th>
                    </tr>
                    <tr align='left'>
                        <th>Ime i prezime</th>
                        <th>Korisničko ime</th>
                        <th>Pozicija</th>
                        <th>Menadžer</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        emp.map((emp, i) => {
                            return <tr key={i} style={{ display: ifVisible(emp) ? 'table-row' : 'none' }} onMouseEnter={() => setShowControl(emp.id)} onMouseLeave={() => setShowControl(null)}>
                                <td>{emp.fname} {emp.lname}</td>
                                <td>{emp.uname}</td>
                                <td>{displayPosition(emp.pos)}</td>
                                <td>{emp.man}</td>
                                <td align='center' style={{ visibility: showControl === emp.id ? 'visible' : 'hidden' }}>
                                    <button className='icon' onClick={() => setShodDialogView([true, emp])}>
                                        <RemoveRedEye fontSize='small' />
                                    </button>
                                    <button className='icon' onClick={() => setShowDialogEdit([true, emp])}>
                                        <Edit fontSize='small' />
                                    </button>
                                    <button className='icon red' onClick={() => setShowDialogDelete([true, emp])}>
                                        <DeleteForever fontSize='small' />
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

            <CustomDialog
                open={showDialogNew}
                onClose={() => setShowDialogNew(false)}
                children={<EmployeeNew closeDialog={() => setShowDialogNew(false)} />}
            />
            <CustomDialog
                open={showDialogView[0]}
                onClose={() => setShodDialogView([false, null])}
                children={<EmployeeView emp={showDialogView[1]} />}
            />
            <CustomDialog
                open={showDialogEdit[0]}
                onClose={() => setShowDialogEdit([false, null])}
                children={<EmployeeEdit emp={showDialogEdit[1]} />}
            />
            <CustomDialog
                open={showDialogDelete[0]}
                onClose={() => setShowDialogDelete([false, null])}
                children={<EmployeeDelete emp={showDialogDelete[1]} />}
            />
        </div>
    )
}

export default Employees;