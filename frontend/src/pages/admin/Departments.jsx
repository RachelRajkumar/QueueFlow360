import { useState, useEffect } from "react";
import api from "../../services/api";


const Departments = () => {


    const [departments,setDepartments] = useState([]);

    const [name,setName] = useState("");

    const [description,setDescription] = useState("");

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");





    useEffect(()=>{

        fetchDepartments();

    },[]);





    const fetchDepartments = async()=>{


        try{


            setLoading(true);


            const res = await api.get(
                "/admin/departments"
            );


            setDepartments(res.data);


        }

        catch(error){


            console.log(error);


            setError(
                "Unable to load departments"
            );


        }

        finally{

            setLoading(false);

        }


    };







    const handleCreate = async(e)=>{


        e.preventDefault();


        try{


            await api.post(

                "/admin/departments",

                {
                    name,
                    description
                }

            );



            setName("");

            setDescription("");

            fetchDepartments();



        }

        catch(error){


            alert(
                "Department creation failed"
            );


        }


    };








    const handleDelete = async(id)=>{


        const confirmDelete =
        window.confirm(
            "Delete this department?"
        );


        if(!confirmDelete)
            return;



        try{


            await api.delete(

                `/admin/departments/${id}`

            );


            fetchDepartments();


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

                Manage Departments

            </h4>






            {
            error &&

            <div className="alert alert-danger">

                {error}

            </div>

            }








            <div className="card shadow-sm mb-4">


                <div className="card-body">


                    <form 
                    onSubmit={handleCreate}
                    >



                    <div className="row g-3">



                        <div className="col-md-4">


                            <label className="form-label">

                                Department Name

                            </label>



                            <input

                            type="text"

                            className="form-control"

                            value={name}

                            required

                            onChange={
                                e=>setName(e.target.value)
                            }

                            />

                        </div>






                        <div className="col-md-5">


                            <label className="form-label">

                                Description

                            </label>


                            <input

                            type="text"

                            className="form-control"

                            value={description}

                            required

                            onChange={
                                e=>setDescription(e.target.value)
                            }

                            />

                        </div>







                        <div className="col-md-3 d-flex align-items-end">


                            <button

                            className="btn btn-primary w-100"

                            >

                            Add Department

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

                <th>Name</th>

                <th>Description</th>

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


            departments.length > 0 ?

            (

            departments.map((dept)=>(


            <tr key={dept.id}>


                <td>
                    {dept.id}
                </td>


                <td className="fw-semibold">

                    {dept.name}

                </td>



                <td className="text-muted">

                    {dept.description}

                </td>



                <td>


                    <button

                    onClick={()=>
                        handleDelete(dept.id)
                    }

                    className="btn btn-sm btn-outline-danger"

                    >

                    Delete

                    </button>


                </td>



            </tr>


            ))


            )

            :


            (

            <tr>

            <td 
            colSpan="4"
            className="text-center text-muted py-4"
            >

            No departments found

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


export default Departments;