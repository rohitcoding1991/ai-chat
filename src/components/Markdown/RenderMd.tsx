import React from "react";
import Markdown from "markdown-to-jsx";

const RenderMd = ({ text }: { text: string }) => {
  return <Markdown>{text}</Markdown>;
};

export default RenderMd;
