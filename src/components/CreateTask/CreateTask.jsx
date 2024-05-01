import { useState, useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import axios from 'axios';
import './CreateTask.css';

export const CreateTask = () => {
    const [taskDetails, setTaskDetails] = useState({
        title : "",
        description : "",
        status : "",
        assignee_id: 0,
        created_at: "",
        updated_at : ""

    })
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        validate: (values) => {},
        onSubmit: (values) => {
            const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
            // console.log(values);
            setTaskDetails({
                title : values.title,
                description : values.description,
                status : "Not started",
                assignee_id: 2,
                created_at: currentDateTime,
                updated_at : currentDateTime
            })
            values.title = "";
            values.description = "";            
        },
    });

    useEffect(() => {
        if (taskDetails.title){
            console.log(taskDetails);
            axios.post('https://taskmanager-server-pi.vercel.app/tasks', taskDetails, 
            {
                headers: {
                'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNpdmEiLCJpYXQiOjE3MTQ1NjMzMjJ9.Zac4XsfuuqCU3G54rvxaCND6sh00bMxv5HMt4380c00'
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        
      }, [taskDetails]); 

    return (
        <div className="container-fluid mt-2 h-100">
            <div className="input-container mb-4">
                <div>
                    <h1 className=""> Task Manager </h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="border border-1 p-3 w-25">
                    <dt>Title</dt>
                    <dd>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                    </dd>
                    <dt>Task Description</dt>
                    <dd data-mdb-input-init className="form-outline">
                        <textarea
                            className="form-control"
                            id=""
                            rows="4"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        ></textarea>
                    </dd>
                    <button className="btn btn-primary w-100" type="submit">
                        Add Task <span className="bi bi-chevron-right"></span>
                    </button>
                </form>
            </div>
        </div>
    );
};