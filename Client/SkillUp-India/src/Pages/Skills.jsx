import React, { useState } from 'react';
import Nav from '../Components/Nav';
import Lottie from 'react-lottie';
import animation2 from '../assets/animation2.json';
import './Skills.css';

const Skills = () => {
  const [selectedSkills, setSelectedSkills] = useState([]); 
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
      <div className="button-container">
        {['Being creative', 'Complex problems', 'Craftsmanship', 'Fixing things', 'Helping people', 'Making things', 'Using computers', 'Using tools', 'Working as a team'].map((skill) => (
          <div key={skill} className="button-wrapper">
            <button className={`button-54 ${isSkillSelected(skill) ? 'selected' : ''}`} onClick={() => toggleSkill(skill)}>
              {skill}
            </button>
            {isSkillSelected(skill) && (
              <button className="delete" onClick={() => toggleSkill(skill)}>
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
