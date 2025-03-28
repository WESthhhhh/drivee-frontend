import React from "react";

export const PrimaryInput = ({ label, placeholder, type = "text", icon = null, error = null, succes = null }) => {
    return (
        <div className="mb-4 w-[500px]">
            <label className="block text-sm font-medium mb-[12px] text-primary">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`w-full p-2 border    ${error ? 'border-error' : succes ? 'border-success' : 'border-blueB50'} rounded-md focus:outline-none focus:ring-thin focus:ring-blueB75 focus:border-primary`} />
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <img src={`./assets/${icon}.png`} alt={icon} className="w-4 h-4" />
                    </div>
                )}
                {error && (
                    <p className="text-sm text-error">{error}</p>
                )}
                {succes && (
                    <p className="text-sm text-success">{succes}</p>
                )}
            </div>
        </div>
    );
};

export const SecondaryInput = ({ label, placeholder, type = "text", icon = null }) => {
    return (
        <div className="mb-4 w-[500px]">
            <label className="block text-sm font-medium mb-[12px] text-primary">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full p-2 border border-blueB50 rounded-md focus:outline-none focus:ring-thin focus:ring-blueB75 focus:border-primary"
                />
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <img src={`./assets/${icon}.png`} alt={icon} className="w-4 h-4" />
                    </div>
                )}
            </div>
        </div>
    );
};

export const DisableInput = ({ label, placeholder, type = "text", icon = null }) => {
    return (
        <div className="mb-4 w-[500px]">
            <label className="block text-sm font-medium mb-[12px] text-gray-500">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    disabled
                    className="w-full p-2 border-none rounded-md focus:outline-none bg-lightgrey"
                />
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <img src={`./assets/${icon}.png`} alt={icon} className="w-4 h-4" />
                    </div>
                )}
            </div>
        </div>
    );
};

export const FileInput = ({ label }) => {
    return (
        <div className="mb-4 w-[500px]">
            <label className="block text-sm font-medium mb-[12px] text-primary">{label}</label>
            <div className="relative flex items-center border border-blueB50 rounded-md px-3 py-2 focus-within:ring-thin focus-within:ring-blueB75 focus-within:border-primary ">
                <label htmlFor="file-upload" className="flex items-center cursor-pointer gap-[12px]">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33317 0.333374H1.99984C1.2665 0.333374 0.673171 0.933374 0.673171 1.66671L0.666504 12.3334C0.666504 13.0667 1.25984 13.6667 1.99317 13.6667H9.99984C10.7332 13.6667 11.3332 13.0667 11.3332 12.3334V4.33337L7.33317 0.333374ZM1.99984 12.3334V1.66671H6.6665V5.00004H9.99984V12.3334H1.99984Z" fill="#7D838B" />
                    </svg>
                    <span className="text-gray-500">Upload File</span>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                />
            </div>
        </div>
    );
};

export const TextArea = ({ label, placeholder }) => {
    return (
        <div className="mb-4 w-[500px]">
            <label className="block text-sm font-medium mb-[12px] text-primary">{label}</label>
            <textarea
                placeholder={placeholder}
                className="w-full p-2 border border-blueB50 rounded-md h-24 focus:outline-none focus:ring-thin focus:ring-blueB75 focus:border-primary"
            />
        </div>
    );
};


