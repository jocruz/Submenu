import React, { useRef } from "react";
import { useGlobalContext } from "./Context";
import sublinks from "./data";

const Submenu = () => {
  const subMenuContainer = useRef(null);
  const { pageId, setPageId } = useGlobalContext();
  const currentPage = sublinks.find((link) => link.pageId === pageId);

  const handleMouseLeave = (event) => {
    const submenu = subMenuContainer.current;
    const { bottom, left, right } = submenu.getBoundingClientRect();
    const { clientX, clientY } = event;
    if (clientX < left + 1 || clientX > right - 1 || clientY > bottom - 1) {
      setPageId(null);
    }
  };
  return (
    <div
      ref={subMenuContainer}
      className={currentPage ? "submenu show-submenu" : "submenu"}
      onMouseLeave={handleMouseLeave}
    >
      {currentPage && (
        <>
          <h5>{currentPage.page}</h5>
          <div
            className="submenu-links"
            style={{
              gridTemplateColumns:
                currentPage?.links?.length > 3 ? "1fr 1fr" : "1fr",
            }}
          >
            {currentPage?.links?.map((data) => {
              return (
                <div key={data.id}>
                  <a className="submenu-links a" href={data.url}>
                    {data.icon}
                    {data.label}
                  </a>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Submenu;
