import axios from 'axios';

const url = 'https://obscure-meadow-62114.herokuapp.com/api/posts/';

class PostService {
    //Get Posts
    static getPosts() {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    const data = res
                    resolve(
                        data.map(post => ({
                            ...post,
                            createdAt: new Date(post.createdAt)

                        }))
                    )
                })
                .catch((err) => {
                    reject(err)
                })

        })
    }

    //Create Posts
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    //Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default PostService;