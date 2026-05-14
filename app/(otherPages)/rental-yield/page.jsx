import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import RentalYieldCalculator from "@/components/tools/RentalYieldCalculator";
import Cta from "@/components/common/Cta";
import Link from "next/link";

export const metadata = { title: "Rental Yield Calculator — Globperty" };

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <div className="page-title" style={{ backgroundImage: "url('/images/section/page-title-2.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: "132px 0 232px" }}>
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Rental Yield Calculator</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Rental Yield Calculator</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <RentalYieldCalculator />
        <Cta />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
