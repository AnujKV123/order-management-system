import React, { useState, useRef, useEffect, useMemo } from "react";
import "../Styles/Dropdown.css";

type Option = {
  label: string;
  value: string;
  data?: any;
};

interface DropdownProps {
  options: Option[];
  value: Option | null;
  onChange: (selected: Option) => void;
  placeholder?: string;
  label?: string;
  enableSearch?: boolean;
}

const ITEMS_PER_PAGE = 10;

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  enableSearch = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLLIElement>(null);

  const filteredOptions = enableSearch
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const visibleOptions = useMemo(() => {
    return filteredOptions.slice(0, visibleCount);
  }, [filteredOptions, visibleCount]);

  //   const visibleOptions = filteredOptions.slice(0, visibleCount);
  //   const hasMore = visibleOptions.length < filteredOptions.length;

  const hasMore = useMemo(() => {
    return visibleOptions.length < filteredOptions.length;
  }, [visibleOptions, filteredOptions]);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setVisibleCount(ITEMS_PER_PAGE);
    }
  }, [isOpen, search]);

  useEffect(() => {
    if (!isOpen || !hasMore || !menuRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      {
        root: menuRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    // Defer observation until after render
    const timeout = setTimeout(() => {
      const sentinel = sentinelRef.current;
      if (sentinel) {
        observer.observe(sentinel);
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [isOpen, search, hasMore, visibleCount]);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      {label && <label className="dropdown-label">{label}</label>}

      <div
        className={`dropdown-control ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{value ? value.label : placeholder}</span>
        <span className="dropdown-arrow">▾</span>
      </div>

      {isOpen && (
        <div className="dropdown-menu" ref={menuRef}>
          {enableSearch && (
            <input
              type="text"
              className="dropdown-search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <ul className="dropdown-list">
            {visibleOptions.length > 0 ? (
              visibleOptions.map((option) => (
                <li
                  key={option.value}
                  className={`dropdown-item ${
                    value?.value === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="dropdown-item disabled">No options</li>
            )}
            {hasMore && (
              <li ref={sentinelRef} className="dropdown-item loading">
                Loading more...
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
