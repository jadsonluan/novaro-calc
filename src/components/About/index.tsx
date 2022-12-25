import React, { useState } from "react";
import Modal from "react-modal";
import './index.css'

const About = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>About</button>
      <Modal
        isOpen={show}
        onRequestClose={handleClose}
        contentLabel="Example Modal"
        className="about-modal"
        overlayClassName="about-modal-overlay"
        ariaHideApp={false}
      >
        <h2>About</h2>
        <p>
          This is a tool to help you build your character in NovaRO.
        </p>
        <p>
          Most of the information to be add can be obtained from @battlestats or @bs.
          But some information is not available in @bs, so you will have to
          manually input it.
          <ul>
            <li>Weapon and Shadow Weapon refines</li>
            <li>If a buff is in the 'Buffs' list, all of its bonuses will be applied but wont show directly on the input fields. (Example: buffs that increase POW/SPL will increase not only your POW/SPL but also your P.Atk/S.Matk)</li>
            <li>If a buff is not on the 'Buffs' lists, then you need to manually add its bonuses</li>
            <li>Mastery ATK: Verify your character passives</li>
          </ul>
        </p>
        <p>
          Stuff that is not yet implemented:
          <ul>
            <li><b>HP AND SP calculations are using 3rd job formulas, so ignore them for now.</b></li>
            <li>Inquisitor Skills</li>
            <li>Meister Skills</li>
            <li>Biolo Acid Skills</li>
          </ul>
        </p>
        <p>
          This tool is a work in progress. If you have any suggestions or
          feedback, please contact me at my{" "}
          <a style={{color: 'white'}} href="mailto:gabmla19@gmail.com">Gmail</a> or Gabriel M.#6838 on Discord.
        </p>
        <div className="buttons">
            <button onClick={handleClose}>Close</button>
          </div>
      </Modal>
    </>
  );
};

export default About;
