import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    Home,
    CalendarPlus,
    History,
    LogOut
} from "lucide-react";


const CustomerLayout = () => {


    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();



    const handleLogout = () => {

        logout();

        navigate("/login");

    };




    return (


        <div className="d-flex flex-column min-vh-100 bg-light">



            {/* Navbar */}

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">


                <div className="container-fluid px-4">


                    <NavLink
                        to="/customer"
                        className="navbar-brand fw-bold"
                    >

                        QueueFlow 360

                    </NavLink>




                    <button

                        className="navbar-toggler"

                        type="button"

                        data-bs-toggle="collapse"

                        data-bs-target="#customerNavbar"

                    >

                        <span className="navbar-toggler-icon"></span>

                    </button>





                    <div

                        className="collapse navbar-collapse"

                        id="customerNavbar"

                    >



                        <ul className="navbar-nav me-auto">



                            <li className="nav-item">


                                <NavLink

                                    to="/customer"

                                    className="nav-link text-white d-flex align-items-center gap-2"

                                >

                                    <Home size={18}/>

                                    Dashboard

                                </NavLink>


                            </li>





                            <li className="nav-item">


                                <NavLink

                                    to="/customer/book"

                                    className="nav-link text-white d-flex align-items-center gap-2"

                                >

                                    <CalendarPlus size={18}/>

                                    Book Appointment

                                </NavLink>


                            </li>






                            <li className="nav-item">


                                <NavLink

                                    to="/customer/history"

                                    className="nav-link text-white d-flex align-items-center gap-2"

                                >

                                    <History size={18}/>

                                    Appointment History

                                </NavLink>


                            </li>




                        </ul>






                        <div className="d-flex align-items-center gap-3">


                            <span className="text-white">


                                Welcome,{" "}

                                {user?.name || user?.username || "Customer"}


                            </span>






                            <button

                                onClick={handleLogout}

                                className="btn btn-light btn-sm d-flex align-items-center gap-2"

                            >

                                <LogOut size={16}/>

                                Logout


                            </button>




                        </div>




                    </div>




                </div>



            </nav>







            {/* Main Content */}


            <main className="container py-4 flex-grow-1">


                <Outlet />


            </main>







            {/* Footer */}


            <footer className="bg-white border-top text-center py-3">


                <small className="text-muted">


                    © 2026 QueueFlow 360. All Rights Reserved.


                </small>


            </footer>




        </div>


    );

};



export default CustomerLayout;