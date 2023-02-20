import {
  Article,
  AutoStories,
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  LibraryBooks,
  Menu,
  TableChart,
  TableView,
} from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useState } from "react";

import { viewClaimDiagram, viewCriteriaTable, viewProblemDiagram } from "../../store/actions";
import { useNodes } from "../../store/nodeHooks";
import {
  problemDiagramId,
  useClaimDiagramIdentifiers,
  useRootTitle,
  useTopicViewId,
} from "../../store/store";
import {
  NestedListItemButton,
  PositionedDiv,
  PositionedIconButton,
  StyledDrawer,
  StyledListItemButton,
} from "./TopicPane.styles";

export const TopicPane = () => {
  const [isTopicDrawerOpen, setIsTopicDrawerOpen] = useState(true);
  const [isClaimsListOpen, setIsClaimsListOpen] = useState(true);
  const [isProblemsListOpen, setIsProblemsListOpen] = useState(true);

  const topicViewId = useTopicViewId();

  const rootTitle = useRootTitle();
  const claimDiagramIdentifiers = useClaimDiagramIdentifiers();
  const problems = useNodes(problemDiagramId, (node) => node.type === "problem");

  const handleDrawerToggle = () => {
    if (isTopicDrawerOpen) {
      setIsTopicDrawerOpen(false);
    } else {
      setIsTopicDrawerOpen(true);
    }
  };

  return (
    <>
      {/* div to enable menu button to be positioned to the right of the drawer */}
      <PositionedDiv>
        <PositionedIconButton onClick={handleDrawerToggle} color="primary">
          {isTopicDrawerOpen ? <ChevronLeft /> : <Menu />}
        </PositionedIconButton>
        {/* `permanent` because `persistent` adds transitions that conflict with our styles */}
        <StyledDrawer variant="permanent" open={isTopicDrawerOpen}>
          {/* Drawer's Paper height is full height of screen, so this toolbar exists to push the list below the two toolbars on the page */}
          <Toolbar variant="dense" />
          <Toolbar variant="dense" />
          <List>
            <ListItem key="1" disablePadding>
              <StyledListItemButton
                selected={topicViewId === problemDiagramId}
                onClick={() => viewProblemDiagram()}
              >
                <ListItemIcon>
                  <AutoStories />
                </ListItemIcon>
                <ListItemText primary={rootTitle} />
              </StyledListItemButton>
            </ListItem>
            <ListItem key="2" disablePadding>
              <StyledListItemButton onClick={() => setIsProblemsListOpen(!isProblemsListOpen)}>
                <ListItemIcon>
                  <TableView />
                </ListItemIcon>
                <ListItemText primary="Criteria" />
                {isProblemsListOpen ? <ExpandLess /> : <ExpandMore />}
              </StyledListItemButton>
            </ListItem>
            <Collapse in={isProblemsListOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                {problems.length === 0 && (
                  <ListItem key="1" disablePadding>
                    <NestedListItemButton disabled={true}>
                      <ListItemIcon>
                        <TableChart />
                      </ListItemIcon>
                      <ListItemText primary="No criteria yet!" />
                    </NestedListItemButton>
                  </ListItem>
                )}
                {problems.map(({ id: nodeId, data }) => (
                  <ListItem key={nodeId} disablePadding>
                    <NestedListItemButton
                      selected={topicViewId === nodeId}
                      onClick={() => viewCriteriaTable(nodeId)}
                    >
                      <ListItemIcon>
                        <TableChart />
                      </ListItemIcon>
                      <ListItemText primary={data.label} />
                    </NestedListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <ListItem key="3" disablePadding>
              <StyledListItemButton onClick={() => setIsClaimsListOpen(!isClaimsListOpen)}>
                <ListItemIcon>
                  <LibraryBooks />
                </ListItemIcon>
                <ListItemText primary="Claims" />
                {isClaimsListOpen ? <ExpandLess /> : <ExpandMore />}
              </StyledListItemButton>
            </ListItem>
            <Collapse in={isClaimsListOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                {claimDiagramIdentifiers.length === 0 && (
                  <ListItem key="1" disablePadding>
                    <NestedListItemButton disabled={true}>
                      <ListItemIcon>
                        <Article />
                      </ListItemIcon>
                      <ListItemText primary="No claims yet!" />
                    </NestedListItemButton>
                  </ListItem>
                )}
                {claimDiagramIdentifiers.map(([diagramId, diagramTitle]) => (
                  <ListItem key={diagramId} disablePadding>
                    <NestedListItemButton
                      selected={topicViewId === diagramId}
                      onClick={() => viewClaimDiagram(diagramId)}
                    >
                      <ListItemIcon>
                        <Article />
                      </ListItemIcon>
                      <ListItemText primary={diagramTitle} />
                    </NestedListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </StyledDrawer>
      </PositionedDiv>
    </>
  );
};
