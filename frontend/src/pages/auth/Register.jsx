import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {


    const { register } = useContext(AuthContext);

    const navigate = useNavigate();



    const [formData,setFormData] = useState({

        name:"",
        email:"",
        password:"",
        phone:"",
        address:""

    });



    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);





    const handleChange=(e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };





    const handleSubmit=async(e)=>{


        e.preventDefault();

        setError("");

        setLoading(true);



        try{


            await register(formData);


            navigate("/customer");


        }

        catch(err){


            setError(
                err.message ||
                "Registration failed"
            );


        }

        finally{

            setLoading(false);

        }


    };





    return (


        <div className="auth-bg py-5">


            <div

            className="card auth-card shadow-lg p-5 my-5 mx-auto"

            style={{
                width:"100%",
                maxWidth:"500px"
            }}

            >


                <div className="text-center mb-4">


                    <h2 className="fw-bold text-primary">
                        Create Account
                    </h2>


                    <p className="text-muted">
                        Join QueueFlow 360 today.
                    </p>


                </div>





                {
                error &&

                <div className="alert alert-danger py-2">

                    {error}

                </div>

                }





                <form onSubmit={handleSubmit}>


                    <div className="mb-3">


                        <label className="form-label fw-medium">
                            Full Name
                        </label>


                        <input

                        type="text"

                        name="name"

                        className="form-control"

                        required

                        value={formData.name}

                        onChange={handleChange}

                        />

                    </div>





                    <div className="mb-3">


                        <label className="form-label fw-medium">
                            Email Address
                        </label>


                        <input

                        type="email"

                        name="email"

                        className="form-control"

                        required

                        value={formData.email}

                        onChange={handleChange}

                        />

                    </div>





                    <div className="mb-3">


                        <label className="form-label fw-medium">
                            Phone
                        </label>


                        <input

                        type="text"

                        name="phone"

                        className="form-control"

                        required

                        value={formData.phone}

                        onChange={handleChange}

                        />

                    </div>





                    <div className="mb-3">


                        <label className="form-label fw-medium">
                            Address
                        </label>


                        <input

                        type="text"

                        name="address"

                        className="form-control"

                        required

                        value={formData.address}

                        onChange={handleChange}

                        />

                    </div>





                    <div className="mb-4">


                        <label className="form-label fw-medium">
                            Password
                        </label>


                        <input

                        type="password"

                        name="password"

                        className="form-control"

                        required

                        value={formData.password}

                        onChange={handleChange}

                        />

                    </div>





                    <button

                    type="submit"

                    className="btn btn-primary w-100 btn-lg mb-3"

                    disabled={loading}

                    >

                    {
                    loading 
                    ? "Creating Account..."
                    : "Register"
                    }


                    </button>





                    <div className="text-center">


                        <span className="text-muted">
                            Already have an account?
                        </span>


                        <Link

                        to="/login"

                        className="text-decoration-none fw-semibold"

                        >

                        Login here

                        </Link>


                    </div>



                </form>



            </div>


        </div>


    );

};


export default Register;