import Navbar from "../components/Navbar";
import image from "../assets/doctor-nobg.jpeg";
import { useEffect, useRef, useState } from "react";

function Home() {
    const [isShow, setShow] = useState(false);
    const spacerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (spacerRef.current) {
                const rect = spacerRef.current.getBoundingClientRect();
                setShow(rect.top <= 108);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="">
            <Navbar />

            <div className="grid grid-cols-1 sm:grid-cols-2 px-32">
                <div className="flex flex-col justify-center p-5 mt-20">
                    <p className="p-2 text-7xl font-bold bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900">
                        Medical & <br />
                        Health Care <br />
                        Service
                    </p>
                    <p className="p-2 font-semibold text-lg">Online Medical Consultaions with certified medical<br />professional</p>
                </div>
                <div className={`overflow-hidden relative z-20 ${isShow ? 'opacity-0' : ''}`}>
                    <img className="w-full h-full object-cover" src={image} alt="" />
                </div>
            </div>

            <div ref={spacerRef} className="flex flex-col items-center bg-blue-50 h-[300px] p-8 px-36 relative z-0">
                <p>About US</p>

            </div>

            <div className="h-[400px] bg-white">

            </div>


        </div>
    );
}

export default Home;
