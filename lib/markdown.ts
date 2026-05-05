/**
 * Formats raw markdown text to ensure proper structure and readability
 * @param text The raw markdown text to format
 * @returns Properly formatted markdown text
 */
export function formatMarkdownText(text: string): string {
    if (!text) return ""
  
    return (
      text
        // Ensure code blocks have proper line breaks and formatting
        .replace(/```(\w+)?/g, "\n```$1\n")
        .replace(/```\s*$/g, "\n```\n")
  
        // Format headings with proper spacing
        .replace(/^(#{1,6})\s+/gm, "$1 ")
        .replace(/([^\n])(#{1,6})\s+/g, "$1\n\n$2 ")
  
        // Ensure proper paragraph breaks
        .replace(/\.\s+([A-Z])/g, ".\n\n$1")
  
        // Format list items properly
        .replace(/^(\d+\.|\*)\s+/gm, "$1 ")
        .replace(/([^\n])(\n)(\d+\.|\*)\s+/g, "$1\n\n$3 ")
  
        // Clean up excessive line breaks
        .replace(/\n{3,}/g, "\n\n")
  
        // Ensure proper spacing around code blocks
        .replace(/([^\n])(\n```)/g, "$1\n\n```")
        .replace(/(```\n)([^\n])/g, "```\n\n$2")
    )
  }
  
  /**
   * Processes streaming text chunks to maintain proper markdown structure
   * @param chunk The current text chunk
   * @param existingText The existing accumulated text
   * @returns Properly processed text
   */
  export function processStreamingMarkdown(chunk: string, existingText = ""): string {
    // Clean the chunk of any streaming artifacts
    const cleanedChunk = chunk
      .replace(/id:\s*\d+\s*/g, "")
      .replace(/^data:\s*/, "")
      .replace(/\d+\\\nid:\s*\d+\\ndata:\s*/g, "")
      .trim()
  
    // Combine with existing text
    const combinedText = existingText + cleanedChunk
  
    // Check if we're in the middle of a code block
    const codeBlockCount = (combinedText.match(/```/g) || []).length
    const isInCodeBlock = codeBlockCount % 2 !== 0
  
    // If we're in a code block, preserve all formatting
    if (isInCodeBlock) {
      return combinedText
    }
  
    // Otherwise apply basic formatting
    return (
      combinedText
        // Ensure proper line breaks for lists
        .replace(/(\d+\.|\*)\s+([A-Za-z])/g, "$1 $2")
        // Ensure proper spacing for headings
        .replace(/(#{1,6})\s+([A-Za-z])/g, "$1 $2")
    )
  }
  
  export function formatStreamingText(text: string): string {
    if (!text) return ""
  
    return (
      text
        // Remove any remaining SSE artifacts
        .replace(/^data:\s*/gm, "")
        .replace(/^id:\s*\d+\s*/gm, "")
  
        // Format paragraphs
        .replace(/\.\s+([A-Z])/g, ".\n\n$1")
        .replace(/\?\s+([A-Z])/g, "?\n\n$1")
        .replace(/!\s+([A-Z])/g, "!\n\n$1")
  
        // Handle code blocks
        .replace(/```(\w+)?/g, "\n```$1\n")
        .replace(/```\s*$/g, "\n```\n")
  
        // Clean up excessive whitespace
        .replace(/\s+/g, " ")
        .replace(/\n\s+/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
    )
  }
  
  export function processStreamingChunk(chunk: string, existingText = ""): string {
    // Clean the chunk
    const cleanChunk = chunk
      .replace(/^data:\s*/gm, "")
      .replace(/^id:\s*\d+\s*/gm, "")
      .trim()
  
    // Combine with existing text
    const combinedText = existingText + (existingText && cleanChunk ? " " : "") + cleanChunk
  
    // Format the combined text
    return formatStreamingText(combinedText)
  }
  
  