const db = require("../persistencia/configDB");
const Post = require('./post');

class Image{
    id;
    url;
    post;

    constructor(url, post, id){
        this.id = id ? id : 0;
        this.url = url;
        this.post = post;
    }

    static listAllId(post){
        let sql = 'select * from images where posts_id = ?;';

        return new Promise((resolve, reject) => {
            db.all(sql, [post.id], (err, rows) => {
                if (err) {
                    console.log('Erro', err);
                } else {
                    const images = rows;
                    resolve(images);
                }
            })
        })
        
    }

    static listAll() {
        let sql = 'select * from images;';

        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    console.log('Erro', err);
                } else {
                    const images = rows;
                    resolve(images);
                }
            })
        })

    }

    add(callback){
        let sql = 'insert into images(url, posts_id) values(?, ?);';
        db.run(sql, [this.url, this.post.id], (err) => {
            if (err) {
                console.log("Erro", err);
            }
            callback();   

        })
    }

    static deleteAllPostId(id, callback){
        let sql = 'delete from images where posts_id = ?;';
        db.run(sql, [id], (err) => {
            if (err) {
                console.log("Erro", err);
            }

            callback();
        });
    }
    
    static delete(id, callback) {
        let sql = 'delete from images where id = ?;';
        db.run(sql, [id], (err) => {
            if (err) {
                console.log("Erro", err);
            }

            callback();
        });
    }

    static getById(id) {
        let sql = 'select * from images where id = ?;';
        return new Promise((resolve, reject) => {
            db.all(sql, [id], async (err, rows) => {
                if (err) {
                    console.log('Erro', err);
                } else {
                    let id = rows[0].id;
                    let url = rows[0].url;
                    let posts = await Post.getById(rows[0].posts_id);
                    const image = new Image(url, post, id);

                    resolve(image);
                }

            })
        })
    }

}

module.exports = Image;