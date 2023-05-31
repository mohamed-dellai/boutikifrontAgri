import React from "react";

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex">
          <div className="left row">
            <i className="fa fa-phone"></i>
            <label> +216 27086716</label>
            <i className="fa fa-envelope"></i>
            <label> support@boutiki.com</label>
          </div>
          <div className="right row RText">
            <label>Need Help?</label>
            <span>🇹🇳</span>
            <label> USD</label>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
