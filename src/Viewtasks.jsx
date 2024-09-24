import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Viewtasks() {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    const getapidata = async () => {
        try {
            const token = localStorage.getItem('token');
            var result = await axios.get('https://fullstack-p2-be.onrender.com/viewtasks', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(result.data);
        } catch (error) {
            console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
        }
    }

    useEffect(() => {
        getapidata();
    }, [])

    const editdata = async (taskId) => {
        navigate(`/tasks/${taskId}`)
    }

    const deletedata = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://fullstack-p2-be.onrender.com/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getapidata();
        } catch (error) {
            console.error('Error deleting task:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    {tasks.map((data, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card mb-4" style={{ width: '22rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{data.tasks}</h5>
                                    <p className="card-text">{data.description}</p>
                                    <button className="btn btn-warning m-1" onClick={() => { editdata(data._id) }}>Edit</button>
                                    <button className="btn btn-danger m-1" onClick={() => { deletedata(data._id) }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Viewtasks