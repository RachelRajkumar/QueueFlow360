import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
    Building2,
    Stethoscope,
    CalendarDays,
    Clock
} from "lucide-react";


const BookAppointment = () => {


    const navigate = useNavigate();



    const [departments,setDepartments] = useState([]);

    const [services,setServices] = useState([]);


    const [loading,setLoading] = useState(false);


    const [error,setError] = useState("");



    const [formData,setFormData] = useState({

        departmentId:"",
        serviceId:"",
        appointmentDate:"",
        appointmentTime:""

    });







    useEffect(()=>{


        fetchDepartments();


    },[]);







    const fetchDepartments = async()=>{


        try{


            const res = await api.get(
                "/customer/departments"
            );


            setDepartments(res.data);


        }

        catch(error){


            setError(
                "Unable to load departments"
            );


        }


    };









    useEffect(()=>{


        if(formData.departmentId){


            fetchServices(
                formData.departmentId
            );


        }

        else{


            setServices([]);


        }



    },[formData.departmentId]);









    const fetchServices = async(id)=>{


        try{


            const res = await api.get(

                `/customer/services/department/${id}`

            );


            setServices(res.data);



        }

        catch(error){


            setError(
                "Unable to load services"
            );


        }


    };









    const handleSubmit = async(e)=>{


        e.preventDefault();


        try{


            setLoading(true);



            const payload = {
                service: formData.serviceId,
                date: formData.appointmentDate,
                time: formData.appointmentTime
            };

            const res = await api.post(

                "/customer/appointments",

                payload

            );



            alert(

                `Appointment booked successfully!\nToken Number : ${res.data.token_number}`

            );



            navigate("/customer");


        }

        catch(error){


            console.log(error);


            alert(
                "Failed to book appointment"
            );


        }

        finally{


            setLoading(false);


        }


    };







    const today = new Date()
    .toISOString()
    .split("T")[0];







    return (


        <div className="row justify-content-center">


            <div className="col-md-8">



            <div className="card shadow-sm border-0">


            <div className="card-body p-5">



            <h3 className="fw-bold mb-4">

                Book an Appointment

            </h3>





            {
            error &&

            <div className="alert alert-danger">

                {error}

            </div>

            }







            <form onSubmit={handleSubmit}>


            <div className="mb-3">


            <label className="form-label fw-medium">

            <Building2 size={18}/> Department

            </label>



            <select

            className="form-select form-select-lg"

            required

            value={formData.departmentId}


            onChange={
                e=>
                setFormData({

                    ...formData,

                    departmentId:e.target.value,

                    serviceId:""

                })
            }


            >



            <option value="">

                Select Department

            </option>



            {

            departments.map(dept=>(


            <option

            key={dept.id}

            value={dept.id}

            >

            {dept.name}

            </option>


            ))

            }



            </select>



            </div>









            <div className="mb-3">


            <label className="form-label fw-medium">


            <Stethoscope size={18}/> Service


            </label>





            <select

            className="form-select form-select-lg"

            required

            disabled={!formData.departmentId}


            value={formData.serviceId}


            onChange={
                e=>
                setFormData({

                    ...formData,

                    serviceId:e.target.value

                })
            }


            >


            <option value="">

                Select Service

            </option>




            {

            services.map(service=>(


            <option

            key={service.id}

            value={service.id}

            >

            {service.name}

            </option>


            ))

            }



            </select>



            </div>









            <div className="row mb-4">


            <div className="col-md-6">


            <label className="form-label fw-medium">


            <CalendarDays size={18}/> Date


            </label>



            <input

            type="date"

            className="form-control form-control-lg"

            required

            min={today}


            value={
                formData.appointmentDate
            }


            onChange={
                e=>
                setFormData({

                    ...formData,

                    appointmentDate:e.target.value

                })
            }


            />


            </div>








            <div className="col-md-6">


            <label className="form-label fw-medium">


            <Clock size={18}/> Time


            </label>




            <input

            type="time"

            className="form-control form-control-lg"

            required


            value={
                formData.appointmentTime
            }


            onChange={
                e=>
                setFormData({

                    ...formData,

                    appointmentTime:e.target.value

                })
            }


            />


            </div>



            </div>







            <button

            type="submit"

            disabled={loading}

            className="btn btn-primary btn-lg w-100 fw-bold"


            >


            {
                loading
                ?
                "Booking..."
                :
                "Confirm Booking & Generate Token"
            }


            </button>





            </form>



            </div>


            </div>


            </div>


        </div>


    );


};


export default BookAppointment;