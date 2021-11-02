<template>
  <div>
    <div class="container is-fluid my-3 px-4">
      <div class="columns">
        <div class="column is-10 is-offset-1">

          <div class="card">
            <div class="card-content">
              <form action="https://twitter.com/intent/tweet" method="get" target="_blank">

                <span class="title is-5 font-nicomoji">ハッシュタグ一覧</span>
                <div class="mb-3">
                  <div v-for="tag in templateState.hashtags" :key="tag.name" class="field mb-0">
                    <input
                      type="checkbox"
                      :id="tag.name"
                      :value="tag.name"
                      v-model="tweetState.hashtags"
                      class="is-checkradio"
                    />
                    <label
                      :for="tag.name"
                      class="font-nicomoji"
                      :class="teamColor(tag.label)"
                    >{{ tag.label }}</label>
                  </div>
                </div>


                <div class="field">
                  <div class="tabs is-boxed">
                    <ul>
                      <li :class="{ 'is-active': appState.activeTab === 'aa' }"><a @click="appState.activeTab = 'aa'">AA</a></li>
                    </ul>
                  </div>
                  <div class="tab-contents">
                    <div class="content" :class="{ 'is-active': appState.activeTab === 'aa' }">

                      <div class="buttons">
                        <button
                          v-for="t in templateState.msgs" :key="t.label"
                          type="button"
                          class="button is-small"
                          @click="updateTweet(tweetState.tweetMsg + t.msg, tweetState.hashtags)"
                        >
                          {{ t.label }}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="field">
                  <label for="tweet-textarea" class="label">本文</label>
                  <div class="control">
                    <textarea
                      v-model="tweetState.tweet"
                      :rows="tweetState.tweet.split(/\n/).length"
                      id="tweet-textarea"
                      name="text"
                      class="textarea"
                      placeholder="ツイート本文"
                    ></textarea>
                  </div>
                </div>

                <div class="field mt-4">
                  <p :class="{ 'has-text-danger': tweetState.tweet.length > 280 }">
                    <span>文字数: {{ tweetState.tweet.length }}</span>
                  </p>
                </div>

              <button
                type="button"
                class="button is-info"
                @click="newTweetTab(tweetState.tweet)"
              >
                <font-awesome-icon :icon="['fab', 'twitter']" /><span class="ml-1">ツイート</span>
              </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import "@/assets/css/style.css";
import "@/assets/css/text.css";
import "@/assets/css/tabs.css";
import "@/assets/css/button.css";
import "@/assets/css/checkbox.css";
import "@/assets/css/modal.css";

import { defineComponent, reactive } from 'vue';
import { useTemplate } from '@/compositions/template';
import { useTweet } from '@/compositions/tweet';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const appState = reactive<{
      activeTab: string;
    }>({
      activeTab: "aa",
    });

    // テンプレート一覧(AA, ハッシュタグ一覧)
    const { templateState } = useTemplate();
    // ツイート関連の機能
    const { tweetState,  updateTweet} = useTweet();

    /**
    *  新規タブで、ツイート画面を開く
    */
    const newTweetTab = (text: string): void => {
      const tweet = encodeURIComponent(`${text}`);
      window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
    }

    const teamColor = (label: string): { [s: string]: boolean } => {
      return {
        "text-mynavi": label === "#マイナビ仙台レディース",
        "text-reds": label === "#三菱重工浦和レッズレディース",
        "text-ardija": label === "#大宮アルディージャVENTUS",
        "text-asElfen": label === "#ちふれASエルフェン埼玉",
        "text-jefunited": label === "#ジェフユナイテッド市原・千葉レディース",
        "text-beleza": label === "#日テレ・東京ヴェルディベレーザ",
        "text-stella": label === "#ノジマステラ神奈川相模原",
        "text-parceiro": label === "#AC長野パルセイロ・レディース",
        "text-albirex": label === "#アルビレックス新潟レディース",
        "text-inac": label === "#INAC神戸レオネッサ",
        "text-sanfrecce": label === "#サンフレッチェ広島レジーナ",
      }
    }
    return {
      // State
      appState,
      templateState,
      tweetState,
      // Function
      newTweetTab,
      teamColor,
      updateTweet,
    };
  }
});
</script>
