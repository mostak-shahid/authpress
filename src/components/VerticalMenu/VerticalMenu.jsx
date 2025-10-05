import { useState, useEffect } from "react";
import { NavigableMenu, MenuGroup, MenuItem } from "@wordpress/components";
import { chevronDown, chevronUp } from "@wordpress/icons";

// helper: find path to active url
const findActivePath = (items, currentUrl, parentKey = "") => {
  for (const [key, item] of Object.entries(items)) {
    const menuKey = parentKey ? `${parentKey}.${key}` : key;

    if (item.url === currentUrl) {
      return [menuKey];
    }

    if (item.sub) {
      const subPath = findActivePath(item.sub, currentUrl, menuKey);
      if (subPath.length) {
        return [menuKey, ...subPath];
      }
    }
  }
  return [];
};

const VerticalMenu = ({ menuData }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [activeKey, setActiveKey] = useState("");

  // initialize + listen for hash changes
  useEffect(() => {
    const setActiveFromHash = () => {
      const currentHash = window.location.hash.replace(/^#/, "");
      const path = findActivePath(menuData, currentHash);

      if (path.length) {
        setActiveKey(path[path.length - 1]);
        // expand parents if not already
        path.forEach((key, idx) => {
          if (idx < path.length - 1 && !openMenus[key]) {
            setOpenMenus((prev) => ({ ...prev, [key]: true }));
          }
        });
      }
    };

    setActiveFromHash();
    window.addEventListener("hashchange", setActiveFromHash);
    return () => window.removeEventListener("hashchange", setActiveFromHash);
  }, [menuData]);

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderMenuItems = (items, parentKey = "") =>
    Object.entries(items).map(([key, item]) => {
      const hasSub = item.sub && Object.keys(item.sub).length > 0;
      const menuKey = parentKey ? `${parentKey}.${key}` : key;
      const link = `/wp-admin/admin.php?page=authpress#${item.url}`;
      const isActive = activeKey === menuKey;
      const isOpen = !!openMenus[menuKey];

      return (
        <div key={menuKey} style={{ marginBottom: "4px" }}>
          <MenuItem
            href={hasSub ? undefined : link}
            onClick={() => hasSub && toggleMenu(menuKey)}
            icon={hasSub ? (isOpen ? chevronUp : chevronDown) : null}
            className={isActive ? "is-active" : ""}
          >
            {item.title}
          </MenuItem>

          {hasSub && (
            <div
              className={`submenu ${isOpen ? "submenu-open" : "submenu-closed"}`}
              style={{
                paddingLeft: "15px",
                display: isOpen ? "block" : "none",
              }}
            >
              {renderMenuItems(item.sub, menuKey)}
            </div>
          )}
        </div>
      );
    });

  return (
    <div style={{ width: "260px", border: "1px solid #ddd", padding: "10px" }}>
      <NavigableMenu orientation="vertical">
        <MenuGroup label="Settings Menu">{renderMenuItems(menuData)}</MenuGroup>
      </NavigableMenu>
    </div>
  );
};

export default VerticalMenu;
