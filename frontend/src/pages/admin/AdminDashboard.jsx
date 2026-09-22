import { useState, useEffect } from "react";
import api from "../../services/api";
import {
    Users,
    Calendar,
    Activity,
    CheckCircle
} from "lucide-react";


const AdminDashboard = () => {


    const [stats,setStats] = useState(null);

    const [error,setError] = useState("");



    useEffect(()=>{

        fetchStats();

    },[]);




    const fetchStats = async()=>{


        try{


            const res = await api.get(
                "/admin/dashboard"
            );


            setStats(res.data);


        }
        catch(error){


            console.error(
                "Dashboard error",
                error
            );


            setError(
                "Unable to load dashboard data"
            );


        }


    };





    if(error){

        return (

            <div className="alert alert-danger">

                {error}

            </div>

        );

    }




    if(!stats){

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary">

                </div>

            </div>

        );

    }





    return (

        <div>


            <h4 className="mb-4 fw-bold">

                Dashboard Overview

            </h4>




            <div className="row g-4">



                <StatCard

                title="Total Customers"

                value={stats.totalCustomers}

                icon={<Users/>}

                color="primary"

                />



                <StatCard

                title="Today's Appointments"

                value={stats.todaysAppointments}

                icon={<Calendar/>}

                color="success"

                />



                <StatCard

                title="Waiting Tokens"

                value={stats.waitingTokens}

                icon={<Activity/>}

                color="warning"

                />



                <StatCard

                title="Completed Tokens"

                value={stats.completedTokens}

                icon={<CheckCircle/>}

                color="info"

                />



            </div>


        </div>

    );

};





const StatCard = ({
    title,
    value,
    icon,
    color
}) => {


return (

<div className="col-md-3">


<div className="card h-100 border-0 shadow-sm p-4">


<div className="d-flex align-items-center mb-3">


<div 
className={`bg-${color} bg-opacity-10 p-3 rounded-circle me-3`}
>

<span className={`text-${color}`}>

{icon}

</span>


</div>



<h6 className="mb-0 text-muted">

{title}

</h6>


</div>



<h2 className="fw-bold mb-0">

{value}

</h2>



</div>


</div>


);


};



export default AdminDashboard;