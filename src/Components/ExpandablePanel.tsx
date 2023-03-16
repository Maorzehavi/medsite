interface ExpandablePanelProps {
  header: JSX.Element;
  children?: JSX.Element;
}
function ExpandablePanel(props: ExpandablePanelProps) {
  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {props.header}
      </div>
      <div className="p-2 border-t">{props.children}</div>
    </div>
  );
}

export default ExpandablePanel;
