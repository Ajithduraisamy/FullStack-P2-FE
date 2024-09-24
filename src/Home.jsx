import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center mt-4 mt-md-5 mt-lg-6">
                <div className="p-5 text-center bg-body-tertiary rounded-3">
                    <h1 className="text-body-emphasis">Organize your work and life, finally.</h1>
                    <p className="col-lg-8 mx-auto fs-5 text-muted p-2">
                        Simplify life for both you and your team with the world’s #1 task manager and to-do list app. Focus, from work to play with the best <code><b>To-do</b></code> list app.
                    </p>
                    <div className="d-inline-flex gap-2 mb-3">
                        <Link to='/register' className="d-inline-flex align-items-center btn btn-outline-primary btn-lg px-4 rounded-pill" type="button">
                            Register
                        </Link>
                        <Link to='/login' className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home