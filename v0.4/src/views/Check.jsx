import React, { useState } from 'react';
function Check() {


    const [man, setMan] = useState();

    function getManagers() {
        fetch('http://localhost:8000/controller/routing.php?table=manager&action=getWorkers', {
            method: 'post'
        }).then(function (res) {
            return res.json()
        }).then(function(json) {
            setMan(json);
        })
    }

    return (
        <div onload={getManagers()}>
            <ul>
            {man ?   
                man.map((manager) => {
                    return <li>
                        {manager.id} {manager.first_name}
                    </li>
                })
                : null
            }
            </ul>
        </div>
    )
}

export default Check