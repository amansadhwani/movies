import React, { useState, useEffect } from "react";
import { moviesData } from "../movies";

import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import moment from "moment";
import Carsouel from "./Carousell";
import ReusableButton from "./ReusableButton";

const MoviesList = (props) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Title");
  const [sortType, setSortType] = useState("aec");
  const [price, setPrice] = useState("low");

  const [showModal, setShowModal] = useState(false);
  const [carouselData, setCarouselData] = useState([]);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const onShowModal = (imagesData) => {
    setCarouselData(imagesData);
    setShowModal(true);
  };

  var filteredData = [];
  filteredData = moviesData.filter((book) => {
    return (
      book.Title.toLowerCase().includes(search.toLowerCase()) ||
      book.Director.toLowerCase().includes(search.toLowerCase()) ||
      book.Plot.toLowerCase().includes(search.toLowerCase())
    );
  });

  filteredData = filteredData.sort(function (a, b) {
    let nameA = a && a[sortBy] && a[sortBy].toUpperCase(); // ignore upper and lowercase
    let nameB = b && b[sortBy] && b[sortBy].toUpperCase(); // ignore upper and lowercase
    if (sortType === "aec") {
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    } else {
      if (nameB < nameA) {
        return -1;
      }
      if (nameB > nameA) {
        return 1;
      }
    }

    // names must be equal
    return 0;
  });

  filteredData = filteredData.sort(function (a, b) {
    if (price === "low") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else {
      return parseFloat(b.price) - parseFloat(a.price);
    }
  });

  useEffect(() => {
    props.clearCart();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3 mt-2">
            <label for="email">Search</label>
            <input
              placeholder=" Movie title  Director"
              type="text"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3 mt-2">
            <label for="email">Sort by</label>
            <select
              className="browser-default custom-select"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Title">Title</option>
              <option value="Director">Director</option>
            </select>
          </div>
          <div className="col-md-3 mt-2">
            <label for="email">Sort Type</label>
            <select
              className="browser-default custom-select"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="aec">Ascending</option>
              <option value="dec">Descending</option>
            </select>
          </div>
          <div className="col-md-3 mt-2">
            <label for="email">Sort By Price</label>
            <select
              className="browser-default custom-select"
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="low">Low To High</option>
              <option value="high">High To Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          {filteredData.length !== 0 ? (
            <>
              {filteredData.map((movie, index) => (
                <div
                  className="col-sm-3 m-5 d-flex align-items-stretch"
                  key={index}
                >
                  <div className="card">
                    <img
                      onClick={() => onShowModal(movie.Images)}
                      src={movie.Images[0]}
                      className="card-img-top fixed-img"
                      alt=""
                    />
                    <div className="card-body">
                      {
                        <span>
                          {Array.from(Array(movie.imdbRating), (e, i) => {
                            return (
                              <span key={i}>
                                <span className="fa fa-star checked"></span>
                              </span>
                            );
                          })}
                        </span>
                      }

                      <h6>{movie.imdbRating} Star Rating</h6>
                      <h5 className="card-title">{movie.Title}</h5>
                      <h6>
                        Released :
                        {moment(movie.TimeStamp).format("MMMM Do YYYY")}
                      </h6>

                      <h6>Director : {movie.Director}</h6>
                      <h6>Price : {movie.price} $</h6>
                      <ReusableButton
                        addToGlobalCart={(count) =>
                          props.addToGlobalCart(count, movie)
                        }
                      />
                      {/* {calc(4)} */}
                      {/* <p className="card-text">{movie.Plot}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h2 className="m-5">No Records Found</h2>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header className="py-0 pt-2 border-0"></Modal.Header>
        <Modal.Body className="f16-500">
          {" "}
          <Carsouel carouselData={carouselData} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MoviesList;
