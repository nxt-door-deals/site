import { BLOCKS, MARKS } from "@contentful/rich-text-types";

const Bold = ({ children }) => (
  <span className="font-semibold">{children}</span>
);
const Italics = ({ children }) => <span className="italic">{children}</span>;
const Underline = ({ children }) => (
  <span className="underline">{children}</span>
);
const Text = ({ children }) => (
  <div>
    <p>{children}</p>
    <br />
  </div>
);
const Heading3 = ({ children }) => (
  <div>
    <h3 className="text-xl font-semibold">{children}</h3>
  </div>
);
const Heading4 = ({ children }) => (
  <div>
    <h4 className="text-xl font-semibold">{children}</h4>
  </div>
);
const Quote = ({ children }) => (
  <span className="quote italic">{children}</span>
);

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    [MARKS.ITALICS]: (text) => <Italics>{text}</Italics>,
    [MARKS.UNDERLINE]: (text) => <Underline>{text}</Underline>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.HEADING_3]: (node, children) => <Heading3>{children}</Heading3>,
    [BLOCKS.HEADING_4]: (node, children) => <Heading4>{children}</Heading4>,
    [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
  },
  renderText: (text) => text,
};

export default options;
