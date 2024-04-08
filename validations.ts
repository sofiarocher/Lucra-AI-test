// Formatting response text (e.g., for displaying AI responses)
export const formatResponseText = (text: string) => {
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "\n\n$1\n\n");
  formattedText = formattedText.replace(/(\n|^)\*(?=\s)/g, "\n* ");
  return formattedText;
};