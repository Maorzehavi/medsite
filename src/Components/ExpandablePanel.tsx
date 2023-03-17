import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

interface ExpandablePanelProps {
  header: JSX.Element;
  children: JSX.Element;
}
function ExpandablePanel(props: ExpandablePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col border">
      <div className="flex flex-row justify-between m-3 shadow-md">
        <div className="">{props.header}</div>
        <div></div>
        <button className="mr-4 my-auto cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} title={isExpanded?`close`:`open`}>
          {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </button>
      </div>
      {isExpanded && <div className="m-3">{props.children}</div>}
    </div>
  );
}

export default ExpandablePanel;
