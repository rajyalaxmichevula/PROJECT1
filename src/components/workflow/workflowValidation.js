const validateWorkflow = (nodes, edges) => {
  const errors = [];

  if (nodes.length === 0) {
    errors.push("Workflow must contain at least one node.");
    return errors;
  }

  const nodeIds = new Set(nodes.map((node) => node.id));

  const triggerNodes = nodes.filter((node) => node.data.type === "trigger");

  if (triggerNodes.length === 0) {
    errors.push("Workflow must contain at least one Trigger node.");
  }

  const hasInvalidEdges = edges.some(
    (edge) => !nodeIds.has(edge.source) || !nodeIds.has(edge.target),
  );

  if (hasInvalidEdges) {
    errors.push("Workflow contains invalid connections.");
  }

  const connections = {};

  nodes.forEach((node) => {
    connections[node.id] = [];
  });

  edges.forEach((edge) => {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
      return;
    }

    connections[edge.source].push(edge.target);
  });

  const reachableNodes = new Set();

  const visitNode = (nodeId) => {
    if (reachableNodes.has(nodeId)) {
      return;
    }

    reachableNodes.add(nodeId);

    connections[nodeId].forEach((nextNode) => {
      visitNode(nextNode);
    });
  };

  triggerNodes.forEach((trigger) => {
    visitNode(trigger.id);
  });

  const disconnectedNodes = nodes.filter(
    (node) => !reachableNodes.has(node.id),
  );

  if (disconnectedNodes.length > 0) {
    const nodeNames = disconnectedNodes
      .map((node) => node.data.label)
      .join(", ");

    errors.push(`Disconnected node(s): ${nodeNames}`);
  }

  const visitingNodes = new Set();
  const visitedNodes = new Set();

  const checkForCycle = (nodeId) => {
    if (visitingNodes.has(nodeId)) {
      return true;
    }

    if (visitedNodes.has(nodeId)) {
      return false;
    }

    visitingNodes.add(nodeId);

    for (const nextNode of connections[nodeId]) {
      if (checkForCycle(nextNode)) {
        return true;
      }
    }

    visitingNodes.delete(nodeId);
    visitedNodes.add(nodeId);

    return false;
  };

  for (const node of nodes) {
    if (checkForCycle(node.id)) {
      errors.push("Workflow contains a loop. Workflow graphs must be acyclic.");
      break;
    }
  }

  return errors;
};

export default validateWorkflow;
