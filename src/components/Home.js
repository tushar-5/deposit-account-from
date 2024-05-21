import React from 'react';
import { Link } from 'react-router-dom';
import "../implemify-bank/css/style.css";
import logo from "../implemify-bank/images/logo.png";
import checking from "../implemify-bank/images/checking.png";
import savings from "../implemify-bank/images/savings.png";
import loan from "../implemify-bank/images/loan.png";
import img_1 from "../implemify-bank/images/img_1.jpg";
import img_2 from "../implemify-bank/images/img_2.jpg";

const Homepage = () => {
  return(
  <div class="site-wrap">
    <div class="site-mobile-menu site-navbar-target">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div>

    <header class="site-navbar js-sticky-header site-navbar-target" role="banner">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6 col-xl-2 center">
            <h1 class="mb-0 site-logo">
              <a href="index.html" class="h2 mb-0"><img src={logo} alt="" /><span class="">Bank</span>
              </a>
            </h1>
          </div>

          <div class="col-12 col-md-10 d-none d-xl-block">
            <nav
              class="site-navigation position-relative text-right"
              role="navigation"
            >
            </nav>
          </div>

          <div class="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{ position: 'relative', top: '3px' }}>
            <a href="/#" class="site-menu-toggle js-menu-toggle float-right"><span class="icon-menu h3"></span></a>
          </div>
        </div>
      </div>
    </header>

    <div class="site-blocks-cover overlay" style={{ backgroundImage: `url(${img_2})` }} data-aos="fade" id="home-section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 mt-lg-5 text-center">
            <div class="single-text ">
              <div class="slide">
                <h1 class="text-uppercase text-center" data-aos="fade-up">
                  Experience Better Banking with Implemify!
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#next" class="mouse smoothscroll">
        <span class="mouse-icon">
          <span class="mouse-wheel"></span>
        </span>
      </a>
    </div>

    <div class="site-section" id="next">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="">
            <img src={checking} alt="Free Website Template by Free-Template.co" class="img-fluid w-25 mb-4" />
            <h3 class="card-title">Checking</h3>
            <p>
              Open a new checking account with a $5,000 deposit and we’ll match 1%!
            </p>
            {/* <a href="#">Apply Now</a> */}  <Link to='checkings' state="76366d39-0954-424b-87c0-f1c21b6bfa06">
              Apply Now
            </Link>
          </div>
          <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="100">
            <img src={savings} alt="Free Website Template by Free-Template.co" class="img-fluid w-25 mb-4" />
            <h3 class="card-title">Savings</h3>
            <p>
              Open a managed savings account and learn how we can help you earn more!
            </p>
            {/* <a href="#">Apply Now</a> */} <Link to='saving' state="921b799c-bf39-439b-837e-63e83fc0e295">
              Apply Now
            </Link>
          </div>
          <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="200">
            <img src={loan} alt="Free Website Template by Free-Template.co" class="img-fluid w-25 mb-4" />
            <h3 class="card-title">Loans</h3>
            <p>
              Make your dreams a reality with our simplified home or auto loan process!
            </p>
            <a class="disabled" href="/#">Apply Now</a>
          </div>
        </div>

        <div class="row py-4">
          <div class="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
            <figure class="circle-bg">
              <img src={img_1} alt="Free Website Template by Free-Template.co" class="img-fluid" />
            </figure>
          </div>
          <div class="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
            <div class="mb-4">
              <h3 class="h3 mb-4 text-black">Checking with Implemify</h3>
            </div>

            <div class="mb-4">
              <ul class="list-unstyled" >
                <li class="d-flex" ><i class="fa fa-check mt-xl-2 mt-1 mr-2"></i>
                  Quick and easy application process; know if you’re approved in as little as 15 minutes!
                </li>
                <li class="d-flex"><i class="fa fa-check mt-xl-2 mt-1 mr-2"></i>
                  Mobile banking with real-time account activity updates and alerts.
                </li>
                <li class="d-flex"><i class="fa fa-check mt-xl-2 mt-1 mr-2"></i>
                  Earn rewards, cash back, and discounts via integrated apps and features.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row py-4">
          <div class="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
            <div class="mb-4">
              <h3 class="h3 mb-4 text-black">Savings with Implemify</h3>
            </div>

            <div class="mb-4">
              <ul class="list-unstyled">
                <li class="d-flex"><i class="fa fa-check mt-xl-2 mt-1 mr-2"></i>
                  Lower fees than traditional banks, with competitive APY on account balances.
                </li>
                <li class="d-flex"><i class="fa fa-check mt-xl-2 mt-1 mr-2"></i>
                  Flexibility to link your digital account to existing accounts for easy fund transfers
                </li>
                <li class="d-flex"><i class="fa fa-check mt-xl-2 mt-1 mr-2"></i>
                  Simple and secure online experience for 24/7 banking convenience.
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
            <figure class="circle-bg">
              <img src={img_2} alt="Free Website Template by Free-Template.co" class="img-fluid" />
            </figure>
          </div>
        </div>

        <div class="row py-4">
          <div class="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
            <figure class="circle-bg">
              <img src={img_1} alt="Free Website Template by Free-Template.co" class="img-fluid" />
            </figure>
          </div>
          <div class="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
            <div class="mb-4">
              <h3 class="h3 mb-4 text-black">Implemify Loans</h3>
            </div>

            <div class="mb-4">
              <ul class="list-unstyled">
                <li class="d-flex"><i class="fa fa-check mt-xl-2 mt-1 mr-2"></i>
                  Intuitive application process that seamlessly stores and protects user data.
                </li>
                <li class="d-flex"><i class="fa fa-check mt-xl-2 mt-1 mr-2"></i>
                  Receive personalized offers based on your financial options and goals.
                </li>
                <li class="d-flex"><i class="fa fa-check mt-xl-2 mt-1 mr-2"></i>
                  Automatic withdrawals ensure you never miss a payment.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row pt-4">
          <div class="col-lg-12" data-aos="fade-up" data-aos-delay="100">
            <div class="mb-4">
              <h3 class="h3 mb-4 text-black text-center">
                Open an Implemify Account Today!
              </h3>
              <p>
                Take the first step towards more efficient, agile, and future-ready banking by applying today. Please know that we take your data privacy and security very seriously, so we do not collect any more information than is necessary to fulfill the purpose of
                your application, and we never share or sell your data to third parties.
              </p>
              <p>
                By submitting an application, you acknowledge that you have read and agree to our <a class="link" href="/#">privacy policy</a>, which outlines in detail how we handle and protect your personal data.
              </p>
              <p><em class="text-black">Questions? Our Customer Support Team is available via phone, email, or live chat 7/24</em></p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="container">

        <div class="row text-center">
          <div class="col-md-12">
            <div class="py-5">

              <p>Copyright &copy; 2024 Implemify Bank All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
)
}
export default Homepage;
