import React from 'react'
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NavActionButton from '../components/common/Navigation/NavActionButton'

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <img
                src="/images/Hoster.svg"
                alt="Hoster"
                className="w-12 h-12 object-contain "
            />
            <h1 className='text-[40px] font-bold'>ERROR 404</h1>
            <p className='text-[20px] font-medium'>La página que esta buscando no se pudo encontrar</p>

            <div className='mt-3'>
                <NavActionButton
                    icon={<ArrowLeft size={18} />}
                    label="VOLVER A LA PAGINA PRINCIPAL"
                    onClick={() => navigate(-1)}
                />
            </div>
        </div>
    )
}

export default NotFound