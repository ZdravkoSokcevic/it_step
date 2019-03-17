import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';

function Calendar(props) {
    var date = new Date();
    var n = 1;
    var field;
    const weeks = [0, 1, 2, 3, 4, 5];
    const days = [0, 1, 2, 3, 4, 5, 6];
    var currDay = date.getDate();

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [currMonth, setCurrMonth] = useState(date.getMonth());
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [firstDay, setFirstDay] = useState(new Date(currYear, currMonth, 1).getDay());
    const [numberDays, setNumberDays] = useState(new Date(currYear, currMonth + 1, 0).getDate());

    const [anchorEl, setAnchorEl] = useState(null);

    function monthDown() {
        if (currMonth > 0) {
            var newMonth = currMonth - 1;
            var newFirsDay = new Date(currYear, newMonth, 1).getDay();
            if (newFirsDay === 0) newFirsDay = 7;
            setCurrMonth(newMonth);
            setFirstDay(newFirsDay);
            setNumberDays(new Date(currYear, newMonth + 1, 0).getDate());
        }
        else {
            var newYear = currYear - 1;
            newFirsDay = new Date(newYear, 11, 1).getDay();
            if (newFirsDay === 0) newFirsDay = 7;
            setCurrMonth(11);
            setCurrYear(newYear);
            setFirstDay(newFirsDay);
        }
    }

    function monthUp() {
        if (currMonth < 11) {
            var newMonth = currMonth + 1;
            var newFirsDay = new Date(currYear, newMonth, 1).getDay();
            if (newFirsDay === 0) newFirsDay = 7;
            setCurrMonth(newMonth);
            setFirstDay(newFirsDay);
            setNumberDays(new Date(currYear, newMonth + 1, 0).getDate());
        }
        else {
            var newYear = currYear + 1;
            newFirsDay = new Date(newYear, 0, 1).getDay();
            if (newFirsDay === 0) newFirsDay = 7;
            setCurrMonth(0);
            setCurrYear(newYear);
            setFirstDay(newFirsDay);
        }
    }

    function yearDown() {
        var newYear = currYear - 1;
        var newFirsDay = new Date(newYear, currMonth, 1).getDay();
        if (newFirsDay === 0) newFirsDay = 7;
        setCurrYear(newYear);
        setFirstDay(newFirsDay);
        setNumberDays(new Date(newYear, currMonth + 1, 0).getDate());

    }

    function yearUp() {
        var newYear = currYear + 1;
        var newFirsDay = new Date(newYear, currMonth, 1).getDay();
        if (newFirsDay === 0) newFirsDay = 7;
        setCurrYear(newYear);
        setFirstDay(newFirsDay);
        setNumberDays(new Date(newYear, currMonth + 1, 0).getDate());
    }

    function monthName(month) {
        switch (month) {
            default: return 'MONTH'
            case 0: return 'JAN';
            case 1: return 'FEB';
            case 2: return 'MAR';
            case 3: return 'APR';
            case 4: return 'MAJ';
            case 5: return 'JUN';
            case 6: return 'JUL';
            case 7: return 'AVG';
            case 8: return 'SEP';
            case 9: return 'OKT';
            case 10: return 'NOV';
            case 11: return 'DEC';
        }
    }

    function selectDate(week, day) {
        return new Date(currYear, currMonth, week * 7 + day - firstDay + 2);
    }

    function dateClick(week, day) {
        var selected = selectDate(week, day)
        if (props.type === 'one') {
            setStart(selected);
        }
        else if (props.type === 'many') {
            if (!start) {
                setStart(selected);
            }
            else if (start && start.toDateString() === selected.toDateString()) {
                setStart(null);
                setEnd(null);
            }
            else if (start && start < selected) {
                setEnd(selected);
            }
            else if (start && start > selected) {
                setStart(selected);
            }
        }
    }

    function ifSelected(week, day) {
        var that = selectDate(week, day);
        if ((start && start.toDateString() === that.toDateString()) || (start && end && start < that && that <= end))
            return 'selected';
        else return '';
    }

    function ifBefore() {
        var current = new Date();
        if (start && !end && start < current && start.toDateString() !== current.toDateString()) return true;
        else if (end && end < current && end.toDateString() !== current.toDateString()) return true;
        else return false;
    }

    function ifAfter() {
        var current = new Date();
        if (start && start > current) return true;
        else return false;
    }

    function ifCurrent() {
        var current = new Date();
        if (start && !end && start.toDateString() === current.toDateString()) return true;
        else return false;
    }

    function getInfo(arr) {
        setAnchorEl(null);
        props.getInfo(arr);
    }

    return (
        <div className='calendar'>
            <table>
                <thead>
                    <tr>
                        <th>
                            <button onClick={monthDown}>{'<'}</button>
                        </th>
                        <th className='blue'>
                            {monthName(currMonth)}
                        </th>
                        <th>
                            <button onClick={monthUp}>{'>'}</button>
                        </th>
                        <th></th>
                        <th>
                            <button onClick={yearDown}>{'<'}</button>
                        </th>
                        <th className='blue'>
                            {currYear}
                        </th>
                        <th>
                            <button onClick={yearUp}>{'>'}</button>
                        </th>
                    </tr>
                    <tr>
                        <th >PON</th>
                        <th >UTO</th>
                        <th >SRE</th>
                        <th >ČET</th>
                        <th >PET</th>
                        <th >SUB</th>
                        <th >NED</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        weeks.map((week, i) => {
                            return <tr key={i}>
                                {
                                    days.map((day, j) => {
                                        if ((week === 0 && day + 1 >= firstDay) || (week > 0 && n <= numberDays)) {
                                            if (currDay === n && currMonth === date.getMonth() && currYear === date.getFullYear())
                                                field = <td key={j}>
                                                    <button className={'current ' + ifSelected(i, j)} onClick={() => dateClick(i, j)}>{n}</button>
                                                </td>;
                                            else if (day === 5 || day === 6)
                                                field = <td key={j}>
                                                    <button className={'weekend ' + ifSelected(i, j)} onClick={() => dateClick(i, j)}>{n}</button>
                                                </td>;
                                            else
                                                field = <td key={j}>
                                                    <button className={ifSelected(i, j)} onClick={() => dateClick(i, j)}>{n}</button>
                                                </td>;
                                            n++;
                                            return field;
                                        }
                                        else return <td key={j}><button disabled></button></td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <center>
                <button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={e => setAnchorEl(e.currentTarget)}
                    className='full'
                    disabled={!start}
                >
                    FORMIRAJ ZAHTEV
                                                </button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={e => setAnchorEl(null)}
                >
                    <ul>
                        <li style={{ display: ifAfter() ? 'block' : 'none' }}>
                            <button className='flat' onClick={() => getInfo(['requests', 'dayOff', start, end])}>
                                Slobodni dani
                                                        </button>
                        </li>
                        <li style={{ display: ifCurrent() ? 'block' : 'none' }}>
                            <button className='flat' onClick={() => getInfo(['requests', 'earned', start, end])}>
                                Prekovremeni rad
                                                        </button>
                        </li>
                        <li style={{ display: ifAfter() ? 'block' : 'none' }}>
                            <button className='flat' onClick={() => getInfo(['requests', 'vacation', start, end])}>
                                Godišnji odmor
                                                        </button>
                        </li>
                        <li style={{ display: ifBefore() ? 'block' : 'none' }}>
                            <button className='flat' onClick={() => getInfo(['requests', 'retroactive', start, end])}>
                                Odsustvo
                                                        </button>
                        </li>
                        <li style={{ display: ifAfter() ? 'block' : 'none' }}>
                            <button className='flat' onClick={() => getInfo(['trips', 'trip', start, end])}>
                                Službeno putovanje
                                                        </button>
                        </li>
                        <li style={{ display: ifBefore() ? 'block' : 'none' }}>
                            <button className='flat' onClick={() => getInfo(['trips', 'refund', start, end])}>
                                Refundacija
                                                        </button>
                        </li>
                        <li>
                            <button className='flat' onClick={() => getInfo(['requests', 'other', start, end])}>
                                Ostalo
                                                        </button>
                        </li>
                    </ul>
                </Menu>
            </center>
        </div>
    )
}

export default Calendar;