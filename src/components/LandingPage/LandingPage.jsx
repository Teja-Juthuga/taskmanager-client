import { useState, useEffect } from "react";
import { useFormik } from "formik";
import "./LandingPage.css";
import { Tasks } from "../Tasks/Tasks";

export const LandingPage = () => {
    return (
        <div className="container-fluid mt-2 h-100" >
            <div className="input-container">
                <div>
                    <h1 className=""> Task Manager </h1>
                </div>
                <dl className="border border-1 p-3 w-25">
                    <dt>Task:</dt>
                    <dd>
                        <input type="text" className="form-control" />
                    </dd>
                    <dt>Task Description:</dt>
                    <dd data-mdb-input-init className="form-outline">
                        <textarea
                            className="form-control"
                            id=""
                            rows="4"
                        ></textarea>
                    </dd>
                    <button className="btn btn-primary w-100"> Add Task </button>
                </dl>
            </div>
            <div>
                {/* <Tasks />   */}
            </div>
        </div>
    );
};
