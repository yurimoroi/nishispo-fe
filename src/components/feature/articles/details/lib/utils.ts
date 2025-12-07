/* Keep this old code for reference
const svgBracket = `<svg width="9" height="38" viewBox="0 0 9 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 1H1V39H9" stroke="#529AD6" stroke-width="2"/>
</svg>`;

Sample implementation
<h2 class="font-bold font-zenkaku text-[1.25rem] leading-normal text-base lg:text-[1.75rem] text-blue-100 flex items-center">${svgBracket}${item.trim()}<span class="rotate-180">${svgBracket}</span></h2>
*/

/**
 * Transforms text with special markup symbols into HTML:
 * - Text after '##' becomes an <h2> heading
 * - Text after '###' becomes an <h3> heading
 * - Text inside square brackets [text] becomes bold <p class="font-bold">
 * - Links pattern [text](url 'title') are converted to <a href="url" title="title">text</a>
 * - * Text becomes unordered list items >li>
 * Note: We are also in the lookout for preceding Japanese quote mark 「 as this also introduces undesired output
 */

export const convertSymbolsToHTML = (body: string) => {
  return chainTransformation(body)
    .parseCleanBody() // First, normalize line endings and clean up any hidden characters
    .convertToLink()
    .convertToBold()
    .convertToUnorderedList()
    .convertH3() // Process ### first
    .convertH2().body;
};

export const parseCleanBody = (body: string) => {
  return body
    .replace(/\r\n/g, "\n") // Normalize CRLF to LF
    .replace(/\r/g, "\n") // Normalize CR to LF
    .replace(/\u200B/g, "") // Remove zero-width spaces
    .replace(/\u00A0/g, " ") // Replace non-breaking spaces with regular spaces
    .replace(/\t/g, "    "); // Replace tabs with spaces
};

export const convertToLink = (body: string) => {
  return body.replace(
    /\[([^\]]+)\]\(([^)]+?)\s+'([^']+)'\)/g,
    (_, text, url, title) =>
      `<a href="${url}" class="underline text-blue-100" title="${title}">${text}</a>`,
  );
};

export const convertToUnorderedList = (body: string) => {
  // Convert unordered lists, supporting multi-line list items and <br /> for line breaks within items
  return body.replace(
    /((?:^\s*\*\s+.*(?:\n(?!\s*\*\s+)(?!\s*$).*)*(?:\n|$))+)(\n*)/gm,
    (match, listContent, trailingNewlines) => {
      // Split the list content into lines and remove trailing empty lines from the list content
      const lines = listContent.replace(/\n+$/, "").split("\n");
      const items: string[] = [];
      let currentItem = "";

      // Iterate through each line to group lines belonging to the same list item
      lines.forEach((line: string) => {
        if (/^\s*\*\s+/.test(line)) {
          if (currentItem) items.push(currentItem);
          currentItem = line.replace(/^\s*\*\s+/, "").trim();
        } else if (line.trim() !== "") {
          currentItem += "\n" + line.trim();
        }
        // Ignore blank lines within the list
      });
      if (currentItem) items.push(currentItem);

      // If no items, return original match (to avoid empty <ul>)
      if (!items.length) return match;

      // Replace newlines within a list item with <br /> and wrap with <li>
      const htmlItems = items
        .map((content) => `<li>${content.replace(/\n/g, "<br />")}</li>`)
        .join("");

      // Preserve the trailing newlines that come after the list
      return `<ul class="list-disc pl-6 space-y-0">${htmlItems}</ul>${trailingNewlines}`;
    },
  );
};

export const convertToBold = (body: string) => {
  return body.replace(
    /\[(.*?)\]/g,
    (_, item) => `<p class="font-bold inline-flex">${item.trim()}</p>`,
  );
};

export const convertH3 = (body: string) => {
  return body.replace(
    /(?:^|「?)###\s*(.*?)(?=\n|$)/gm,
    (_, item) =>
      `<h3 class="font-bold font-zenkaku text-xl  text-blue-100 leading-normal">${item.trim()}</h3>`,
  );
};

export const convertH2 = (body: string) => {
  return body.replace(
    /(?:^|「?)##(?!#)\s*(.*?)(?=\n|$)/gm,
    (_, item) =>
      `<h2 class="font-bold font-zenkaku text-[1.375rem] leading-normal lg:text-[1.75rem] pl-2.5 border-l-4  border-blue-100  text-blue-100 flex items-center">${item.trim()}</h2>`,
  );
};

export type ChainTransformationType = {
  body: string;
  parseCleanBody: () => ChainTransformationType;
  convertToLink: () => ChainTransformationType;
  convertToBold: () => ChainTransformationType;
  convertToUnorderedList: () => ChainTransformationType;
  convertH3: () => ChainTransformationType;
  convertH2: () => ChainTransformationType;
};

export const chainTransformation = (body: string): ChainTransformationType => {
  return {
    body,
    parseCleanBody: () => chainTransformation(parseCleanBody(body)),
    convertToLink: () => chainTransformation(convertToLink(body)),
    convertToBold: () => chainTransformation(convertToBold(body)),
    convertToUnorderedList: () =>
      chainTransformation(convertToUnorderedList(body)),
    convertH3: () => chainTransformation(convertH3(body)),
    convertH2: () => chainTransformation(convertH2(body)),
  };
};
