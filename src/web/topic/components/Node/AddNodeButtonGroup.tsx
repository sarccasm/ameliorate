import { ButtonGroup } from "@mui/material";

import { NodeType, nodeTypes } from "../../../../common/node";
import { useUnrestrictedEditing } from "../../../view/actionConfigStore";
import { Relation, addableRelationsFrom } from "../../utils/edge";
import { type RelationDirection } from "../../utils/graph";
import { Orientation } from "../../utils/layout";
import { AddNodeButton } from "../Node/AddNodeButton";

interface Props {
  className?: string;
  fromNodeId: string;
  fromNodeType: NodeType;
  as: RelationDirection;
  orientation: Orientation;
}

export const AddNodeButtonGroup = ({
  className,
  fromNodeId,
  fromNodeType,
  as,
  orientation,
}: Props) => {
  const unrestrictedEditing = useUnrestrictedEditing();

  const addableRelations: { toNodeType: NodeType; relation: Relation }[] = !unrestrictedEditing
    ? addableRelationsFrom(fromNodeType, as)
    : // if unrestricted, allow adding any node as parent or child
      nodeTypes.map((nodeType) => ({
        toNodeType: nodeType,
        relation: {
          child: as === "child" ? nodeType : fromNodeType,
          name: "relatesTo",
          parent: as === "parent" ? nodeType : fromNodeType,
        },
      }));

  if (addableRelations.length === 0) return <></>;

  return (
    <ButtonGroup
      variant="contained"
      aria-label="add node button group"
      className={className}
      orientation={orientation === "DOWN" ? "horizontal" : "vertical"}
    >
      {addableRelations.map(({ toNodeType, relation }) => (
        <AddNodeButton
          key={toNodeType}
          fromPartId={fromNodeId}
          as={as}
          toNodeType={toNodeType}
          relation={relation}
        />
      ))}
    </ButtonGroup>
  );
};
