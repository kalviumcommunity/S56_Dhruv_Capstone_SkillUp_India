import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import Lottie from 'react-lottie';
import animation2 from '../assets/animation2.json';
import './Skills.css';

const Skills = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/skills')
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => setSkillsData(data))
      .catch((error) => console.error('Error fetching skills:', error));
  }, []);
  

  const toggleSkill = (skill) => {
    setSelectedSkills((prevSelectedSkills) =>
      prevSelectedSkills.includes(skill)
        ? prevSelectedSkills.filter((selectedSkill) => selectedSkill !== skill)
        : [...prevSelectedSkills, skill]
    );
  };

  const isSkillSelected = (skill) => selectedSkills.includes(skill);

  const Options = {
    loop: true,
    autoplay: true,
    animationData: animation2,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Nav />
      <div className="hero">
        <div className="hero-text">
          <h2 className="skills">Skills</h2>
          <p className="h-2">Skills create opportunities and connect societies. They are the foundation of economic progress.</p>
        </div>
        <div className="animation-2">
          <Lottie options={Options} height={600} width={600} />
        </div>
      </div>
      <p className="s-t-1"> 🎓 {selectedSkills.length > 0 ? `Showing ${selectedSkills.length} skills for people who like…` : 'What kind of skills are you interested in?'}</p>
      <div className="grid-container">
        {skillsData.map((skill) => (
          <div key={skill._id} className="grid-item">
            <img src={skill.image} alt={skill.skillsName} />
            <h3>{skill.skillsName}</h3>
            <p>{skill.category}</p>
            <button className={`button-54 ${isSkillSelected(skill.skillsName) ? 'selected' : ''}`} onClick={() => toggleSkill(skill.skillsName)}>
              {isSkillSelected(skill.skillsName) ? 'Selected' : 'Select'}
            </button>
            {isSkillSelected(skill.skillsName) && (
              <button className="delete" onClick={() => toggleSkill(skill.skillsName)}>
                X
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Skills;
