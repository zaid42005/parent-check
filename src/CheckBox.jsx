/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

function CheckboxGroup({ numChildrenPerFamily }) {
  const initialFamily = numChildrenPerFamily.map((numChildren) => ({
    parent: false,
    children: Array(numChildren).fill(false),
  }));

  const [selectAll, setSelectAll] = useState(false);
  const [families, setFamilies] = useState(initialFamily);

  useEffect(() => {
    const allChecked = families.every((family) => family.parent);
    setSelectAll(allChecked);
  }, [families]);

  const toggleFamilySelectAll = (familyIndex) => {
    const updatedFamilies = [...families]; //make a copy
    updatedFamilies[familyIndex].parent = !families[familyIndex].parent; // toggles parents
    updatedFamilies[familyIndex].children = updatedFamilies[familyIndex].parent //toggle children and update the children
      ? updatedFamilies[familyIndex].children.map(() => true) //gonna try implementing toggleChild instead of manually mapping them
      : updatedFamilies[familyIndex].children.map(() => false);
    setFamilies(updatedFamilies); 
  };

  const toggleChild = (familyIndex, childIndex) => {
    const updatedFamilies = [...families]; //copy
    updatedFamilies[familyIndex].children[childIndex] = //toggle the specific child
      !families[familyIndex].children[childIndex];
    updatedFamilies[familyIndex].parent = updatedFamilies[
      familyIndex
    ].children.every((child) => child); //check every kid and then update the parent
    setFamilies(updatedFamilies);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={() => {
            const updatedFamilies = families.map((family) => ({
              parent: !selectAll,
              children: Array(family.children.length).fill(!selectAll),
            }));
            setFamilies(updatedFamilies);
          }}
        />
        Select All
      </label>
      <br />
      {families.map((family, familyIndex) => (
        <div key={familyIndex}>
          <label>
            <input
              type="checkbox"
              checked={family.parent}
              onChange={() => toggleFamilySelectAll(familyIndex)}
            />
            Parent {familyIndex + 1}
          </label>
          {family.children.map((child, childIndex) => (
            <label key={childIndex}>
              <input
                type="checkbox"
                checked={child}
                onChange={() => toggleChild(familyIndex, childIndex)}
              />
              Child {childIndex + 1}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CheckboxGroup;
