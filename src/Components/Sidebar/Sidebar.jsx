import React, { useContext } from "react";
import "./Sidebar.css";
import { assests } from "../../assets/assests.js";
import { useState } from "react";
import { Context } from "../../Context/Context.jsx";
function Sidebar() {
  const [extended, setextended] = useState(false);
  const { 
    previousPrompt,
    setPreviousPrompt,
    onSend,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    } = useContext(Context)

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=>setextended((prev)=>!prev)} className="menu" src={assests.menu_icon} alt="" />
        <div className="new-chat">
          <img src={assests.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {previousPrompt.map((item,index)=>{
              return (
                <div key={index} className="recent-entry">
                <img src={assests.message_icon} alt="" />
                <p>{item.slice(0,21)}</p>
              </div>
              )
            })}
           
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assests.question_icon} alt="" />
         {extended ? <p>Help</p> : null} 
        </div>
        <div className="bottom-item recent-entry">
          <img src={assests.history_icon} alt="" />
          {extended ?  <p>History</p> :null } 
        </div>
        <div className="bottom-item recent-entry">
          <img src={assests.setting_icon} alt="" />
         {extended ? <p>Setting</p>: null } 
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
