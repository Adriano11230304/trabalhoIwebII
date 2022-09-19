const db = require('../persistencia/configDB');

class Post{
    id;
    title;
    description;
    author;
    created_at;
    updated_at;

    constructor(title, description, author, created_at, id, updated_at) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.created_at = created_at ? created_at : new Date();
        this.updated_at = updated_at ? updated_at : '';
        this.id = id || 0;
    }

    static listAll() {
        let sql = 'select * from posts order by created_at desc;';
        const listagem = [];
        let id, description, title, author, created_at;

        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                } else {
                    for (let i = 0; i < rows.length; i++) {
                        id = rows[i].id;
                        description = rows[i].description;
                        title = rows[i].title;
                        author = rows[i].author;
                        created_at = new Date(rows[i].created_at);
                        let post = new Post(title, description, author, created_at, id);
                        listagem.push(post);
                    }
                };

                resolve(listagem);
            })
            
        })
    }

    getDateFormatter(){
        const dia = this.created_at.getDate();
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const mes = months[this.created_at.getMonth()];
        const ano = this.created_at.getFullYear();
        const hora = this.created_at.getHours();
        const minutos = this.created_at.getMinutes();
        const segundos = this.created_at.getSeconds();
        const date = dia + ' de ' + mes + ' de ' + ano + ' ' + hora + ':' + minutos + ':' + segundos;
        return date;
    }

    save(callback){
        let sql = 'insert into posts(title, description, author, created_at) values(?, ?, ?, ?);';
        db.run(sql, [this.title, this.description, this.author, this.created_at], (err) => {
            if (err) {
                console.log("Erro", err);
            }

            callback();
        });
    }

}

module.exports = Post;