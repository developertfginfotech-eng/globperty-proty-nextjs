import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import RoiCalculator from "@/components/tools/RoiCalculator";
import Cta from "@/components/common/Cta";
import Link from "next/link";

export const metadata = { title: "ROI & Capital Growth Estimator — Globperty" };

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">ROI & Capital Growth Estimator</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>ROI & Capital Growth Estimator</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <RoiCalculator />
        <Cta />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
