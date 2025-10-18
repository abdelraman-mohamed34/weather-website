export default function SimpleCard() {
    return (
        <>
            <div className="max-w-xs h-20 bg-red-400
         rounded-2xl shadow-md overflow-hidden 
         hover:shadow-xl transition-shadow duration-300 cursor-pointer ">
                <div className="relative w-full h-full">
                    <span className="rounded-full p-20 bg-orange-400 absolute -top-10 right-0 opacity-30" />
                    <span className="rounded-full p-20 bg-orange-200 absolute -top-17 -right-10 opacity-10" />
                    <span className="rounded-full p-12 bg-yellow-500 absolute -top-13 -right-0 opacity-100" />
                </div>
            </div>
            <div className="max-w-xs h-20 bg-sky-700/90
                rounded-2xl shadow-md overflow-hidden 
                hover:shadow-xl transition-shadow duration-300 cursor-pointer ">
                <div className="relative w-full h-full">
                    <span className="rounded-full p-20 bg-sky-600 absolute -top-10 right-0 opacity-20" />
                    <span className="rounded-full p-20 bg-sky-200 absolute -top-17 -right-10 opacity-10" />
                    <span className="rounded-full p-12 bg-yellow-100 absolute -top-13 -right-0 opacity-100" />
                </div>
            </div>
        </>
    );
}
