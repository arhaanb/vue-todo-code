<template>
  <div class="container">
    <h1>Vue JS</h1>
    <h2>A to-do application</h2>
    <h5>Double click on a post to delete it. wait for a sec after deleting. pls ignore the shitty styling.. 😫</h5>
    <div class="flexcenter">
      <div class="create-post">
        <label for="create-post">Say something...</label>
        <input
          type="text"
          id="create-post"
          v-model="text"
          placeholder="Create a post"
          v-on:keyup.enter="createPost"
        />
        <!-- <button v-on:click="createPost" v-on:keyup.enter="createPost">Post!</button> -->
      </div>
    </div>
    
    <p class="center" v-if="createLoading">
      <img
        src="https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
        alt
        class="createLoading"
      />
    </p>

    <div v-if="loading" class="loading">
      <p class="center">
        <img src="https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt />
      </p>
    </div>

    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="flexcenter">
        <div
          class="post"
          v-for="(post, index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
          v-on:dblclick="deletePost(post._id)"
        >
          <div class="postcontent">
            {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
            <p class="text">{{post.text}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      loading: false,
      createLoading: false
    };
  },
  async created() {
    try {
      this.loading = true;
      this.posts = await PostService.getPosts();
      this.loading = false;
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.createLoading = true;
      this.text = "";
      this.posts = await PostService.getPosts();
      this.createLoading = false;
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.createLoading = true;
      this.posts = await PostService.getPosts();
      this.createLoading = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

.flexcenter {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.center {
  text-align: center;
}

.loading img {
  width: 100%;
}

div.create-post {
  margin-bottom: 2em;
  display: flex;
}

.createLoading {
  width: 3em;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #6699ee;
  background-color: #bcd1f5;
  border-radius: 1em;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
  width: 65%;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
