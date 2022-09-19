const db = require('../persistencia/configDB');

class Post{
    id;
    title;
    description;
    created_at;
    updated_at;

    constructor(title, description, created_at, id, updated_at) {
        this.title = title;
        this.description = description;
        this.created_at = created_at ? created_at : new Date('now');
        this.updated_at = updated_at ? updated_at : '';
        this.id = id || 0;
    }

    static listAll() {
        let sql = 'select * from posts order by created_at desc;';
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