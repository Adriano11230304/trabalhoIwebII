const db = require("../persistencia/configDB");

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
}

module.exports = Image;