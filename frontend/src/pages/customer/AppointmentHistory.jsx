import { useState, useEffect } from "react";
import api from "../../services/api";
import {
    CalendarDays,
    Clock,
    Building2,
    CheckCircle,
    XCircle
} from "lucide-react";


const AppointmentHistory = () => {


    const [appointments, setAppointments] = useState([]);
    const [servingTokens, setServingTokens] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");




    useEffect(() => {

        fetchAppointments();

    }, []);





    const fetchAppointments = async () => {


        try {


            setLoading(true);


            const [apptRes, servingRes] = await Promise.all([
                api.get("/appointments/my"),
                api.get("/queue/serving")
            ]);
            setAppointments(apptRes.data);
            setServingTokens(servingRes.data);


        }

        catch (error) {


            console.error(
                "Appointment history error",
                error
            );


            setError(
                "Unable to load appointment history"
            );


        }

        finally {


            setLoading(false);


        }


    };






    const getStatusBadge = (status) => {


        switch(status){


            case "COMPLETED":

                return (
                    <span className="badge bg-success d-flex align-items-center gap-1">
                        <CheckCircle size={14}/>
                        Completed
                    </span>
                );



            case "CANCELLED":

                return (
                    <span className="badge bg-danger d-flex align-items-center gap-1">
                        <XCircle size={14}/>
                        Cancelled
                    </span>
                );



            case "WAITING":

                return (
                    <span className="badge bg-warning text-dark">
                        Waiting
                    </span>
                );



            case "APPROVED":

                return (
                    <span className="badge bg-primary">
                        Approved
                    </span>
                );



            default:

                return (
                    <span className="badge bg-secondary">
                        {status}
                    </span>
                );


        }


    };

    const handleCancel = async (id) => {
        if(!window.confirm("Are you sure you want to cancel this appointment?")) return;
        
        try {
            await api.post(`/customer/appointments/${id}/cancel`);
            fetchAppointments();
        } catch(error) {
            alert("Failed to cancel appointment");
        }
    };

    if(loading){


        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

            </div>

        );


    }







    return (


        <div>



            <div className="mb-4">


                <h4 className="fw-bold">

                    Appointment History

                </h4>


                <p className="text-muted">

                    View your previous and upcoming appointments

                </p>


            </div>







            {
            error &&

            <div className="alert alert-danger">

                {error}

            </div>

            }








            <div className="card shadow-sm border-0">


                <div className="table-responsive">


                    <table className="table table-hover mb-0">


                        <thead className="table-light">


                            <tr>

                                <th>ID</th>

                                <th>Department</th>

                                <th>Service</th>

                                <th>Date</th>

                                <th>Time</th>

                                <th>Token</th>

                                <th>Status</th>

                            </tr>


                        </thead>





                        <tbody>



                        {

                        appointments.length > 0 ?


                        appointments.map((appointment)=>{
                            const serving = servingTokens.find(t => t.service === appointment.service);
                            
                            return (


                            <tr key={appointment.id}>


                                <td>

                                    {appointment.id}

                                </td>




                                <td>


                                    <div className="d-flex align-items-center gap-2">


                                        <Building2 size={16}/>


                                        {appointment.department_name}


                                    </div>


                                </td>





                                <td>

                                    {appointment.service_name}

                                </td>






                                <td>


                                    <div className="d-flex align-items-center gap-2">


                                        <CalendarDays size={16}/>


                                        {appointment.date}


                                    </div>


                                </td>






                                <td>


                                    <div className="d-flex align-items-center gap-2">


                                        <Clock size={16}/>


                                        {appointment.time}


                                    </div>


                                </td>






                                <td>


                                    <span className="fw-bold text-primary">

                                        {appointment.token_number || "-"}

                                    </span>


                                </td>






                                <td>
                                    <div className="d-flex flex-column gap-1">
                                        <div className="d-flex align-items-center gap-2">
                                            {getStatusBadge(
                                                appointment.status
                                            )}
                                            {appointment.status === 'PENDING' && (
                                                <button 
                                                    className="btn btn-sm btn-outline-danger ms-2"
                                                    onClick={() => handleCancel(appointment.id)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                        {appointment.status === 'PENDING' && serving && (
                                            <small className="text-warning fw-bold mt-1">
                                                Serving Now: Token {serving.sequential_token}
                                            </small>
                                        )}
                                    </div>
                                </td>



                            </tr>


                        );})



                        :



                        (

                            <tr>

                                <td
                                colSpan="7"
                                className="text-center py-5 text-muted"
                                >

                                    No appointments found

                                </td>


                            </tr>


                        )


                        }



                        </tbody>



                    </table>



                </div>


            </div>



        </div>


    );


};


export default AppointmentHistory;