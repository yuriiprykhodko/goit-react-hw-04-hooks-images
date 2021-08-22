import './ImageGalleryItem.css';

const ImageGalleryItem = ({ pictureId, srcWebformat, onClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img src={srcWebformat} alt="" className="ImageGalleryItemImage" />
    </li>
  );
};
export default ImageGalleryItem;
