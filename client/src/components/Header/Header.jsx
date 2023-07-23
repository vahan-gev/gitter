import React from 'react'
import logo from '../../assets/Logo.jpg';
function Header() {
  return (
    <div className="h-full bg-gray-400 flex row-auto justify-between rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 py-1 px-4 my-2">
        <section className='flex row-auto'>
            <div>
                <img src={logo} width={50} style={{
                    borderRadius: 50
                }} />
            </div>
            <div className='flex justify-center items-center mx-3'>
                <h2 className='text-xl'>Gitter</h2>
            </div>
        </section>
        <section>

        </section>
    </div>
  )
}

export default Header