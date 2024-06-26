// Autocomplete.tsx
import { Input } from "@nextui-org/react";
import { useClickAway } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import { debounce } from "lodash";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * @typedef {Object} Option
 * @property {string} name
 * @property {string} value
 */

const Autocomplete = ({
  options,
  loadOptions,
  showClearButton = false,
  label,
  placeholder,
  selectedOption,
  setSelectedOption,
  onSelectionChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const [defaultValueSelected, setDefaultValueSelected] = useState(false);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  const handleOptionClick = (option) => {
    setInputValue(option.name);
    setFilteredOptions([option]);
    setIsFocused(false);
    setSelectedOption(option);
    if (typeof onSelectionChange === "function") {
      onSelectionChange(option);
    }
  };

  const handleClearInput = () => {
    setInputValue("");
    setFilteredOptions(options);
    setIsFocused(false);
    setSelectedOption(() => {});
    if (typeof onSelectionChange === "function") {
      onSelectionChange(null);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300); // Adjust debounce time as needed

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (loadOptions) {
      setLoading(true);
      loadOptions()
        .then((options) => {
          setFilteredOptions(options);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setFilteredOptions(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, loadOptions, debouncedValue]);

  useEffect(() => {
    if (
      inputRef.current &&
      selectedOption?.length > 0 &&
      inputValue.length === 0 &&
      !defaultValueSelected
    ) {
      const selected = options.find(
        (option) => option?.value === selectedOption
      );
      setInputValue(selected?.name || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, inputRef, inputValue]);

  useEffect(() => {
    const fuse = new Fuse(options, {
      keys: ["name"],
      includeScore: true,
      threshold: 0.3,
      includeMatches: true,
      distance: 100,
      isCaseSensitive: false,
    });

    if (debouncedValue) {
      const result = fuse.search(debouncedValue);
      setFilteredOptions(result.map(({ item }) => item));
    } else {
      setFilteredOptions(options);
    }
  }, [options, debouncedValue]);

  useEffect(() => {
    const iR = inputRef.current;
    const lR = listRef.current;
    if (!iR) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsFocused(false);
      } else if (event.key === "Enter") {
        setIsFocused(false);
      } else if (event.key === "ArrowDown") {
        if (lR) {
          lR.firstChild.focus();
        }
      } else if (event.key === "ArrowUp") {
        if (lR) {
          lR.lastChild.focus();
        }
      } else if (event.key === "Tab") {
        setIsFocused(true);
      }
    };
    const handleInputClick = (event) => {
      if (
        iR.current &&
        !iR.current.contains(event.target) &&
        !lR.contains(event.target)
      ) {
        setIsFocused(false);
      }
      setIsFocused(true);
    };

    const handleDocumentClick = (event) => {
      if (!event.target.contains(iR) && !event.target.contains(lR)) {
        setIsFocused(false);
      }
    };
    iR.addEventListener("click", handleInputClick);
    iR.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      iR.removeEventListener("keydown", handleKeyDown);
      iR.removeEventListener("click", handleInputClick);
      document.removeEventListener("click", handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef]);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        label={label}
        labelPlacement="outside"
        radius="sm"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        classNames={{
          label: "font-medium text-zinc-100",
          inputWrapper: "border shadow-none",
        }}
        // className="w-full rounded-xl border bg-zinc-100 p-2"
      />
      {showClearButton && inputValue && (
        <button
          onClick={handleClearInput}
          className="absolute right-2 top-8 rounded-2xl bg-zinc-900 px-2 py-1 text-xs font-semibold text-white"
        >
          Clear
        </button>
      )}
      {!inputValue && (
        <button className="absolute right-1.5 top-8 rounded-2xl bg-transparent px-2 py-1 text-xs font-semibold text-zinc-800">
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
      <AnimatePresence>
        {loading ? (
          <div>Loading...</div>
        ) : (
          isFocused && (
            <motion.ul
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0.3,
                ease: "easeIn",
              }}
              initial={{ y: 0, scale: 0.75, opacity: 0.75 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                // transition: {
                //   duration: 0.2,
                // },
              }}
              exit={{
                y: -10,
                scale: 0.65,
                opacity: 0,
                // transition: {
                //   duration: 0.15,
                // },
              }}
              key="options"
              layout
              ref={listRef}
              className="absolute z-[500] mt-2.5 max-h-[300px] w-full origin-top overflow-hidden overflow-y-auto rounded-2xl border bg-white p-2 shadow-xl scrollbar-hide"
            >
              {filteredOptions.map((option, i) => (
                <motion.li
                  layout="position"
                  key={option?.value + i}
                  onClick={() => {
                    setIsFocused(false);
                    handleOptionClick(option);
                  }}
                  className="cursor-pointer rounded-xl p-2 text-sm font-medium hover:bg-gray-200 z-[600]"
                >
                  {option.name}
                </motion.li>
              ))}
              {filteredOptions.length === 0 && (
                <motion.li
                  layout="position"
                  key={"not-found"}
                  className="cursor-pointer rounded-xl p-2 text-sm font-medium hover:bg-gray-200"
                >
                  Not found
                </motion.li>
              )}
            </motion.ul>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

Autocomplete.displayName = "Autocomplete";

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  loadOptions: PropTypes.func,
  showClearButton: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  //string or function
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  setSelectedOption: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
  onSelectionChange: PropTypes.func,
};

export default Autocomplete;
