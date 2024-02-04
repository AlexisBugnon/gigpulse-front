import Hero from "../Hero/Hero";
import Featured from "../Featured/Featured";
import HomeContent from "../HomeContent/HomeContent";
import Testimonials from "../Testimonials/Testimonials";




export default function Homepage() {


    return (
        <>
            <Hero />
            <Featured />
            <HomeContent />
            <div>
                <div className="dark:bg-base-100 pb-20 sm:pb-24 xl:pb-0 min-h-[680px]">
                    <Testimonials />
                </div>
            </div>
        </>
    );
}
