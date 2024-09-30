"use client";

import { ArrowUpIcon } from "lucide-react";
import React, { useState, useEffect, CSSProperties } from "react";
import { animateScroll } from "react-scroll";

const BackToTop: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    // التحقق من أن المكون يعمل فقط في بيئة المتصفح
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // أضف مستمع التمرير إذا كانت بيئة الجهة الأمامية
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    // قم بإزالة المستمع عند تنظيف useEffect
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      animateScroll.scrollToTop({
        behavior: "smooth",
        duration: 200,
      });
    }
  };

  const buttonStyles: CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "18px",
    zIndex: 1000,
    backgroundColor: "#2A54CA",
    color: "#ffffff",
    border: "none",
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
    opacity: showButton ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  return (
    <>
      {showButton && (
        <button
          className="back-to-top"
          onClick={handleClick}
          style={buttonStyles}
          aria-label="Back to top"
        >
          <ArrowUpIcon size={20} />
        </button>
      )}
    </>
  );
};

export default BackToTop;
