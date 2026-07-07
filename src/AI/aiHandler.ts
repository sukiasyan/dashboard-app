import { OpenRouter } from "@openrouter/sdk";
import {ChatMessages} from "@openrouter/sdk/models";


// const messageTransformer = new OpenRouter();

const openRouter = new OpenRouter({
  apiKey: process.env.AI_KEY,
});

export const getAiResults = async (messages: ChatMessages[]) => {
  try {
    const response = await openRouter.chat.send({
      chatRequest: {
        model: process.env.AI_MODEL,
        messages,
      }
    });

    const giftSuggestions = response.choices[0].message.content;
    console.log("gitsuggest",giftSuggestions);
    // const responseData = {
    //   "type":"ANALYTICS_QUERY",
    //   "page": "retailers",
    //   "metrics": ["sales"],
    //   "filters": {
    //     "date_from": "2023-09-25",
    //     "date_to": "2023-10-01"
    //   },
    //   "sort": {
    //     "field": "sales",
    //     "direction": "desc"
    //   },
    //   "limit": 10
    // }

    return giftSuggestions;

  } catch (e) {
    console.error(e);
    console.log('Something went wrong on the server');
  }
}