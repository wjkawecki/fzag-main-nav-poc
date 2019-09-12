import React from "react";

import "./MobileNavItem.scss";

function MobileNavItem({
  index,
  item,
  headingTop,
  headingBottom,
  scrollToItem,
  className,
  headingClassName,
  contentClassName
}) {
  return (
    <>
      <h2
        className={headingClassName}
        onClick={e => scrollToItem(index, e.target.nextSibling)}
        style={{
          top: headingTop,
          bottom: headingBottom
        }}
      >
        {item.text}
      </h2>
      <div className={contentClassName}>
        {item.groups.map((group, index) => (
          <div key={index} className={className + "-group"}>
            <span className={className + "-desc"}>{group.desc}</span>
            <ul className={className + "-items"}>
              {group.items.map((subitem, index) => (
                <li className={className + "-item"} key={index}>
                  <a className={className + "-link"} href={`#${subitem.link}`}>
                    › {subitem.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default React.memo(MobileNavItem);
