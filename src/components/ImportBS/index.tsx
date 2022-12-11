import "./index.css";
import { useState } from "react";
import Modal from "react-modal";
import { SKILLS } from "../../data/skills";
import { MATK_SKILLS } from "../../data/matkSkills";
import {
  Character,
  Monster,
  MonsterType,
  MONSTER_TYPES,
  Race,
  RACES,
  Size,
  SIZES,
} from "../../data/input";
import { capitalize, formatBattleStats } from "../../utils/format";
import { ELEMENTS, Element } from "../../data/element";
import { useBuild } from "../../hooks/useBuild";

const ImportBS = ({ isMATK }: { isMATK: boolean }) => {
  const skills = isMATK ? MATK_SKILLS : SKILLS;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [build, setBuild] = useState("1");
  const [skill, setSkill] = useState(skills["BASIC_ATTACK"].key);
  const [race, setRace] = useState(RACES[0]);
  const [element, setElement] = useState(ELEMENTS[0]);
  const [size, setSize] = useState(SIZES[0]);
  const [monsterType, setMonsterType] = useState(MONSTER_TYPES[0]);
  const [battleStats, setBattleStats] = useState("");

  const { build1, build2 } = useBuild();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const submit = () => {
    const response = formatBattleStats(battleStats, skill, {
      race,
      element,
      size,
      monsterType,
    }, isMATK);

    const characterCallback: (prevState: Character) => Character = (
      prevState: Character
    ) => ({
      ...prevState,
      skill,
      ATK: {
        ...prevState.ATK,
        equipATK: response.equipATK,
      },
      bypass: response.bypass,
      hp: {
        ...prevState.hp,
        percent: response.hp.percent,
        flat: response.hp.flat,
      },
      sp: {
        ...prevState.sp,
        percent: response.sp.percent,
        flat: response.sp.flat,
      },
      weapon: {
        ...prevState.weapon,
        level: response.weaponLVL,
        atk: response.baseATK,
      },
      modifiers: {
        ...prevState.modifiers,
        melee: response.melee,
        ranged: response.ranged,
        race: response.raceBonus,
        size: response.sizeBonus,
        class: !isMATK ? response.monsterTypeBonus : response.MATKpercent,
        monster: isMATK ? response.monsterTypeBonus : 0,
        targetProperty: response.propertyBonus,
        skill: response.skillBonus,
        critical: response.critical,
        skillProperty: response.elementBonuses,
      },
    });

    const monsterCallback: (prevState: Monster) => Monster = (
      prevState: Monster
    ) => ({
      ...prevState,
      element,
      race,
      size,
      type: monsterType,
    });

    if (build === "1") {
      build1.setCharacter(characterCallback);
      build1.setMonster(monsterCallback);
    } else {
      build2.setCharacter(characterCallback);
      build2.setMonster(monsterCallback);
    }

    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Import @BS</button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <h2>Importing @BS</h2>
        <ol>
          <li>
            <b>Make sure the chat is using all horizontal space available</b>
          </li>
          <li>Type @bs and /savechat ingame</li>
          <li>
            Look for the .txt file that will be located in: NovaRO\Chat. The
            format will be Chat_(chat-name)_(some-number)
          </li>
          <li>
            Copy the part where 'Battle Stats:' begins til walking speed
            information (end of battle stats)
          </li>
          <li>Fill the remaining fields and press submit.</li>
        </ol>
        <div className="form">
          <div className="selects">
            <div>
              <b>Build</b>
              <select
                value={build}
                onChange={(event) => setBuild(event.target.value)}
              >
                <option value="1">Build 1</option>
                <option value="2">Build 2</option>
              </select>
            </div>
            <div>
              <b>Skill</b>
              <select
                value={skill}
                onChange={(event) => setSkill(skills[event.target.value].key)}
              >
                {Object.values(skills).map((skill) => (
                  <option key={skill.key} value={skill.key}>
                    {skill.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <b>Enemy Race</b>
              <select
                value={race}
                onChange={(event) => setRace(event.target.value as Race)}
              >
                {Object.values(RACES).map((race) => (
                  <option key={race} value={race}>
                    {capitalize(race)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <b>Enemy Element</b>
              <select
                value={element}
                onChange={(event) => setElement(event.target.value as Element)}
              >
                {Object.values(ELEMENTS).map((element) => (
                  <option key={element} value={element}>
                    {capitalize(element)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <b>Enemy Size</b>
              <select
                value={size}
                onChange={(event) => setSize(event.target.value as Size)}
              >
                {Object.values(SIZES).map((size) => (
                  <option key={size} value={size}>
                    {capitalize(size)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <b>Enemy Class</b>
              <select
                value={monsterType}
                onChange={(event) =>
                  setMonsterType(event.target.value as MonsterType)
                }
              >
                {Object.values(MONSTER_TYPES).map((monsterType) => (
                  <option key={monsterType} value={monsterType}>
                    {capitalize(monsterType)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="battle-stats">
            <b>Battle stats:</b>
            <textarea
              value={battleStats}
              onChange={(event) => setBattleStats(event.target.value)}
            />
          </div>
          <div className="buttons">
            <button onClick={() => submit()}>Submit</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImportBS;
