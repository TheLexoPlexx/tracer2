"use client"

import { ReactNode } from "react";
import { ZOOM_CONFIGS } from "ws/infinite-canvas/src/helpers/constants";

export function CanvasNode(props: { children: ReactNode, x: number, y: number }) {
  // The ReactInfiniteCanvas will position this CanvasNode component based on the x and y props.
  // We don't need to add position:absolute, left, or top to the CanvasNode itself.
  // Instead, we apply a transform to its content if we want to change the anchor point.

  const x = props.x + ZOOM_CONFIGS.DEFAULT_LAYOUT / 2;
  const y = props.y + ZOOM_CONFIGS.DEFAULT_LAYOUT / 2;

  //TODO: add drag and drop

  return (
    <div
      style={{
        overflow: 'visible',
        position: 'absolute', // Essential for positioning on the canvas
        left: `${x}px`,   // Use x prop for left offset
        top: `${y}px`,    // Use y prop for top offset
        // The following transform makes (x,y) the center of the node
        transform: 'translate(-50%, -50%)',
        display: 'block',
        cursor: 'grab',
        // display: 'inline-block' or other display properties can be added if needed
        // depending on the content and desired layout behavior within the node.
      }}
    >
      {props.children}
    </div>
  );
}