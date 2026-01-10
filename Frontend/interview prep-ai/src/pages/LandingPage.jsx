import React, { useContext, useState } from "react";
import HERO_IMG from "../assets/hero_image.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Modal from "../components/Modal";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";
const LandingPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true)
    } else {
      navigate("/dashboard")
    }
  };
  return (
    <>
      <div className="w-full min-h-screen bg-[#FFFCEF] relative overflow-hidden">

        {/* Yellow Blur Background */}
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0"></div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">

          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl font-bold text-black">Interview Prep AI</div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center">

            {/* Left Content */}
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles /> AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with
                <br />

                <span className="font-semibold bg-gradient-to-r from-[#FF9324] to-[#FCD760] bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is here.
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Click Here for Start your prep
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* part2 */}
        <div className="w-full relative z-10">
        <section className="
    flex justify-center 
    -mt-[80px]        
    md:-mt-[150px]   
    lg:-mt-[380px]" >  
          <img
            src={HERO_IMG}
            alt="HERO IMAGE"
            className="w-[95vw] md:w-[80vw] max-w-[900px] rounded-xl shadow-xl"
          />
        </section>
      </div>

      {/* part3 */}
      <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-2xl font-medium text-center mb-12">
              Features That Make You Shine
            </h2>
            <div className="flex flex-col items-center gap-8">
              {/* first 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0.3).map((feature) => (
                  <div key={feature.id}
                    className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Remaninig 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {APP_FEATURES.slice(0.3).map((feature) => (
                  <div key={feature.id} className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        
        {/* footer */}
        <div className="bg-gray-50 mt-10 px-6 py-10 text-center space-y-4">

  {/* Brand */}
  <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide">
    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
      bg-clip-text text-transparent">
      Interview Prep AI
    </span>
  </h2>

  {/* Subtitle */}
  <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
    Your AI-powered interview preparation platform to practice real questions,
    receive instant feedback, and boost your confidence.
  </p>
  {/* Divider */}
  <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 
    mx-auto rounded-full my-4"></div>

  {/* Feature Highlights */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm">
    <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      🤖 <span className="font-semibold">AI Feedback</span>
      <p className="text-gray-500 mt-1">
        Get instant, smart feedback on your answers.
      </p>
    </div>

    <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      🎯 <span className="font-semibold">Mock Interviews</span>
      <p className="text-gray-500 mt-1">
        Practice real interview scenarios anytime.
      </p>
    </div>

    <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      📈 <span className="font-semibold">Skill Growth</span>
      <p className="text-gray-500 mt-1">
        Track progress and improve with confidence.
      </p>
    </div>
  </div>

  {/* Links */}
  <div className="flex justify-center gap-6 text-sm text-gray-500 pt-4">
    <span className="hover:text-gray-700 cursor-pointer">Privacy Policy</span>
    <span className="hover:text-gray-700 cursor-pointer">Terms of Service</span>
    <span className="hover:text-gray-700 cursor-pointer">Contact Us</span>
  </div>

  {/* Copyright */}
  <p className="text-xs text-gray-400 pt-2">
    © 2026 Interview Prep AI. All rights reserved.
  </p>

</div>

      {/* part4 */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader

      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
</div>

    </>
  );
};

export default LandingPage;
