import { useState, useEffect } from "react";
import axios from 'axios';
import { useFormik } from "formik";
import { format } from 'date-fns';
import moment from "moment";
import "./Tasks.css";

export const Tasks = () => {
    

    const [tasks, setTasks] = useState(
        [
            {
                "id": 0,
                "title": "",
                "description": "",
                "status": "",
                "assignee_id": 0,
                "created_at": "",
                "updated_at": ""
            }
        ]
    )
    
    useEffect(()=>{
        axios.get('https://taskmanager-server-pi.vercel.app/tasks',
        {
            headers: {
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNpdmEiLCJpYXQiOjE3MTQ1NjMzMjJ9.Zac4XsfuuqCU3G54rvxaCND6sh00bMxv5HMt4380c00'
            }
        })
        .then(res => {
            setTasks(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        
    }, [])

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            status: ""
        },
        validate: (values) => {},
        onSubmit: (values) => {
               console.log(values)
        },
    });

    return (
        <div className="container">
            {
                tasks.map(task => 
                    <div className="card mb-4 mt-4 shadow-lg" key={task.id}>
                        <div className="card-header d-flex justify-content-around">
                            <h5 className="card-title fw-bold">
                                {task.title}
                            </h5>
                            <div className="d-flex">
                                <p className="mt-2">
                                    Created at: {task.created_at}
                                </p>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-text text-center">
                                {task.description}
                            </p>
                            <div className="d-flex justify-content-around">
                                <div className="d-flex ">
                                    <div className="dot bg-primary"></div>
                                    <p className="text-primary mt-2"> {task.status} </p>
                                </div>
                                <div className="d-flex">
                                    <i
                                        type="button"
                                        className="bi bi-pencil-square fs-4 me-3 text-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target={"#" + task.id}
                                    ></i>
                                    <label
                                        className="mt-2"
                                        data-bs-toggle="modal"
                                        data-bs-target={"#" + task.id}
                                    >
                                        Edit
                                    </label>
                                </div>
                                <div className="d-flex ">
                                    <i className="bi bi-trash3 fs-4 me-3 text-danger"></i>
                                    <p className="mt-2 text-danger">
                                        Delete
                                    </p>
                                </div>
                                <div className="d-flex ">
                                    <i className="bi bi-calendar-event fs-4 me-3"></i>
                                    <p className="mt-2">
                                        Last Modified : {task.updated_at}
                                    </p>
                                </div>
                            </div>
                            <div
                                className="modal fade"
                                id={task.id}
                                tabIndex="-1"
                                aria-labelledby={"modalLabel" + tasks.id}
                                aria-hidden="true"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1
                                                className="modal-title fs-5"
                                                id={"modalLabel" + tasks.id}
                                            >
                                                {task.title}
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <h1> Yet to Code </h1>
                                            {/* <form onSubmit={formik.handleSubmit}>
                                                <dt> Title </dt>
                                                <dd> 
                                                    <input type="text" value={formik.values.title} />
                                                </dd>
                                                
                                            </form> */}
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Save changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
