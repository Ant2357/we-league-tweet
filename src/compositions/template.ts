import { reactive } from 'vue';

import msgs from "@/assets/json/msgs.json";

import hashtags from "@/assets/json/hashtags.json";

type TemplateState = {
  msgs: { [x: string]: string; }[];
  hashtags: { [x: string]: string; }[];
}

interface UseTemplate {
  templateState: TemplateState
}

export const useTemplate = (): UseTemplate => {
  const templateState = reactive<TemplateState>({
    msgs: msgs,
    hashtags: hashtags
  });

  return {
    templateState
  };
};
