import React from 'react'

const Tittle = ({ title, subTitle, align }) => {
    return (
        <div className={`flex flex-col items-left justify-center   
         ${align === "left" ? "md:text-left" : align === "right" ? "md:text-right" : ""}`}>
            <h1 className="font-semibold text-4xl md:text-[40px]">{title}</h1>
            <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">{subTitle}</p>
        </div>
    )
}

export default Tittle