import NavBar from "../../components/navbar";
import "./landing.css";
import { FaLock } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import { whyUs, testimonials, pricings } from "../../data";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Logo from "../../components/logo";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { GetStarted } from "../../components/signInOptions";
import { useSelector } from "react-redux";
import { selectAll } from "../../redux/docSlice";
import { Link } from "react-router-dom";
import { LogoutFunc } from "../../redux/docSlice";
import { useDispatch } from "react-redux";

const Landing = () => {
  const year = new Date().getFullYear();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //Setting Syncronous loading.
  useEffect(() => {
    const randomSec = [
      1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
    ];
    const random = Math.floor(Math.random() * randomSec.length);

    const timer = setTimeout(() => {
      setLoading(false);
    }, randomSec[random]);

    dispatch(LogoutFunc());

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence>
          <main className="hero_section">
            <NavBar />
            <section id="home" className="landing_home">
              <motion.div
                className="landing_home_one"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1.3 }}
              >
                <h2>Your all in one virtual tools.</h2>

                <p>
                  Welcome to our website, where we offer VPN logs and virtual
                  numbers. Browse our selection, add to cart, and checkout for
                  fast and easy privacy and communication. Contact us with any
                  questions. Thank you for choosing us!
                </p>
                <GetStarted />
                <div className="detailed-info-short">
                  <small>
                    <FaLock />
                    100% Secure
                  </small>
                  <small>
                    <AiOutlineCheck />
                    The right tools for you to use
                  </small>
                </div>
              </motion.div>
            </section>
            <motion.div
              className="video_section"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1.3 }}
            >
              <div className="video_vpnLogs">
                <div className="video_embedded">
                  <ReactPlayer
                    width={"100%"}
                    url="https://www.youtube.com/watch?v=VGbyKO8bN68"
                  />
                </div>
                <h2>Why you need a Virtual Number</h2>
              </div>
              <div className="video_vpnLogs">
                <div className="video_embedded">
                  <ReactPlayer
                    width={"100%"}
                    url="https://www.youtube.com/watch?v=YT2GRbokg0w"
                  />
                </div>
                <h2>Why you need a VPN</h2>
              </div>
            </motion.div>
            <section id="whyUs">
              <motion.div
                className="whyUs_container p-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1.3 }}
              >
                <div className="whyUs_wrapper">
                  <div className="whyUs_header">
                    <h2>Why VirtualEase?</h2>
                    <p>
                      Here are some of the reasons to make you work with us.
                    </p>
                  </div>
                  <div className="whyUs_one">
                    {whyUs.map((why) => (
                      <div className="whyUs_two" key={why.id}>
                        <img src={why.icon} alt="" />
                        <h3>{why.header}</h3>
                        <p>{why.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>
            <motion.section
              id="testimonial"
              className="p-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1.3 }}
            >
              <h2>What our users have to say.</h2>
              <p>Here are some for the things our daily users have to say.</p>
              <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={4}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                className="testimonial_container"
                autoplay={true}
                breakpoints={{
                  280: {
                    slidesPerView: 1,
                    spaceBetweenSlides: 30,
                  },
                  320: {
                    slidesPerView: 1,
                    spaceBetweenSlides: 30,
                  },
                  767: {
                    slidesPerView: 2,
                    spaceBetweenSlides: 20,
                  },
                  999: {
                    slidesPerView: 3,
                    spaceBetweenSlides: 40,
                  },
                  1200: {
                    slidesPerView: 4,
                    spaceBetweenSlides: 50,
                  },
                }}
              >
                {testimonials.map((testimonial, i) => (
                  <SwiperSlide className="testimonial_one" key={i}>
                    <img src={testimonial.image} alt="" />
                    <div className="testimonial_gradient"></div>
                    <div className="testimonial_two">
                      <h3>{testimonial.name}</h3>
                      <h4>{testimonial.role}</h4>
                      <p>{testimonial.text}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.section>
            <motion.section
              id="pricing"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1.3 }}
            >
              <h2>A glance at what our pricing looks like.</h2>
              <p>select your preferred plan below</p>
              <div className="pricing_container p-lg">
                {pricings.map((pricing, i) => {
                  const { features } = pricing;
                  return (
                    <article key={i} className="pricing_one">
                      <h2>{pricing.name}</h2>
                      <h4>{pricing.description}</h4>
                      <h3>
                        {pricing.price} <small>{pricing.currency}</small>
                      </h3>
                      <Link to={"/signin"} className="pricing_btn btn-fill">
                        Choose Plan
                      </Link>
                      <title>Features</title>
                      <ul>
                        {features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </motion.section>
            <motion.footer
              className="footer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1.3 }}
            >
              <div className="footer_container p-lg">
                <div className="logo_footer">
                  <div className="logo_footer_one">
                    <Logo />
                  </div>
                  <div>
                    A platform that comes to your aid in terms of privacy!
                  </div>
                </div>
                <ul className="ul_footer">
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#whyUs">Why Us</a>
                  </li>
                  <li>
                    <a href="#testimonial">Testimonial</a>
                  </li>
                  <li>
                    <a href="#pricing">Pricing</a>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="p-lg copyrights">
                <p>&copy; {year} Virtualease All Right Reserved</p>
              </div>
            </motion.footer>
          </main>
        </AnimatePresence>
      )}
    </>
  );
};

export default Landing;
