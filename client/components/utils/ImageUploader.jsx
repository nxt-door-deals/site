import React, { useCallback } from "react";
import Dropzone from "react-dropzone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faBan,
  faCamera,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ImageUploader = (props) => {
  // Dropzone
  // Copy the state to a new array and use that to update the changed state
  var newFiles = [...props.files];

  newFiles = newFiles.slice(0, 10);

  const onDrop = useCallback((acceptedFiles) => {
    props.setFieldTouched(true);
    props.setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  const images = newFiles.map((file, index) => {
    return (
      <div key={index}>
        <div>
          <img src={file.preview} width="90px" alt={file.name} />
          <p
            onClick={() => {
              newFiles.splice(newFiles.indexOf(file), 1);
              props.setFiles(newFiles);
            }}
            className="text-xs text-center pt-1 cursor-pointer font-axiforma text-brand-gray"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1" />
            Remove
          </p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-col font-axiforma">
        {props.uploadedImages === 0 && (
          <h1 className="my-4 text-sm text-center">
            {newFiles.length === 0
              ? "Upload up to 10 photos"
              : `Uploaded ${newFiles.length} of 10 photos`}
          </h1>
        )}

        {/* {props.uploadedImages && (
          <h1 className="mt-8 mb-4 text-gray-600 text-sm">
            Uploaded {props.uploadedImages} of{" "}
            {10 - parseInt(props.uploadedImages)} photos
          </h1>
        )} */}

        <p className="my-3 text-xs text-center">
          Accepted image formats - <span className="text-purple-700">jpeg</span>
          , <span className="text-purple-700">bmp</span>,{" "}
          <span className="text-purple-700">tiff</span>,{" "}
          <span className="text-purple-700">webp</span>,{" "}
          <span className="text-purple-700">png</span> and{" "}
          <span className="text-purple-700">gif</span>.
        </p>

        <Dropzone
          accept="image/jpg, image/jpeg, image/bmp, image/tiff, image/png, image/gif, image/webp"
          onDrop={onDrop}
          maxFiles={
            props.uploadedImages ? 10 - parseInt(props.uploadedImages) : 10
          }
        >
          {({ getRootProps, getInputProps, isDragReject }) => (
            <section>
              {(
                !props.uploadedImages
                  ? newFiles.length < 10
                  : newFiles.length < 10 - parseInt(props.uploadedImages)
              ) ? (
                <div className="w-full">
                  <div
                    {...getRootProps()}
                    className="text-center py-8 bg-gray-200 border-dashed border-purple-700 rounded-xl border-2 cursor-pointer focus:outline-none"
                  >
                    <input {...getInputProps()} />
                    <FontAwesomeIcon icon={faCamera} className="text-3xl" />
                  </div>
                </div>
              ) : (
                <div className=" flex flex-col items-center p-8 bg-gray-200 border-dashed rounded-xl border-red-800 border-2 cursor-not-allowed focus:outline-none">
                  <FontAwesomeIcon
                    icon={faBan}
                    className="text-3xl text-red-800"
                  />
                  {props.uploadedImages === 10 ? (
                    <div className="text-xs text-red-800 pt-2 text-center">
                      <p className="py-2">Sorry! 10 is the limit.</p>
                      <p>You can delete existing photos to upload new one's.</p>
                    </div>
                  ) : (
                    <p className="text-xs text-red-800 pt-2">
                      Sorry!{" "}
                      {!props.uploadedImages
                        ? "10"
                        : 10 - parseInt(props.uploadedImages)}{" "}
                      is the limit.
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-5 gap-3 mt-4 pt-2">
                {images.slice(0, 10)}
              </div>

              {isDragReject && (
                <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Accepted
                  image formats - jpeg, bmp, tiff, png and gif
                </div>
              )}
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default ImageUploader;
