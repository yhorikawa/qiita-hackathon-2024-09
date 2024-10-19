const imageURL = "https://api.openai.com/v1/images/generations";

type Prompt = {
  content: string;
};

type ChatGPTImageResponse = {
  created: number;
  data: {
    b64_json: string;
  }[];
};

export const fetchChatGPTImageResponse = (
  apiKey: string,
  prompt: Prompt,
): Promise<ChatGPTImageResponse> => {
  const body = {
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "512x512",
    response_format: "b64_json",
  };

  return fetch(imageURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};
