import React, { useState, useEffect } from 'react';
import { extractCode } from '../util/ExtractUtil.js';
import { chatSession } from '../service/AiModel.jsx';
import { RiSendPlaneFill, RiRobot2Line } from 'react-icons/ri';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { MdErrorOutline } from 'react-icons/md';
import Markdown from 'marked-react';

const ContentBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [problemTitle, setProblemTitle] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  const extractTitleFromURL = (url) => {
    const regex = /problems\/([\w-]+)\//;
    const match = url.match(regex);
    if (match && match[1]) {
      const formattedTitle = match[1].replace(/-/g, ' ').toLowerCase();
      setProblemTitle(formattedTitle);
    } else {
      console.log('Invalid URL format');
    }
  };

  useEffect(() => {
    const url = window.location.href || "";
    extractTitleFromURL(url);
  }, []);

  const userCurrentCodeContainer = document.querySelectorAll('.view-line');
  const extractedCode = extractCode(userCurrentCodeContainer);

  async function generateAnswer(requestType, customPrompt = "") {
    const userMessage =
      requestType === 'hint'
        ? 'Give a hint or tip to optimize'
        : requestType === 'check for error'
        ? 'Check for errors!'
        : customPrompt;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { user: 'User', message: userMessage, type: 'user' },
    ]);

    const prompt = `Leetcode question: "${problemTitle}"\nCode:\n${extractedCode}\n${
      customPrompt || `${requestType}`
    }.Give snippets instead of complete code. Max of 100 words.`;
    
    try {
      const response = await chatSession.sendMessage(prompt);
      const answer = await response.response.text();

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { user: 'AI', message: answer, type: 'ai' },
      ]);
    } catch (error) {
      console.error('Error generating answer:', error);
    }
  }
  return (
    <div className='absolute bottom-5'>
      {/* Floating button */} 
      <div
        className="z-50 fixed bottom-5 right-5 bg-white text-black p-2 rounded-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div><RiRobot2Line /></div>
      </div>

      {/* Popup div */}
      <div
        className={`fixed bottom-16 right-4 text-white w-[350px] max-h-[100vh] rounded-xl shadow-lg p-4 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'opacity-100 translate-y-0 z-50' : 'opacity-0 translate-y-60 z-0'
        } flex flex-col`} style={{background:'rgb(25,25,25)'}}
      >
      <div
        className="chat-history flex-grow h-80 overflow-y-auto mb-4 pr-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4A4A4A #1A1A1A',
        }}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
          >
            <div
              className={`p-2 text-sm max-w-[80%] bg-white rounded-lg ${
                chat.type === 'user'
                  ? 'font-semibold text-black rounded-l-lg'
                  : 'text-white rounded-r-lg bg-opacity-10'
              }`}
              style={{
                borderBottomRightRadius: chat.type === 'user' ? '0px' : '8px',
                borderBottomLeftRadius: chat.type === 'ai' ? '0px' : '8px',
              }}
            >
              <Markdown>{chat.message}</Markdown>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <input
          type="text"
          className="flex-grow p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
          placeholder="Type your message..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && userPrompt.trim()) {
              generateAnswer("custom", userPrompt);
              setUserPrompt("");
            }
          }}
        />
        <RiSendPlaneFill
          onClick={() => {
            if (userPrompt.trim()) {
              generateAnswer('custom', userPrompt);
              setUserPrompt("");
            }
          }}
          className="cursor-pointer text-white text-xl"
        />
        <HiOutlineLightBulb
          title="Give a hint" 
          onClick={() => generateAnswer('hint')}
          className="cursor-pointer text-white text-xl"
        />
        <MdErrorOutline
          title="Check for errors!" 
          onClick={() => generateAnswer('check for error')}
          className="cursor-pointer text-white text-xl"
        />
      </div>
    </div>`
    </div>
  );
};
export default ContentBox;