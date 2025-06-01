import { ReactNode } from "react";

export function CanvasNode(props: { children: ReactNode, x: number, y: number }) {
  // The ReactInfiniteCanvas will position this CanvasNode component based on the x and y props.
  // We don't need to add position:absolute, left, or top to the CanvasNode itself.
  // Instead, we apply a transform to its content if we want to change the anchor point.
  return (
    <div
      style={{
        overflow: 'visible',
        position: 'absolute', // Essential for positioning on the canvas
        left: `${props.x}px`,   // Use x prop for left offset
        top: `${props.y}px`,    // Use y prop for top offset
        // The following transform makes (x,y) the center of the node
        // transform: 'translate(-50%, -50%)',
        display: 'block',
        // display: 'inline-block' or other display properties can be added if needed
        // depending on the content and desired layout behavior within the node.
      }}
    >
      {props.children}
    </div>
  );
}