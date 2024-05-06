import React from 'react'
import styled from 'styled-components';



const headerer = styled.div`
  background-color:#1c1826;
  color: #fff;
  text-align: center;
  border: 3px solid #998fb0;
  border-radius : 5px;
`;

export default function Header(props) {


    return (
        <div>
            <headerer >
                <h1  class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{props.head}</span>.</h1>
                <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{props.para}</p>
            </headerer>



        </div>
    )
}
