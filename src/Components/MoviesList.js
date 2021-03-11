import React, { useState } from "react";
import { moviesData } from "../movies";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import moment from "moment";
import Carsouel from "./Carousell";

const MoviesList = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Title");
  const [sortType, setSortType] = useState("aec");
  const [startDate, setStartDate] = useState(new Date(1605027709078));
  const [endDate, setEndDate] = useState(1615395967440);
  const [showModal, setShowModal] = useState(false);
  const [carouselData, setCarouselData] = useState([]);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const onShowModal = (imagesData) => {
    setCarouselData(imagesData);
    setShowModal(true);
  };
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  var filteredData = [];
  filteredData = moviesData.filter((book) => {
    return (
      book.Title.toLowerCase().includes(search.toLowerCase()) ||
      book.Director.toLowerCase().includes(search.toLowerCase()) ||
      book.Plot.toLowerCase().includes(search.toLowerCase())
    );
  });
  filteredData = filteredData.filter(
    (book) =>
      new Date(book.TimeStamp) >= new Date(startDate) &&
      new Date(book.TimeStamp) <= new Date(endDate)
  );

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

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3 mt-2">
            <label for="email">Search</label>
            <input
              placeholder=" Movie title description Director"
              type="text"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3 mt-2">
            <label for="email">Filter by date</label>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
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
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          {filteredData.map((movie, index) => (
            <div
              className="col-sm-3 m-5 d-flex align-items-stretch"
              key={index}
              onClick={() => onShowModal(movie.Images)}
            >
              <div className="card">
                <img
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
                    Released :{moment(movie.TimeStamp).format("MMMM Do YYYY")}
                  </h6>
                  <h6>Runtime : {movie.Runtime}</h6>
                  <h6>Director : {movie.Director}</h6>
                  {/* {calc(4)} */}
                  <p className="card-text">{movie.Plot}</p>
                </div>
              </div>
            </div>
          ))}
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
