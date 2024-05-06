import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';


const Header = styled.div`
  background-color:#1c1826;
  color: #fff;
  text-align: center;
  padding: 10px;
  border: 3px solid #998fb0;
  border-radius : 5px;
`;


const Landingpage = () => {
    return (
        <div>

            <Header>
                <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Police Administration System</span>.</h1>
                <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here we focus on make the FIR system  in centralized.</p>
            </Header>

            <Navbar></Navbar>



            <section class="p-10 min-h-screen flex md:flex-row items-center justify-around bg-zinc-600 flex-wrap sm:flex-col">



            {/* <div class="h-48 w-48 relative cursor-pointer mb-5  rounded-lg shadow-2xl ">
    <div class="absolute inset-0 bg-white  rounded-lg shadow-2xl"></div>
    <div class="absolute inset-0 transform rounded-lg shadow-2xl ">
            <img src="policeLogo.png" alt="logo" className="h-full w-full" />
    </div>
</div> */}




                {/* <!-- scale --> */}
                <div class="h-32 w-32 relative cursor-pointer mb-5">
                    <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl ">heelo je</div>
                    <div class="absolute inset-0 transform  hover:scale-75 transition duration-300">
                        <div class="h-full w-full bg-white rounded-lg shadow-2xl"> hi maaz</div>
                    </div>
                </div>

                {/* <!-- roatate and scale --> */}
                <div class="h-32 w-32 relative cursor-pointer mb-5">
                    <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
                    <div class="absolute inset-0 transform hover:rotate-90 hover:scale-75 transition duration-300">
                        <div class="h-full w-full bg-white rounded-lg shadow-2xl"></div>
                    </div>
                </div>

                {/* <!-- rotate --> */}
                <div class="h-32 w-32 relative cursor-pointer mb-5">
                    <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
                    <div class="absolute inset-0 transform  hover:rotate-45 transition duration-300">
                        <div class="h-full w-full bg-white rounded-lg shadow-2xl"></div>
                    </div>
                </div>

                {/* <!-- rotate minus --> */}
                <div class="h-32 w-32 relative cursor-pointer mb-5">
                    <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
                    <div class="absolute inset-0 transform  hover:-rotate-45 transition duration-300">
                        <div class="h-full w-full bg-white rounded-lg shadow-2xl"></div>
                    </div>
                </div>

                {/* <!-- Origin --> */}
                <div class="h-32 w-32 relative cursor-pointer mb-5">
                    <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
                    <div class="absolute inset-0 transform origin-left hover:-rotate-45 transition duration-300">
                        <div class="h-full w-full bg-white rounded-lg shadow-2xl"></div>
                    </div>
                </div>

                {/* <!-- translate --> */}
                <div class="h-32 w-32 relative cursor-pointer mb-5">
                    <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
                    <div class="absolute inset-0 transform hover:-translate-x-10 transition duration-300">
                        <div class="h-full w-full bg-white rounded-lg shadow-2xl"></div>
                    </div>
                </div>

                <div class="h-32 w-32 relative cursor-pointer mb-5">
                    <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>

                    <div class="absolute inset-0 transform hover:rotate-90 hover:translate-x-full hover:scale-150 transition duration-300">
                        <div class="h-full w-full bg-white rounded-lg shadow-2xl"></div>
                    </div>
                </div>

                {/* <!-- skew --> */}
                <div class="h-32 w-32 relative cursor-pointer mb-5">
                    <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
                    <div class="absolute inset-0 transform hover:skew-y-12 transition duration-300">
                        <div class="h-full w-full bg-white rounded-lg shadow-2xl"></div>
                    </div>
                </div>

            </section>

        </div>
    );
};

export default Landingpage;