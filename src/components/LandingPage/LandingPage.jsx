import { useState, useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import axios from 'axios';
import "./LandingPage.css";
import { CreateTask } from "../CreateTask/CreateTask";
import { Tasks } from "../Tasks/Tasks";

export const LandingPage = () => {

    return (
        <div className="container-fluid mt-2 h-100">         
            <div> <CreateTask /></div>
            <div><Tasks/></div>
        </div>
    );
};
