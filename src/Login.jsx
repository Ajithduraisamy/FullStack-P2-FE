import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            let errors = {};
            if (!values.email) {
                errors.email = 'Please enter a valid email';
            }
            if (!values.password) {
                errors.password = 'Please enter a valid password';
            }
            return errors;
        },
        onSubmit: async (values, actions) => {
            try {
                const response = await axios.post('http://localhost:3007/login', values);

                // Store token in localStorage after successful login
                localStorage.setItem('token', response.data.token);

                actions.resetForm();
                navigate('/tasks');
            } catch (error) {
                console.error('Error submitting form:', error.message);
                alert(`Error: ${error.response?.data?.Message || error.message}`);
            }
        },
    });

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center mt-4 mt-md-5 mt-lg-6 w-100" >
                <div className="col-md-4 bg-body-tertiary rounded-3 pb-4">
                    <form className="px-4 py-3" onSubmit={formik.handleSubmit}>
                        <h3 className="text-center p-2">Login</h3>
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="email@example.com"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                style={{
                                    borderColor: formik.touched.email && formik.errors.email ? 'red' : '',
                                }}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span style={{ color: 'red' }}>{formik.errors.email}</span>
                            )}
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                style={{
                                    borderColor: formik.touched.password && formik.errors.password ? 'red' : '',
                                }}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <span style={{ color: 'red' }}>{formik.errors.password}</span>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                    <div className="text-center">
                        <div>
                            New around here? <Link to="/register">Register</Link>
                        </div>
                        <div className='mt-2'>
                            Want to go Home? <Link to="/">Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;