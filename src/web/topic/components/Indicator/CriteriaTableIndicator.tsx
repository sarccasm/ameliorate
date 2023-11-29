import { TableChart, TableChartOutlined } from "@mui/icons-material";

import { useNode, useNodeChildren } from "../../store/nodeHooks";
import { viewCriteriaTable } from "../../store/viewActions";
import { Indicator } from "../Indicator/Indicator";

interface Props {
  nodeId: string;
}

export const CriteriaTableIndicator = ({ nodeId }: Props) => {
  const node = useNode(nodeId);
  const nodeChildren = useNodeChildren(nodeId);

  if (node === null || node.type !== "problem") {
    return <></>;
  }

  const hasCriteria = nodeChildren.some((child) => child.type === "criterion");

  const Icon = hasCriteria ? TableChart : TableChartOutlined;

  return (
    <Indicator
      Icon={Icon}
      title={"View criteria table"}
      onClick={() => viewCriteriaTable(nodeId)}
    />
  );
};
