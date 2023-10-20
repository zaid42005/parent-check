import React, { useState, useEffect } from 'react';

function CheckboxGroup() {//hardcoded boolean arrays for now 
  const [selectAll, setSelectAll] = useState(false);
  const [parents, setParents] = useState([false, false, false]);
  const [children, setChildren] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

  const toggleSelectAll = () => {
    const allChecked = !selectAll; //once its toggled it takes the switches the value and sets it to the button
    setSelectAll(allChecked);

    const updatedParents = parents.map(() => allChecked);//then maps that value onto parents
    setParents(updatedParents);

    const updatedChildren = children.map(() =>//then maps that value onto children
      children[0].map(() => allChecked)
    );
    setChildren(updatedChildren);
  };

  const handleParentChange = (parentIndex) => {
    const updatedParents = [...parents]; //make a copy just in case
    updatedParents[parentIndex] = !parents[parentIndex]; //switch value
    setParents(updatedParents);

    const updatedChildren = [...children]; //same thing but for the kids
    updatedChildren[parentIndex] = updatedParents[parentIndex] //pass that parent value down and use an if for safety
      ? updatedChildren[parentIndex].map(() => true)
      : updatedChildren[parentIndex].map(() => false);
    setChildren(updatedChildren);

    
    setSelectAll(false); //will deal w this later
  };

  const handleChildChange = (parentIndex, childIndex) => {
    const updatedChildren = [...children];
    updatedChildren[parentIndex][childIndex] = !children[parentIndex][childIndex]; // same logic as above
    setChildren(updatedChildren);
  
    const updatedParents = [...parents];
  

    updatedParents[parentIndex] = updatedChildren[parentIndex].every( //check parent against all children
      (child) => child === true
    );
  
    setParents(updatedParents);
  
    setSelectAll(false);
  };
  
  

  
  useEffect(() => {// useEffect clutching up for the selectAll button 
    const allParentsChecked = parents.every((parent) => parent === true);
    const allChildrenChecked = children.every((childRow) => childRow.every((child) => child === true)
    );
    setSelectAll(allParentsChecked && allChildrenChecked);
  }, [parents, children]);

  return (
    <div >
      <label>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
        />
        Select All
      </label>
      {parents.map((parent, parentIndex) => (
        <div key={parentIndex} >
          <label >
            <input
              type="checkbox"
              checked={parent}
              onChange={() => handleParentChange(parentIndex)}
            />
            Parent {parentIndex + 1}
            
            {children[parentIndex].map((child, childIndex) => (
            <label key={childIndex} style={{ display: "flex", flexDirection: "column"}}  >
              <input
                type="checkbox"
                checked={child}
                onChange={() => handleChildChange(parentIndex, childIndex)}
              />
              Child {childIndex + 1}
            </label>
          ))}

          </label >
        </div>
        
      ))}
    </div>
  );
}

export default CheckboxGroup;
