import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page after logout
    };

    const handleCreateTask = () => {
        navigate('/tasks'); // Navigate to Create Task page
    };

    const handleViewTasks = () => {
        navigate('/viewtasks'); // Navigate to View Tasks page
    };

    return (
        <>
            <div className="container my-2">
                <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-3">
                    <div className="container-fluid">
                        <a className="navbar-brand">
                            <h3><code>To-do List</code></h3>
                        </a>
                        {token ? (
                            <div className="d-flex me-auto">
                                <button className="btn btn-outline-primary mx-2" type="button" onClick={handleCreateTask}>
                                    Create Task
                                </button>
                                <button className="btn btn-outline-primary mx-2" type="button" onClick={handleViewTasks}>
                                    View Tasks
                                </button>
                            </div>
                        ) : null}
                        {token ? (
                            <div className="d-flex">
                                <button className="btn btn-outline-warning mx-2" type="button" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : null}
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;