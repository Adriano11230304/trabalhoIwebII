const db = require("../persistencia/configDB");

class Image{
    id;
    url;
    post;

    constructor(id, url, post){
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
}

module.exports = Image;