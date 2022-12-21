import "./index.css";
import { useState } from "react";
import Modal from "react-modal";
import { Skill, SKILLS } from "../../data/skills";
import { MATK_SKILLS } from "../../data/matkSkills";
import { capitalize, formatBattleStats } from "../../utils/format";
import { ELEMENTS, Element } from "../../data/element";
import { useBuild } from "../../hooks/useBuild";
import { Character, emptyCharacter } from "../../data/character";
import {
  RACES,
  SIZES,
  MONSTER_TYPES,
  Monster,
  Race,
  Size,
  MonsterType,
} from "../../data/monster";
import { getJobsName } from "../../data/job";
import { evaluate } from "mathjs";
import WeaponType, { WEAPONS } from "../../data/weapon";
import { getEquipMATK } from "../../services/matk";
import { getTraitBonuses } from "../../utils/helperFunctions";

const ImportBS = ({ isMATK }: { isMATK: boolean }) => {
  const skills = isMATK ? MATK_SKILLS : SKILLS;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [build, setBuild] = useState("1");
  const [skill, setSkill] = useState(skills["BASIC_ATTACK"].key);
  const [race, setRace] = useState(RACES[0]);
  const [element, setElement] = useState(ELEMENTS[0]);
  const [size, setSize] = useState(SIZES[0]);
  const [monsterType, setMonsterType] = useState(MONSTER_TYPES[0]);
  const [weaponType, setWeaponType] = useState(WEAPONS[0]);
  const [level, setLevel] = useState('0');
  const [stats, setStats] = useState({
    str: '0',
    agi: '0',
    vit: '0',
    int: '0',
    dex: '0',
    luk: '0',
  });
  const [traits, setTraits] = useState({
    pow: '0',
    sta: '0',
    wis: '0',
    spl: '0',
    con: '0',
    crt: '0',
  });
  const [battleStats, setBattleStats] = useState("");

  const { build1, build2 } = useBuild();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const submit = () => {
    const response = formatBattleStats(
      battleStats,
      skill,
      {
        race,
        element,
        size,
        monsterType,
      },
      isMATK
    );

    const equipMATK = getEquipMATK(
      {
        ...emptyCharacter,
        baseLevel: Number(level),
        stats: {
          ...emptyCharacter.stats,
          str: Number(stats.str),
          agi: Number(stats.agi),
          vit: Number(stats.vit),
          int: Number(stats.int),
          dex: Number(stats.dex),
          luk: Number(stats.luk),
        },
        traits: {
          ...emptyCharacter.traits,
          pow: Number(traits.pow),
          sta: Number(traits.sta),
          wis: Number(traits.wis),
          spl: Number(traits.spl),
          con: Number(traits.con),
          crt: Number(traits.crt),
        },
        weapon: {
          ...emptyCharacter.weapon,
          matk: response.baseMATK,
        },
        MATK: {
          ...emptyCharacter.MATK,
          matkPercent: response.MATKpercent,
        },
      },
      response.totalMATK,
    );

    const characterCallback: (prevState: Character) => Character = (
      prevState: Character
    ) => ({
      ...prevState,
      skill,
      baseLevel: Number(level),
      stats: {
        ...prevState.stats,
        str: Number(stats.str),
        agi: Number(stats.agi),
        vit: Number(stats.vit),
        int: Number(stats.int),
        dex: Number(stats.dex),
        luk: Number(stats.luk),
      },
      traits: {
        ...prevState.traits,
        pow: Number(traits.pow),
        sta: Number(traits.sta),
        wis: Number(traits.wis),
        spl: Number(traits.spl),
        con: Number(traits.con),
        crt: Number(traits.crt),
      },
      ATK: {
        ...prevState.ATK,
        equipATK: response.equipATK,
        patk: getTraitBonuses("pow", 0, Number(traits.pow)) + getTraitBonuses("con", 0, Number(traits.con)),
        crate: getTraitBonuses("crt", 0, Number(traits.crt))
      },
      MATK: {
        ...prevState.MATK,
        equipMATK: equipMATK,
        matkPercent: response.MATKpercent,
        smatk: getTraitBonuses("spl", 0, Number(traits.spl)) + getTraitBonuses("con", 0, Number(traits.con)),
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
        matk: response.baseMATK,
        type: weaponType,
      },
      modifiers: {
        ...prevState.modifiers,
        melee: response.melee,
        ranged: response.ranged,
        race: response.raceBonus,
        size: response.sizeBonus,
        class: !isMATK ? response.monsterTypeBonus : 0,
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

  const getValue = (obj: Record<string, string>, key: string) => {
    if (obj[key]) {
      return obj[key];
    }

    return '0';
  };

  const evaluateNumber = (value: string) => {
    try {
      const result = evaluate(value);
  
      if (result && !Number.isNaN(result)) {
        return `${result}`;
      }
  
      return '0';
    } catch (error) {
      return `${value}`;
    }
  };

  return (
    <div>
      <button onClick={openModal}>Import @BS</button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="import-bs-modal"
        overlayClassName="import-bs-modal-overlay"
        ariaHideApp={false}
      >
        <h2>Importing @BS</h2>
        <ol>
          <li>
            <b>Make sure the chat is using all horizontal space available</b>
          </li>
          <li>
            {!isMATK ? (
              <b>
                You need to fill 'POW', 'CON' and 'CRT' so your P.Atk and C.Rate are
                calculated correctly.
              </b>
            ) : (
              <b>
                You need to fill 'Level', 'INT', 'DEX', 'LUK', 'SPL' and 'CON'
                so your Equip MATK and S.Matk are calculated correctly.
              </b>
            )}
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
          <li><b>Don't forget to add passives and other adjustmens after importing your @bs.</b></li>
        </ol>
        <div className="form">
          <div className="inputs">
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
                  {["All", ...getJobsName()].map((job, i) => {
                    const jobOptions = Object.values(skills).filter(
                      (option) => option.job === job
                    );

                    return (
                      jobOptions.length > 0 && (
                        <optgroup key={i} label={capitalize(job)}>
                          {jobOptions.map((skill: Skill, i: number) => {
                            return (
                              <option key={i} value={skill.key}>
                                {capitalize(skill.label)}
                              </option>
                            );
                          })}
                        </optgroup>
                      )
                    );
                  })}
                </select>
              </div>
              <div>
                <b>Weapon</b>
                <select
                  value={weaponType}
                  onChange={(event) =>
                    setWeaponType(event.target.value as WeaponType)
                  }
                >
                  {Object.values(WEAPONS).map((weaponType) => (
                    <option key={weaponType} value={weaponType}>
                      {capitalize(weaponType)}
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
                  onChange={(event) =>
                    setElement(event.target.value as Element)
                  }
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
            <div className="stats">
              <div>
                <b>Level</b>
                <input
                  type="text"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  onBlur={(event) => {
                    const value = evaluateNumber(event.target.value);
                    let parsedValue = parseInt(value);
                    parsedValue = Math.max(parsedValue, 1);
                    parsedValue = Math.min(parsedValue, 250);

                    setLevel(`${parsedValue}`);
                  }}
                />
              </div>
              {Object.keys(stats).map((stat) => (
                <div key={stat}>
                  <b>{stat.toLocaleUpperCase()}</b>
                  <input
                    type="text"
                    value={getValue(stats, stat)}
                    onChange={(event) =>
                      setStats({ ...stats, [stat]: event.target.value })
                    }
                    onBlur={(event) =>
                      setStats({
                        ...stats,
                        [stat]: evaluateNumber(event.target.value),
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <div className="stats">
              {Object.keys(traits).map((trait) => (
                <div key={trait}>
                  <b>{trait.toLocaleUpperCase()}</b>
                  <input
                    type="text"
                    value={getValue(traits, trait)}
                    onChange={(event) =>
                      setTraits({ ...traits, [trait]: event.target.value })
                    }
                    onBlur={(event) =>
                      setTraits({
                        ...traits,
                        [trait]: evaluateNumber(event.target.value),
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <div></div>
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
