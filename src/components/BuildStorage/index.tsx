import React, { useState } from "react";
import Modal from "react-modal";
import useStorage from "../../hooks/useStorage";

import "./index.css";

const BuildStorage = ({ isMATK }: { isMATK: boolean }) => {
  const { builds, save, load, remove } = useStorage(isMATK);

  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <button onClick={() => openModal()}>Builds</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="build-storage-modal"
        overlayClassName="build-storage-modal-overlay"
        ariaHideApp={false}
      >
        <h1>Build Storage</h1>

        <div className="save-area">
          <b>Wanna save the current build? Type the name below.</b>
          <div className="build-name-input">
            <input
              type="text"
              placeholder="Build name"
              value={value}
              onChange={onChange}
            />
            <button onClick={() => save(value)}>Save</button>
          </div>
        </div>

        <div className="stored-builds">
          <b>Stored builds:</b>
          <div className="builds">
            {builds.map((build, i) => (
              <div key={i} className="stored-build">
                <span>{build}</span>
                <div>
                  <button
                    className="load-button"
                    onClick={() => {
                      load(build);
                      closeModal();
                    }}
                  >
                    Load
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => {
                      // eslint-disable-next-line no-restricted-globals
                      const response = confirm(
                        "Are you sure? After deleting a build, you can't recover it."
                      );

                      if (response) remove(build);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BuildStorage;
