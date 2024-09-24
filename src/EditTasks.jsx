import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditTasks() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [initialValue, setInitialValue] = useState(null); // Initially null

    const fetchtaskdata = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3007/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.task) {
                setInitialValue({
                    tasks: response.data.task.tasks || "",
                    description: response.data.task.description || ""
                });
            } else {
                console.error('Unexpected response format:', response.data);
            }

        } catch (error) {
            console.error('Error fetching task data:', error);
        }
    };

    useEffect(() => {
        fetchtaskdata();
    }, [taskId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValue || { tasks: "", description: "" }, // Fallback to prevent null errors
        validate: (values) => {
            let errors = {};
            if (!values.tasks) {
                errors.tasks = 'Please enter the valid tasks';
            }
            if (!values.description) {
                errors.description = 'Please enter the valid description';
            }
            return errors;
        },
        onSubmit: async (values, actions) => {
            try {
                const token = localStorage.getItem('token');
                await axios.put(`http://localhost:3007/tasks/${taskId}`, values, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                actions.resetForm();
                navigate('/viewtasks');
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        }
    });

    if (!initialValue) {
        // Show a loading indicator until initialValue is set
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center align-items-center mt-4 mt-md-5 mt-lg-6 w-100">
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white text-center">
                                <h3>Task Manager</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="tasks" className="form-label">Task</label>
                                        <input
                                            type="text"
                                            id="tasks"
                                            name="tasks"
                                            placeholder="Enter Task"
                                            value={formik.values.tasks}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-control ${formik.touched.tasks && formik.errors.tasks ? 'is-invalid' : ''}`}
                                        />
                                        {formik.touched.tasks && formik.errors.tasks ? (
                                            <div className="invalid-feedback">{formik.errors.tasks}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            placeholder="Enter Description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                        />
                                        {formik.touched.description && formik.errors.description ? (
                                            <div className="invalid-feedback">{formik.errors.description}</div>
                                        ) : null}
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-success w-100">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditTasks;