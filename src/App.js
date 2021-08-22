import React, { useEffect, useState } from "react";
import "./styles.css";
import SearchBar from './Components/SearchBar';
import ImageGallery from "./Components/ImageGallery";
import ImageGalleryItem from "./Components/ImageGalleryItem";
import Button from "./Components/Button";
import Modal from "./Modal";
import api from "./Services/Api";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [request, setRequest] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!request) {
      return;
    }
    fatchPictures();
  }, [request]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [pictures]);

  const onChangeRequest = (query) => {
    setPictures([]);
    setRequest(query);
    setCurrentPage(1);
    setError(null);
  };

  const fatchPictures = () => {
    const option = { request, currentPage };
    setIsLoading(true);
    api
      .fatchPictures(option)
      .then(
        (picturesArr) => setPictures([...pictures, ...picturesArr]),
        setCurrentPage(currentPage + 1)
      )
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const onPictureClick = (url) => {
    setLargeImageURL(url);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const shouldRenderLoadMoreButton = pictures.length > 0 && !isLoading;
  return (
    <>
      <SearchBar onSubmit={onChangeRequest}></SearchBar>

      <ImageGallery>
        {pictures.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            srcWebformat={webformatURL}
            pictureId={id}
            onClick={() => onPictureClick(largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      {isLoading && (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}
      {shouldRenderLoadMoreButton && <Button onClick={fatchPictures} />}
    </>
  );
};

export default App;