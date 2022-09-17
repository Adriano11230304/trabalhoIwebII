const db = require('../persistencia/configDB');

class Post{
    id;
    title;
    description;
    created_at;
    updated_at;
    images = [];

    constructor(title, description, created_at, id, images) {
        this.title = title;
        this.description = description;
        this.created_at = this.created_at ? this.created_at : new Date();
        this.id = id || 0;
        images = '';
    }

    static listAll() {
        let sql = 'select * from posts;';
        const listagem = [];
        let id, description, title, created_at;

        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                } else {
                    for (let i = 0; i < rows.length; i++) {
                        id = rows[i].id;
                        description = rows[i].description;
                        title = rows[i].title;
                        created_at = new Date(rows[i].created_at);
                        let post = new Post(title, description, created_at, id);
                        listagem.push(post);
                    }
                };
                
                resolve(listagem);
                
        })
    })
    }
}

module.exports = Post;