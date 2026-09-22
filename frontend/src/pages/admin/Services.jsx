import { useState, useEffect } from "react";
import api from "../../services/api";


const Services = () => {


    const [services,setServices] = useState([]);

    const [departments,setDepartments] = useState([]);

    const [serviceName,setServiceName] = useState("");

    const [departmentId,setDepartmentId] = useState("");

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");





    useEffect(()=>{

        loadData();

    },[]);





    const loadData = async()=>{

        fetchServices();

        fetchDepartments();

    };






    const fetchServices = async()=>{


        try{


            setLoading(true);


            const res = await api.get(
                "/admin/services"
            );


            setServices(res.data);


        }

        catch(error){

            setError(
                "Unable to load services"
            );

        }

        finally{

            setLoading(false);

        }


    };







    const fetchDepartments = async()=>{


        try{


            const res = await api.get(
                "/admin/departments"
            );


            setDepartments(res.data);


        }

        catch(error){


            console.log(error);


        }


    };









    const handleCreate = async(e)=>{


        e.preventDefault();


        try{


            await api.post(

                "/admin/services",

                {

                    name: serviceName,

                    department: departmentId

                }

            );



            setServiceName("");

            setDepartmentId("");

            fetchServices();


        }

        catch(error){


            alert(
                "Service creation failed"
            );


        }


    };









    const handleDelete = async(id)=>{


        if(!window.confirm(
            "Delete this service?"
        ))
        return;




        try{


            await api.delete(

                `/admin/services/${id}`

            );


            fetchServices();


        }

        catch(error){


            alert(
                "Delete failed"
            );


        }


    };







    return (


        <div>



            <h4 className="fw-bold mb-4">

                Manage Services

            </h4>





            {
            error &&

            <div className="alert alert-danger">

                {error}

            </div>

            }







            <div className="card shadow-sm mb-4">


            <div className="card-body">



            <form onSubmit={handleCreate}>


            <div className="row g-3">



                <div className="col-md-5">


                    <label className="form-label">

                        Service Name

                    </label>


                    <input

                    type="text"

                    className="form-control"

                    required

                    value={serviceName}

                    onChange={
                        e=>setServiceName(
                            e.target.value
                        )
                    }

                    />


                </div>







                <div className="col-md-4">


                    <label className="form-label">

                        Department

                    </label>



                    <select

                    className="form-select"

                    required

                    value={departmentId}

                    onChange={
                        e=>setDepartmentId(
                            e.target.value
                        )
                    }

                    >


                    <option value="">

                    Select Department

                    </option>



                    {

                    departments.map(
                    dept=>(


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







                <div className="col-md-3 d-flex align-items-end">


                    <button

                    className="btn btn-primary w-100"

                    >

                    Add Service

                    </button>


                </div>




            </div>



            </form>


            </div>


            </div>









            <div className="card shadow-sm">


            <div className="table-responsive">


            <table className="table table-hover mb-0">


            <thead className="table-light">


            <tr>

                <th>ID</th>

                <th>Service</th>

                <th>Department</th>

                <th>Action</th>


            </tr>


            </thead>







            <tbody>


            {


            loading ?


            (

            <tr>

            <td 
            colSpan="4"
            className="text-center"
            >

            Loading...

            </td>


            </tr>


            )


            :



            services.length>0 ?



            services.map(service=>(


            <tr key={service.id}>


                <td>

                    {service.id}

                </td>



                <td className="fw-semibold">

                    {service.name}

                </td>



                <td className="text-muted">

                    {service.department_name}

                </td>




                <td>


                    <button

                    className="btn btn-sm btn-outline-danger"

                    onClick={()=>
                        handleDelete(service.id)
                    }

                    >

                    Delete

                    </button>


                </td>



            </tr>


            ))



            :


            (

            <tr>

            <td

            colSpan="4"

            className="text-center py-4 text-muted"

            >

            No services found.

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



export default Services;