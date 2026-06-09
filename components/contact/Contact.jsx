"use client";
import React from "react";
import DropdownSelect from "../common/DropdownSelect";
import MapComponent from "../common/MapComponent";

export default function Contact() {
  return (
    <section className="section-top-map style-2">
      <div className="wrap-map" style={{ marginBottom: 0 }}>
        <div
          id="map"
          className="row-height"
          data-map-zoom={16}
          data-map-scroll="true"
          style={{ height: 400 }}
        >
          <MapComponent />
        </div>
      </div>
      <div className="box">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <form
                id="contactform"
                onSubmit={(e) => e.preventDefault()}
                className="form-contact"
              >
                <div className="heading-section">
                  <h2 className="title">We&apos;re Here to Help</h2>
                  <p className="text-1">
                    Whether you&apos;re a buyer, seller, agent, or developer — our team is ready to assist you at every step of your property journey. Reach us at <strong>hello@globperty.com</strong> or fill the form below.
                  </p>
                </div>
                <div className="cols">
                  <fieldset>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      name="name"
                      id="name"
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      id="email-contact"
                      required
                    />
                  </fieldset>
                </div>
                <div className="cols">
                  <fieldset className="phone">
                    <label htmlFor="phone">Phone number:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your phone number"
                      name="phone"
                      id="phone"
                      required
                    />
                  </fieldset>
                  <div className="select">
                    <label className="text-1 fw-6 mb-12">
                      What are you interested in?
                    </label>

                    <DropdownSelect
                      options={["Select", "Location", "Rent", "Sale"]}
                      addtionalParentClass=""
                    />
                  </div>
                </div>
                <fieldset>
                  <label htmlFor="message">Your Message:</label>
                  <textarea
                    name="message"
                    cols={30}
                    rows={10}
                    placeholder="Message"
                    id="message"
                    required
                    defaultValue={""}
                  />
                </fieldset>
                <div className="send-wrap">
                  <button
                    className="tf-btn bg-color-primary fw-7 pd-8"
                    type="submit"
                  >
                    Contact our experts
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
