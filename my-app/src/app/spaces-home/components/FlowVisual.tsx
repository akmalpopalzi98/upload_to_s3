"use client";
import { Controls, Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const FlowVisual = () => {
  return (
    <div
      style={{
        height: "600px",
        width: "500px",
        display: "flex",
        margin: "0 auto",
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} style={{ borderRadius: "20px" }}>
        <Background bgColor="beige" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowVisual;

const nodes = [
  {
    id: "start",
    position: { x: 50, y: 0 },
    data: { label: "Attach Picture" },
  },
  {
    id: "api-gateway",
    data: { label: "Send via API Gateway" },
    position: { x: 50, y: 100 },
  },
  {
    id: "lambda-receive",
    data: { label: "Lambda Receives Event" },
    position: { x: 50, y: 200 },
  },
  {
    id: "lambda-process",
    data: { label: "Lambda Processes Image" },
    position: { x: 50, y: 300 },
  },
  {
    id: "s3-bucket",
    data: { label: "Store in S3 Bucket" },
    position: { x: 50, y: 400 },
  },
  {
    id: "end",
    data: { label: "Picture stored in the cloud" },
    position: { x: 50, y: 500 },
  },
];

const edges = [
  { id: "e1", source: "start", target: "api-gateway", animated: true },
  { id: "e2", source: "api-gateway", target: "lambda-receive", animated: true },
  {
    id: "e3",
    source: "lambda-receive",
    target: "lambda-process",
    animated: true,
  },
  { id: "e4", source: "lambda-process", target: "s3-bucket", animated: true },
  { id: "e5", source: "s3-bucket", target: "end", animated: true },
];
