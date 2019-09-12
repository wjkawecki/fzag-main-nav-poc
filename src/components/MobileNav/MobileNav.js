import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MobileNavItem from "../MobileNavItem/MobileNavItem";
import Button from "../Button/Button";

import "./MobileNav.scss";

function MobileNav({ data, isOpen, closeNav }) {
  const element = useRef();
  const navItemClassName = "MobileNavItem";
  const navItemHeadingClassName = navItemClassName + "-heading";
  const navItemContentClassName = navItemClassName + "-content";
  const [navItemHeadingHeights, setNavItemHeadingHeights] = useState([]);
  const [backgroundSize, setBackgroundSize] = useState(0);

  const scrollToItem = (index, nextSibling) => {
    const offsetTop =
      nextSibling.offsetTop -
      navItemHeadingHeights.slice(0, index + 1).reduce((a, b) => a + b, 0);

    element.current.scroll({
      top: offsetTop,
      left: 0,
      behavior: "smooth"
    });
  };

  const scrollListener = () => {
    const currentState = element.current.scrollTop;
    const containerHeight =
      element.current.scrollHeight - element.current.clientHeight;
    const scrollStatePercentage = (currentState / containerHeight) * 100;

    return scrollStatePercentage;
  };

  const handleScroll = () => {
    setBackgroundSize(scrollListener());
  };

  useEffect(() => {
    const nav = element.current;
    const navItemsHeadings = nav
      ? [...element.current.querySelectorAll(`.${navItemHeadingClassName}`)]
      : [];
    const navItemHeadingHeights = [];

    navItemsHeadings.forEach(heading => {
      navItemHeadingHeights.push(heading.offsetHeight);

      setNavItemHeadingHeights(navItemHeadingHeights);
    });
  }, [isOpen, navItemHeadingClassName]);

  useEffect(() => {
    const nav = element.current;
    const navItemsContents = nav
      ? [...element.current.querySelectorAll(`.${navItemContentClassName}`)]
      : [];
    const lastNavItemsContent =
      navItemsContents.length && navItemsContents[navItemsContents.length - 1];

    if (lastNavItemsContent) {
      lastNavItemsContent.style.minHeight =
        nav.offsetHeight -
        navItemHeadingHeights.reduce((a, b) => a + b, 0) +
        "px";
    }
  }, [navItemHeadingHeights, navItemContentClassName]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          key="MobileNav"
          className="MobileNav"
          ref={element}
          style={{ backgroundSize: `3px ${backgroundSize}%` }}
          onScroll={handleScroll}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          {data.map((item, index) => (
            <MobileNavItem
              key={index}
              className={navItemClassName}
              headingClassName={navItemHeadingClassName}
              contentClassName={navItemContentClassName}
              index={index}
              item={item}
              headingTop={navItemHeadingHeights
                .slice(0, index)
                .reduce((a, b) => a + b, 0)}
              headingBottom={[...navItemHeadingHeights]
                .reverse()
                .slice(0, navItemHeadingHeights.length - index - 1)
                .reduce((a, b) => a + b, 0)}
              scrollToItem={scrollToItem}
            />
          ))}
          <div className="MobileNav-buttons">
            <Button type="circle">DE</Button>
            <Button type="circle">Me</Button>
            <Button type="circle" onClick={closeNav}>
              x
            </Button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default MobileNav;
