const URL = "https://api.openai.com/v1/chat/completions";

type Message = {
  role: string;
  content: string;
};

type ChatGPTResponse = {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
};

export const fetchChatGPTResponse = (
  apiKey: string,
  messages: Message[],
  // biome-ignore lint/suspicious/noExplicitAny: any is required for the options parameter
  options: Record<string, any> = {},
): Promise<ChatGPTResponse> => {
  const body = {
    model: "gpt-4o",
    messages: messages,
    max_completion_tokens: 300,
    ...options,
  };

  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};
